const gulp = require('gulp');
const sass =  require('gulp-sass');
const browserSync = require('browser-sync');
const minifyCSS = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
	
gulp.task('styles', () => {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('images', () => {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin({ interlaced: true })))
		.pipe(gulp.dest('dist/images'));
});
	
gulp.task('clean', callback => {
	del('dist');
	return cache.clearAll(callback);
})

gulp.task('browserSync', () => {
	browserSync({
		server: { baseDir: 'app' }
	})
})
	
gulp.task('watch', () => {
	gulp.watch('app/scss/**/*.scss', gulp.series('styles'));
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', 
	gulp.series('clean', gulp.parallel('styles', 'images'))
);

gulp.task('dev', 
	gulp.series('build', gulp.parallel('browserSync', 'watch'))
);
