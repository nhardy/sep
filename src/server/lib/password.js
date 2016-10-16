import p from 'password-hash-and-salt';


export function hash(password) {
  return new Promise((resolve, reject) => {
    p(password).hash((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export function verify(password, hashed) {
  return new Promise((resolve, reject) => {
    p(password).verifyAgainst(hashed, (err, verified) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(verified);
    });
  });
}
