// App routing

// Component
import VideoPlayer from './Components/VideoPlayer/videoPlayer';
import PlayLists from './Components/PlayLists/playList';
import YoutubePlaylist from './Components/YoutubePlaylist/youtubePlaylist';

const Routes = [
    {
        name: 'Home',
        path: '/',
        component: PlayLists
    },
    {
        name: 'Videos Playlists',
        path: '/videos-playlists',
        component: 'VideoPlaylist'
    },
    {
        name: 'Videos Player',
        path: '/video-player',
        component: VideoPlayer
    },
    // Youtube playlist
    {
        name: 'Youtube Playlist',
        path: '/youtube-pl',
        component: YoutubePlaylist
    }
]

export default Routes;
