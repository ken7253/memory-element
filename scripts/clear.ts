/**
 * ビルド前に前回のビルド結果を消す処理
 */
import fs from 'node:fs';
import path from 'node:path';

/** 設定 */
const config = {
  dir: 'dist',
}

const exec = () => {
  fs.rmdir(path.join(process.cwd(), config.dir), () => {
    console.log(`LOG: remove directory.\n at ${path.join(process.cwd(), config.dir)}`);
  });
}

exec();
