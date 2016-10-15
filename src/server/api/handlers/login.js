import { first } from 'lodash-es';
import atob from 'atob';

import r from 'server/api/rethink';
import { verify } from 'server/lib/password';
import { add } from 'server/lib/sessions';


export default async function loginHandler(req, res, next) {
  const { username } = req.params;
  const { password: passwordBase64 } = req.body;
  console.log(req.body);
  let password;
  try {
    password = atob(passwordBase64);
  } catch (e) {
    const error = new Error('Incorrectly encoded password');
    error.status = 400;
    next(error);
    return;
  }

  const user = await r.table('users')
    .filter({ username })
    .run()
    .then(users => first(users));
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    return;
  }

  const verified = await verify(password, user.password);
  if (!verified) {
    const error = new Error('Incorrect password');
    error.status = 401;
    next(error);
    return;
  }

  res.send({
    token: add(user.username),
  });
}
