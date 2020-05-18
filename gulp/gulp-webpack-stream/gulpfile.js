const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const compiler = require('webpack');
const named = require('vinyl-named');
const through = require('through2');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', () => {
	return gulp.src('src/entry.js')
		.pipe(webpack({
			/* config */
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('config', () => {
	return gulp.src('src/entry.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', () => {
	return gulp.src('src/entry.js')
		.pipe(webpack({
			/* config */
		}, compiler, function(err, stats) {
			/* Use stats to do more things if needed */
		}))
		.pipe(gulp.dest('dist/'));
});
 
gulp.task('watch', ['build'], () => {
	gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('multipleEntries', () => {
	return gulp.src('src/entry.js')
		.pipe(webpack({
			entry: {
				app: 'src/app.js',
				test: 'test/test.js',
			},
			output: {
				filename: '[name].js',
			},
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('vinylNamed', () => {
	return gulp.src(['src/app.js', 'test/test.js'])
		.pipe(named())
		.pipe(webpack())
		.pipe(gulp.dest('dist/'));
});

gulp.task('gulpSM', () => {
	return gulp.src(['src/app.js', 'test/test.js'])
		.pipe(named())
		.pipe(webpack({
			devtool: 'source-map'
		}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(through.obj(function (file, enc, cb) {
			// Dont pipe through any source map files as it will be handled
			// by gulp-sourcemaps
			const isSourceMap = /\.map$/.test(file.path);
			if (!isSourceMap) this.push(file);
			cb();
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/'));
});
