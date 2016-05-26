import fs from 'fs';


let manifest = null;

export default function assetManifest(disableCache = false) {
  if (!manifest || disableCache) {
    manifest = JSON.parse(fs.readFileSync('./dist/webpackStats.json'));
  }

  return manifest;
}
