import path from 'node:path'
import fs from 'node:fs'
import gulp from 'gulp'
// @ts-ignore
import less from 'gulp-less'
import cleanCss from 'gulp-clean-css'
import rename from 'gulp-rename'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

interface Options {
  cwd?: string;
  esDir?: string;
  libDir?: string;
  distDir?: string;
}

export async function buildStyle(opts: Options = {}) {
  const {
    cwd = process.cwd(),
    esDir = 'es',
    libDir = 'lib',
    distDir = 'dist'
  } = opts;

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
      path.join(cwd, libDir, 'style', 'components.less'),
      componentsLessContent,
    );
    fs.writeFileSync(
      path.join(cwd, esDir, 'style', 'components.less'),
      componentsLessContent,
    );

    fs.writeFileSync(
      path.join(cwd, distDir, 'sensoro.less'),
      '@import "../es/style/index.less";\n@import "../es/style/components.less";',
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

  function buildCss() {
    return gulp
      .src(['./dist/**/*.less'])
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
      .pipe(gulp.dest(`./${distDir}`))
      .pipe(cleanCss({ }))
      .pipe(rename((path) => {
        return {
          dirname: path.dirname,
          basename: path.basename + ".min",
          extname: '.css'
        }
      }))
      .pipe(gulp.dest(`./${distDir}`))
  }

  return gulp.series(gulp.parallel(copyLess, buildLess), gulp.series(componentLess, buildCss))(() => {})
}
