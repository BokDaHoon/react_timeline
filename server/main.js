import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
//import api from './routes';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
/* setup routers & static directory */
import api from './routes';

const app = express();
const port = 3000;
const devPort = 3001;

app.use('/api', api);
app.use(session({secret: 'project$1$234', resave: false, saveUninitialized: true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../public'));
// app.use('/api', api);
app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.set('jwt-secret', 'secretKEYforPROJECT');

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});
