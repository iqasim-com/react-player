
// React imports
import React from 'react';

// Third party imports
import fs from 'fs';

// React material UI imports
import Grid from '@material-ui/core/Grid';
import services from '../../Services/services';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

// Constants import
import constants from '../../Config/constants';

class videoPlayer extends React.Component {
    constructor() {
        super();
        this.state = {
            allPlayListVideos: [],
            currentlyPlaying: ''
        }
    }

    async componentWillMount() {
        if (localStorage.getItem('currentSelectedPlaylist')) {
            const thisPlaylistVideos = await services.getPlaylistVideos(localStorage.getItem('currentSelectedPlaylist'));
            if (!localStorage.getItem('currentlyPlaying')) {
                localStorage.setItem('currentlyPlaying', thisPlaylistVideos.data[0].name);
            }
            this.setState({
                allPlayListVideos: thisPlaylistVideos.data,
                currentlyPlaying: localStorage.getItem('currentlyPlaying')
            });
        }
    }

    setCurrentVideo(currentVideo){
        console.log('Currently playing', currentVideo);
        localStorage.setItem('currentlyPlaying', currentVideo);
        this.setState({
            currentlyPlaying: localStorage.getItem('currentlyPlaying')
        })
    }

    render() {
        return (
            <div className="video-player-wrapper pt-4rem w-100 h-100">
                <Grid container className="h-100">
                    <Grid item lg={9}>
                    <video controls="controls"
                            className="video-stream w-100"
                            src={`${constants.api.server}/${localStorage.getItem('currentSelectedPlaylist')}/${this.state.currentlyPlaying}`}></video>
                    <h1 className="px-4 font-weight-bold">
                        { localStorage.getItem('currentSelectedPlaylist') }
                    </h1>
                    <p className="px-4">
                        { localStorage.getItem('currentlyPlaying') }
                    </p>
                    </Grid>
                    <Grid item lg={3} className="bg-light mh-100 overflow-scroll">
                        <div className="app-bg-green p-3">
                            <h2 className="m-0">Total Videos : { this.state.allPlayListVideos.length }</h2>
                        </div>
                        <div className="px-3">
                            <div className="playlist-title">
                                <h3>
                                    { this.state.allPlayListVideos.name }
                                </h3>
                            </div>
                            { this.state.allPlayListVideos ? this.state.allPlayListVideos.map((res, index) => {
                                return(
                                    <Card key={index} onClick={() => this.setCurrentVideo(res.name)} className="app-ng-orange mb-3">
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography className="text-truncate w-75" gutterBottom variant="h5" component="h2">
                                                    <PlayCircleFilledIcon /> {res.name}
                                                    <small className="d-block font-weight-bold">{res.size}</small>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )
                            }) : null }
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default videoPlayer;