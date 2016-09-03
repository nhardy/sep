import { v4 as uuid } from 'uuid';

import r from 'server/api/rethink';


export default function newPostHandler(req, res, next) {
  console.log(req.body);
  const { text, lat, lon } = req.body;
  if (!(text && lat && lon)) {
    const error = new Error('Bad request');
    error.status = 400;
    next(error);
    return;
  }

  const id = uuid();
  r.table('posts')
    .insert({
      id,
      text,
      location: r.point(lat, lon),
    })
    .run()
    .then(() => {
      res.status(201);
      res.location(`/api/posts/${id}`);
      res.end();
    })
    .catch(next);
}
