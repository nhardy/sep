import r from 'server/api/rethink';
import postTransformer from 'server/api/transformers/post';


export default function postHandler(req, res, next) {
  const { id } = req.params;

  r.table('posts')
    .filter({ id })
    .merge(post => ({
      hot: r.table('votes')
        .getAll(post('id'), { index: 'post' })
        .map(vote => vote('value'))
        .reduce((acc, current) => acc.add(current)),
    }))
    .run()
    .then(([post]) => {
      if (!post) {
        const error = new Error(`The post with id:'${id}' was not found`);
        error.status = 404;
        throw error;
      }

      res.send({
        item: postTransformer(post),
      });
    })
    .catch(next);
}
