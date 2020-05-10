
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
import Axios from 'axios';

class youtubePl extends React.Component {
    constructor() {
        super();
        this.state = {
            channel_name: constants.youtubeDetails.channel_name,
            channels_title: constants.youtubeDetails.channels_title,
            APIKey: constants.youtubeDetails.yourAPIKey,

            YTplaylistVideos: [],
            nowPlayingYTVideo: ''
        }
    }

    async componentWillMount() {
        const youtubePlaylist = await services.getYoutubePlaylistVideos();
        this.setState({
            YTplaylistVideos: youtubePlaylist.data.items,
            nowPlayingYTVideo: youtubePlaylist.data.items[0].snippet.resourceId.videoId
        })
    }

    nowPlayingYoutubeVideo = (videoId) => {
        this.setState({
            nowPlayingYTVideo: videoId
        })
    }

    render() {
        console.log(this.state.nowPlayingYTVideo)
        return (
            <div className="video-player-wrapper pt-4rem w-100 h-100">
                <Grid container className="h-100">
                    <Grid item lg={9}>
                    <iframe src={`https://www.youtube.com/embed/${this.state.nowPlayingYTVideo}`}
                            frameBorder="0"
                            className="youtubeIframe h-100 w-100"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </Grid>
                    <Grid item lg={3} className="bg-dark mh-100 p-3 overflow-scroll">
                      {
                        this.state.YTplaylistVideos.map((res, index) => {
                            // console.log(res.snippet.thumbnails.default)
                            return (
                                <div onClick={e => this.nowPlayingYoutubeVideo(res.snippet.resourceId.videoId)} key={index} className="d-flex mb-3 p-2 youtube-playlist-items">
                                    <img className="mr-3" src={res.snippet.thumbnails.default.url} />
                                    <h3> { res.snippet.title } </h3>
                                </div>
                            )
                        })
                      }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default youtubePl;