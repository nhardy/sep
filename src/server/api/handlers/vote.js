import r from 'server/api/rethink';


const ALLOWED_VALUES = [-1, 1];

export default async function voteHandler(req, res, next) {
  const { id } = req.params;
  const { username } = res.locals;
  const { value } = req.body;

  if (!ALLOWED_VALUES.includes(value)) {
    const error = new Error(`Value: '${value}' is not valid`);
    error.status = 400;
    next(error);
    return;
  }

  try {
    await r.table('posts')
      .filter({ id })
      .run()
      .then(([post]) => {
        if (post) return;
        const error = new Error(`Post with id: '${id}' could not be found`);
        error.status = 404;
        throw error;
      });

    await r.table('votes')
      .insert({
        id: [id, username],
        post: id,
        username,
        value,
      }, { conflict: 'replace' })
      .run();
  } catch (e) {
    next(e);
    return;
  }

  next();
}
