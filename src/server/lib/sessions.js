import { v4 as uuid } from 'uuid';


const sessions = {};
export default sessions;

export function add(username) {
  const token = uuid();
  sessions[token] = username;
  return token;
}

export function remove(token) {
  delete sessions[token];
}
