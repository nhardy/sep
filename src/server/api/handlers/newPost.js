import { v4 as uuid } from 'uuid';

import r from 'server/api/rethink';


export default function newPostHandler(req, res, next) {
  const {
    location: { latitude, longitude },
    text,
    image,
  } = req.body;
  if (!(text && latitude && longitude)) {
    const error = new Error('Bad request');
    error.status = 400;
    next(error);
    return;
  }

  const id = uuid();
  r.table('posts')
    .insert({
      id,
      username: res.locals.username,
      timestamp: r.now(),
      location: r.point(longitude, latitude),
      text,
      image,
    })
    .run()
    .then(() => {
      res.status(201);
      res.location(`/api/posts/${id}`);
      res.end();
    })
    .catch(next);
}
