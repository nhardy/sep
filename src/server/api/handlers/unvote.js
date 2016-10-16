import r from 'server/api/rethink';


export default async function unvoteHandler(req, res, next) {
  const { id } = req.params;
  const { username } = res.locals;

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
      .get([id, username])
      .delete()
      .run();
  } catch (e) {
    next(e);
    return;
  }

  next();
}
