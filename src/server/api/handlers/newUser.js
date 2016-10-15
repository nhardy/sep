import { first } from 'lodash-es';
import atob from 'atob';

import r from 'server/api/rethink';
import { hash } from 'server/lib/password';
import { VALID_USERNAME_REGEX, VALID_PASSWORD_REGEX, VALID_MOBILE_REGEX } from 'app/lib/validation';


export default async function newUserHandler(req, res, next) {
  const {
    username,
    password: passwordBase64,
    mobile,
  } = req.body;

  if (!VALID_USERNAME_REGEX.test(username)) {
    const error = new Error('Invalid username');
    error.status = 400;
    next(error);
    return;
  }

  let password;
  try {
    password = atob(passwordBase64);
  } catch (e) {
    const error = new Error('Incorrectly encoded password');
    error.status = 400;
    next(error);
    return;
  }

  if (!VALID_PASSWORD_REGEX.test(password)) {
    const error = new Error('Invalid password');
    error.status = 400;
    next(error);
    return;
  }

  if (!VALID_MOBILE_REGEX.test(mobile)) {
    const error = new Error('Invalid mobile number');
    error.status = 400;
    next(error);
    return;
  }

  const user = await r.table('users')
    .filter({ username })
    .run()
    .then(users => first(users));
  if (user) {
    const error = new Error('Username is a duplicate');
    error.status = 409;
    next(error);
    return;
  }

  const hashed = await hash(password);
  r.table('users')
    .insert({
      username,
      password: hashed,
      mobile,
    })
    .run()
    .then(() => {
      res.status(201);
      res.location(`/api/users/${username}`);
      res.end();
    })
    .catch(next);
}
