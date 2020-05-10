// Import images
import folderIcon from '../assets/images/playlist.png';
import appLogo from '../assets/images/logo.svg';

const constants = {
    api: {
        urls: {
            playlist: '/playlists',
            getPlaylistVideos: '/playlists/'
        },
        server: 'http://localhost:3000'
    },
    frontend: {
        icons: {
            folder: folderIcon
        },
        logo: appLogo
    },
    youtubeDetails: {
        youtubeServer: 'https://www.googleapis.com/youtube/v3/playlistItems',
        channel_name: 'vevouk',
        channels_title: 'jQuery plugin by @bachors',
        yourAPIKey: 'AIzaSyCj2GrDSBy6ISeGg3aWUM4mn3izlA1wgt0',
        playlistId: 'PLmW_M645jsh4tXmPGaLviHqEYsxqe2gxz',

    }

}

export default constants;