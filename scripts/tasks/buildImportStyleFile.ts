import gulp from 'gulp'
import rename from 'gulp-rename'
import ts from 'gulp-typescript'
import { Transform } from 'node:stream'

interface Options {
  cwd?: string;
  esDir?: string;
  libDir?: string;
}

function gulpBuildImportStyleFile() {
  const transformStream = new Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      if (file.isStream()) {
        return callback();
      }

      const contents = file.contents.toString().replaceAll('.less', '.css')

      file.contents = Buffer.from(contents);

      callback(null, file);
    }
  })

  return transformStream;
}

export async function buildImportStyleFile(opts: Options = {}) {
  const { cwd = process.cwd(), esDir = 'es', libDir = 'lib' } = opts;

  function buildCssLib() {
    return gulp
      .src(['./src/**/style/index.ts'], {
        base: './src/',
        cwd,
      })
      .pipe(gulpBuildImportStyleFile())
      .pipe(ts({
        module: 'commonjs',
        declaration: false,
      }))
      .pipe(rename({
        basename: 'css',
        extname: '.cjs'
      }))
      .pipe(gulp.dest(`./${libDir}`))
  }

  function buildLessLib() {
    return gulp
      .src(['./src/**/style/index.ts'], {
        base: './src/',
        cwd,
      })
      .pipe(ts({
        module: 'commonjs',
        declaration: false,
      }))
      .pipe(rename({
        basename: 'index',
        extname: '.cjs'
      }))
      .pipe(gulp.dest(`./${libDir}`))
  }

  function buildCssES() {
    return gulp
      .src(['./src/**/style/index.ts'], {
        base: './src/',
        cwd,
      })
      .pipe(gulpBuildImportStyleFile())
      .pipe(rename({
        basename: 'css',
        extname: '.mjs'
      }))
      .pipe(gulp.dest(`./${esDir}`))
  }

  function buildLessES() {
    return gulp
      .src(['./src/**/style/index.ts'], {
        base: './src/',
        cwd,
      })
      .pipe(rename({
        extname: '.mjs'
      }))
      .pipe(gulp.dest(`./${esDir}`))
  }

  return gulp.parallel(buildCssLib, buildLessLib, buildCssES, buildLessES)(() => {});
}
