import Express from 'express';
import bodyParser from 'body-parser';

import authMiddleware from 'server/api/middleware/auth';
import getPostsHandler from 'server/api/handlers/getPosts';
import newPostHandler from 'server/api/handlers/newPost';
import postHandler from 'server/api/handlers/post';
import newUserHandler from 'server/api/handlers/newUser';
import loginHandler from 'server/api/handlers/login';


const api = new Express();

api.get('/posts', getPostsHandler);
api.post('/posts', authMiddleware, bodyParser.json({ limit: '12mb' }), newPostHandler);
api.get('/posts/:id', postHandler);

api.post('/users', bodyParser.json(), newUserHandler);
api.post('/users/:username', bodyParser.json(), loginHandler);

api.use((req, res, next) => {
  const error = new Error(`Resource for '${req.url}' not found`);
  error.status = 404;
  next(error);
});

api.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  let { status } = err;
  if (!status) status = 500;

  res.status(status);
  res.send({
    status,
    message: err.message,
  });
});

export default api;
