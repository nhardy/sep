import { addPath } from 'app-module-path';
import chai from 'chai';
import path from 'path';


addPath(path.resolve(__dirname, '..'));
global.expect = chai.expect;
