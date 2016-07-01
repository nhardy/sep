// Adapted from https://gist.github.com/joshhunt/ed8ab8c757a77a2cf401

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import noop from 'lodash/noop';
import groupBy from 'lodash/groupBy';
import reduce from 'lodash/reduce';


const ROOT = path.resolve(__dirname, '../../../');

const getAssetsByChunk = (webpackData, publicPath) => {
  const chunkRenamer = (chunkName) => `${publicPath}${chunkName}`;
  const assetGrouper = (asset) => path.extname(asset).slice(1);

  return reduce(webpackData.assetsByChunkName, (acc, chunk, chunkName) => {
    const assets = (Array.isArray(chunk) ? chunk : [chunk]).map(chunkRenamer);
    return {
      ...acc,
      [chunkName]: groupBy(assets, assetGrouper),
    };
  }, {});
};

export default class WriteManifestPlugin {
  constructor({ client }) {
    this.config = { client };
  }

  apply(compiler) {
    this.compiler = compiler;
    this.callback = compiler.options.writeStatsPluginCallback || noop;
    compiler.plugin('done', this.onDone.bind(this));
  }

  writeFilesManifest(webpackData) {
    const publicPath = this.compiler.options.output.publicPath;
    const content = {
      publicPath,
      ...getAssetsByChunk(webpackData, publicPath),
    };

    const filepath = path.join(ROOT, 'dist/webpackStats.json');
    const folder = filepath.split('/').slice(0, -1).join('/');

    mkdirp.sync(folder);
    fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
  }

  writeWebpackCache(webpackData) {
    const filepath = path.join(ROOT, `dist/webpack-dump-${this.config.client ? 'client' : 'server'}.json`);
    const folder = filepath.split('/').slice(0, -1).join('/');

    mkdirp.sync(folder);
    fs.writeFileSync(filepath, JSON.stringify(webpackData, null, 2));
  }

  onDone(rawWebpackStats) {
    const webpackData = rawWebpackStats.toJson();

    this.writeWebpackCache(webpackData);

    if (this.config.client) {
      this.writeFilesManifest(webpackData);
    }

    this.callback();
  }
}
