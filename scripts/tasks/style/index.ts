import gulp from 'gulp'
import { join } from 'node:path';
// @ts-ignore
import less from 'gulp-less'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

interface Options {
  cwd?: string;
}

export function buildStyle(opts: Options = {}) {
  const { cwd = process.cwd() } = opts;
  return gulp
    .src(['./src/**/*.less'], {
      base: './src/',
      cwd,
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(
      less({
        paths: [join(cwd, 'src')],
        relativeUrls: true,
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: 'iOS >= 10, Chrome >= 49',
        }),
      ])
    )
    .pipe(gulp.dest('./dist/esm'))
    .pipe(gulp.dest('./dist/cjs'))
}
