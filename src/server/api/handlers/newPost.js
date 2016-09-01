import { v4 as uuid } from 'uuid';

import r from 'server/api/rethink';


export default function newPostHandler(req, res, next) {
  const { text, lat, lon } = req.body;
  r.table('posts')
    .insert({
      id: uuid(),
      text,
      lat,
      lon,
    })
    .run()
    .then(() => {
      res.send({ success: true });
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
}
