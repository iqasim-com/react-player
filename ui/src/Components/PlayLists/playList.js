
// React imports
import React from 'react';

// React material UI imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

// Services imports
import services from '../../Services/services';

// Constants imports
import constants from '../../Config/constants';

class playLists extends React.Component {
    constructor() {
        super();
        this.state = {
            allPlayLists: []
        }
    }

    async componentWillMount() {
        const allPlaylists = await services.getPlaylists();
        this.setState({
            allPlayLists: allPlaylists.data
        });
        /**
         * Clearing localStorage
         */
        localStorage.clear();
    }

    // Get Folder name on click
    getFolderName(folderName) {
        localStorage.setItem('currentSelectedPlaylist', folderName);
        this.props.history.push({
            pathname: '/video-player'
        })
    }

    render() {
        return (
            <div className="video-player-wrapper p-3 w-100 mt-5">
                <Grid container spacing={1}>
                    <Grid item lg={3}>
                        <h1>
                            All Playlists: { this.state.allPlayLists.length }
                        </h1>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {
                        this.state.allPlayLists ? this.state.allPlayLists.map((playlists, index) => {
                            return (
                                //console.log('Playlist', playlists)
                                <Grid item lg={2} key={index}>
                                    <a href="#" onClick={e => this.getFolderName(playlists.name)}>
                                        <div className="playlist-box app-ng-orange p-3 text-center text-white">
                                            <img src={constants.frontend.icons.folder} width="100"></img>
                                            <h2>{playlists.name}</h2>
                                            <small>{playlists.size}</small>
                                        </div>
                                    </a>
                                    <div className="text-center bg-warning p-3">
                                        <Button variant="contained" className="bg-dark text-white">
                                            <GetAppIcon /> <span className="ml-2">Download</span>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                        }) : null
                    }
                </Grid>
            </div>
        )
    }
}

export default playLists;