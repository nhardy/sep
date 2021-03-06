import { find, get } from 'lodash-es';

import r from 'server/api/rethink';


export default async function getVotesHandler(req, res, next) {
  const { id } = req.params;

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
  } catch (e) {
    next(e);
    return;
  }

  let value;
  if (res.locals.username) {
    try {
      value = await r.table('votes')
        .filter({ post: id, username: res.locals.username })
        .run()
        .then(([vote]) => get(vote, 'value', null));
    } catch (e) {
      next(e);
      return;
    }
  }

  r.table('votes')
    .filter({ post: id })
    .group('value')
    .count()
    .run()
    .then((groups) => {
      const upvotes = find(groups, { group: 1 }) || { group: 1, reduction: 0 };
      const downvotes = find(groups, { group: -1 }) || { group: -1, reduction: 0 };
      res.send({
        score: upvotes.reduction - downvotes.reduction,
        value,
      });
    })
    .catch(next);
}
