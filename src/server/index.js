import Express from 'express';

import config from 'app/config';
import api from 'server/api';
import mainMiddleware from 'server/middleware/main';
import errorMiddleware from 'server/middleware/error';


const app = new Express();

// Serve static files
app.use('/dist', Express.static('dist'));

app.use('/api', api);

// Serve using the React App
app.use(mainMiddleware);
app.use(errorMiddleware);

let port = config.port;
if (__DEVELOPMENT__) port += 1;

app.listen(port);
