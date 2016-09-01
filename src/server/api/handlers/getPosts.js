import r from 'server/api/rethink';


export default function getPostsHandler(req, res, next) {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.lon);

  r.table('posts')
    .filter(
      r.distance(
        r.point(
          r.row('lat'),
          r.row('lon')
        ),
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
        items: posts,
      });
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
}

