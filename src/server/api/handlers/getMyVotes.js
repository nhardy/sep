import r from 'server/api/rethink';


export default function getMyVotesHandler(req, res, next) {
  const { username } = req.params;

  if (username !== res.locals.username) {
    const error = new Error('You do not have permission to view this resource');
    error.status = 403;
    next(error);
    return;
  }

  r.table('votes')
    .filter({ username })
    .run()
    .then((votes) => {
      res.send({
        votes: Object.assign({}, ...votes.map(({ post, value }) => ({ [post]: { value } }))),
      });
    })
    .catch(next);
}
