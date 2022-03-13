const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const CleanCSS = require('clean-css');

gulp.task('styles', function () {
  const cleanOptions = {
    compatibility: '*',
    inline: ['all'],
    level: 2,
  };

  return gulp
    .src('./scss/main.scss')
    .pipe(sass({ includePaths: ['./scss'] }))
    .pipe(postcss([autoprefixer()]))
    .on('data', function (file) {
      const buferFile = new CleanCSS(cleanOptions).minify(file.contents);
      return (file.contents = Buffer.from(buferFile.styles));
    })
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', (done) => {
    gulp.series(['styles'])(done);
  });
});
