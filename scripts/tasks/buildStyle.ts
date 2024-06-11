import gulp from 'gulp'
import path from 'node:path'
import fs from 'node:fs'
// @ts-ignore
import less from 'gulp-less'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

interface Options {
  cwd?: string;
  esDir?: string;
  libDir?: string;
}

export async function buildStyle(opts: Options = {}) {
  const { cwd = process.cwd(), esDir = 'es', libDir = 'lib' } = opts;

  function copyLess() {
    return gulp
      .src(['./src/**/*.less'], {
        base: './src/',
        cwd,
        ignore: ['**/demos/**/*', '**/tests/**/*'],
      })
      .pipe(gulp.dest(`./${esDir}`))
      .pipe(gulp.dest(`./${libDir}`))
  }

  function componentLess(cb: () => void) {
    const componentsPath = path.join(process.cwd(), 'src');
    let componentsLessContent = '';
    const files = fs.readdirSync(componentsPath)

    files.forEach((file) => {
      if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
        componentsLessContent += `@import "../${path.posix.join(
          file,
          'style',
          'index.less',
        )}";\n`;
      }
    })

    fs.writeFileSync(
      path.join(process.cwd(), 'lib', 'style', 'components.less'),
      componentsLessContent,
    );
    fs.writeFileSync(
      path.join(process.cwd(), 'es', 'style', 'components.less'),
      componentsLessContent,
    );
    cb();
  }

  function buildLess() {
    return gulp
      .src(['./src/**/*.less'], {
        base: './src/',
        cwd,
        ignore: ['**/demos/**/*', '**/tests/**/*'],
      })
      .pipe(
        less({
          paths: [path.join(cwd, 'src')],
          relativeUrls: true,
        })
      )
      .pipe(
        postcss([
          autoprefixer(),
        ])
      )
      .pipe(gulp.dest(`./${esDir}`))
      .pipe(gulp.dest(`./${libDir}`))
  }

  return gulp.series(gulp.parallel(copyLess, buildLess), componentLess)(() => {})
}
