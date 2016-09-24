// Using `require` here because `babel-node` (used by `gulp`)
// ignores some settings in the `.babelrc` and we need to ensure
// the order of execution here.
// @see https://github.com/babel/babel/issues/4082

/* eslint-disable import/no-commonjs */
require('babel-register')({
  ignore: (filename) => {
    if (filename.includes('lodash-es')) return false;
    if (filename.includes('node_modules')) return true;
    return false;
  },
});

require('./tasks');
