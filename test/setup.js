import path from 'path';

import { addPath } from 'app-module-path';
import chai from 'chai';


addPath(path.resolve(__dirname, '..'));
global.expect = chai.expect;
