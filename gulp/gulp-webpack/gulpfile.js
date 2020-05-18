const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');

gulp.task('scripts', function () {
  return gulp.src('./src/js/app.js')
    .pipe(webpackStream({
        output: {
            filename: 'app.js',
        },
        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                presets: ['env']
                }
            }]
        },
        externals: {
            jquery: 'jQuery'
        }
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/'));
});
