import sessions from 'server/lib/sessions';


export default function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    const error = new Error('No Authorization Header');
    error.status = 400;
    next(error);
    return;
  }

  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer') {
    const error = new Error(`Invalid Authorization Header Scheme '${scheme}'. Please use 'Bearer'.`);
    error.status = 400;
    next(error);
    return;
  }

  const username = sessions[token];
  if (!username) {
    const error = new Error('Invalid token');
    error.status = 401;
    next(error);
    return;
  }

  res.locals.username = username;
  next();
}
