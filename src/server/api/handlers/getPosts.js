import r from 'server/api/rethink';
import postTransformer from 'server/api/transformers/post';


export default function getPostsHandler(req, res, next) {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.lon);

  r.table('posts')
    .filter(
      r.distance(
        r.row('location'),
        r.point(
          longitude,
          latitude
        ),
        { unit: 'm' }
      )
      .lt(10000)
    )
    .run()
    .then((posts) => {
      res.send({
        items: posts.map(postTransformer),
      });
    })
    .catch(next);
}

