// App routes
const express = require('express');
const router = express.Router();
const path = require('path');
const junk = require('junk');

// Node js file system
const fs = require('fs');

const directoryPath = path.join(__dirname, "../assets/playlists");
router.get('/', function (req, res) {
    res.send('root');
});

const getFileSize = (filePath) => {
    var stats = fs.statSync(filePath);
    // console.log('stats', stats);
    var size = stats["size"];
    // convert it to humanly readable format.
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
  }

const getFolders = (getFolder, response) => {
    fs.readdir(getFolder, function (err, files) {
        //handling error
        var obj = [];
        // obj.push({length: files.filter(junk.not).length});
        if (err) {
            res.send("Unable to scan directory");
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.filter(junk.not).forEach(function (file) {
            obj.push({
                name: file,
                path: directoryPath,
                size: getFileSize(`${getFolder}/${file}`)
            });
        });
        response.send(obj);
    });
}

/**
 * Endpoint to get playlist and playlists videos
 */
router.get('/playlists/:optionalParam?', function (req, res) {
    if(!req.params.optionalParam){
        getFolders(directoryPath, res)
    } else {
        getFolders(directoryPath + '/' + req.params.optionalParam, res)
    }
});

// router.get('/getVideos/:folderName', function (req, res) {
//     fs.readdir(directoryPath + '/' + req.params.folderName, function (err, files) {
//         //handling error
//         var obj = [];
//         obj.push({length: files.filter(junk.not).length});
//         if (err) {
//             return console.log('Unable to scan directory: ' + err);
//         }
//         //listing all files using forEach
//         files.filter(junk.not).forEach(function (file) {
//             obj.push({
//                 name: file,
//                 path: directoryPath + "/" + req.params.folderName,
//             });
//         });
//         res.send(obj)
//     });
// });

module.exports = router;
