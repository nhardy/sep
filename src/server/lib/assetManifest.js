import fs from 'fs';


let manifest = null;

export default function assetManifest() {
  if (!manifest || __DEVELOPMENT__) {
    manifest = JSON.parse(fs.readFileSync('./dist/webpackStats.json'));
  }

  return manifest;
}
