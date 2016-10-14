import r from 'server/api/rethink';
import postTransformer from 'server/api/transformers/post';


export default function getPostsHandler(req, res, next) {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.lon);

  if (!(latitude && longitude)) {
    const error = new Error('You must supply a valid value for `lat` and `lon`');
    error.status = 400;
    next(error);
    return;
  }

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
    .merge(post => ({
      hot: r.table('votes')
        .getAll(post('id'), { index: 'post' })
        .map(vote => vote('value'))
        .reduce((acc, current) => acc.add(current)),
    }))
    .run()
    .then((posts) => {
      res.send({
        items: posts.map(postTransformer),
      });
    })
    .catch(next);
}

