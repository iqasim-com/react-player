// App services

// Axios imports
import axios from 'axios';

// Constants import
import constants from '../Config/constants';

function getPlaylists() {
    const GET_ALL_PLAYLISTS = `${constants.api.server}${constants.api.urls.playlist}`;
    return axios.get(GET_ALL_PLAYLISTS);
}

function getPlaylistVideos(playlistName) {
    const GET_ALL_PLAYLISTS = `${constants.api.server}${constants.api.urls.playlist}/${playlistName}`;
    return axios.get(GET_ALL_PLAYLISTS);
}

function getYoutubePlaylistVideos() {
    const YOUTUBE_PLAYLIST = `${constants.youtubeDetails.youtubeServer}`;
    return axios.get(YOUTUBE_PLAYLIST, {
        params: {
            part: 'snippet',
            playlistId: constants.youtubeDetails.playlistId,
            key: constants.youtubeDetails.yourAPIKey
        }
    })
}

const services = {
    getPlaylists,
    getPlaylistVideos,
    getYoutubePlaylistVideos
};

export default services
