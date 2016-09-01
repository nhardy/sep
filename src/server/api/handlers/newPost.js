import { v4 as uuid } from 'uuid';

import r from 'server/api/rethink';


export default function newPostHandler(req, res, next) {
  const { text, latitude, longitude } = req.body;
  r.table('posts')
    .insert({
      id: uuid(),
      text,
      latitude,
      longitude,
    })
    .run()
    .then(() => {
      res.send({ success: true });
    })
    .catch(next);
}
