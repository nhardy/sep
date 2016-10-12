import Express from 'express';

import config from 'app/config';
import mainMiddleware from 'server/middleware/main';
import errorMiddleware from 'server/middleware/error';

import faviconIco from '!!buffer!app/assets/images/favicon.ico'; // eslint-disable-line


const app = new Express();

app.get('/favicon.ico', (req, res) => {
  res.set('Content-Type', 'image/vnd.microsoft.icon');
  res.send(faviconIco);
});

// Serve static files
app.use('/dist', Express.static('dist'));

// Serve using the React App
app.use(mainMiddleware);
app.use(errorMiddleware);

let port = config.port;
if (__DEVELOPMENT__) port += 1;

app.listen(port);
