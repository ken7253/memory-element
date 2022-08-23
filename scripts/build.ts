/**
 * esbuildのビルド用スクリプト
 */
import esbuild from 'esbuild';

import fs from 'node:fs';
import path from 'node:path';

console.time('time');

/** コマンドライン引数 */
const args = [...process.argv].slice(2);
const isWatch = args.includes('-w');

/** 設定 */
const config: esbuild.BuildOptions = {
  bundle: true,
  entryPoints: [path.join('src', 'index.ts')],
  outdir: 'dist',
  minify: !isWatch,
  watch: isWatch,
  sourcemap: isWatch ? 'inline' : 'linked',
  metafile: true,
};

/** build時のログを表示する関数 */
const buildLog = (result: esbuild.BuildResult) => {
  if (result.metafile) {
    fs.writeFileSync(
      path.join(process.cwd(), '.tmp', 'meta.json'),
      JSON.stringify(result.metafile, undefined, 2)
    );
  }
  // エラー表示
  if (result.errors.length !== 0) {
    result.errors.forEach((error) => {
      console.log(error.text);
    });
  }
  // 警告表示
  if (result.warnings.length !== 0) {
    result.warnings.forEach((message) => {
      console.log(message.text);
    });
  }
  // エラーと警告がなければ完了表示
  if (result.warnings.length === 0 && result.errors.length === 0) {
    console.log('complete!');
    console.timeEnd('time');
  }
};

/** watch時のログ表示 */
const watchLog = () => {
  console.timeEnd('time');
  console.log('Watching files...');
};

(async () => {
  esbuild.build(config).then((result) => {
    if (args.includes('-w')) {
      watchLog();
    } else {
      buildLog(result);
    }
  });
})();
