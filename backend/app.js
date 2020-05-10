
// Express imports
const express = require('express');

// Routes imports
const router = require('./routes/routes');

const app = express();
const port = 3000;

app.use(express.static('./assets/playlists'));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/', router);
app.listen(port, () => console.log("App is listening port" + port));
