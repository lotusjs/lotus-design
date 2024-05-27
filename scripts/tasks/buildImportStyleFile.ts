import gulp from 'gulp'
import { Transform } from 'node:stream'

interface Options {
  cwd?: string;
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

      console.log(file.contents.toString())
      console.log(file.contents.toString().replaceAll('.less', '.css'))

      const contents = file.contents.toString().replaceAll('.less', '.css')

      file.contents = Buffer.from(contents);

      callback(null, file);
    }
  })

  return transformStream;
}

export async function buildImportStyleFile(opts: Options = {}) {
  const { cwd = process.cwd() } = opts;

  function buildLess() {
    return gulp
      .src(['./src/**/style/index.ts'], {
        base: './src/',
        cwd,
      })
      .pipe(gulpBuildImportStyleFile())
      .pipe(gulp.dest('./dist/esm'))
      // .pipe(gulp.dest('./dist/cjs'))
  }

  return buildLess();
}
