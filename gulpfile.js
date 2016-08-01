var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	htmlmin = require('gulp-htmlmin'),
	css_input = 'app/scss/*.scss',
	css_output = 'dist/dev/css';


gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			//(tem que haver um index.html/js)
			baseDir: "./"
		}
	});
});

// Compile SASS to CSS
gulp.task('sass', function(){
	return gulp.src(css_input)
	.pipe(sass())
	.pipe(gulp.dest(css_output))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('html', function(){
	return gulp.src('app/index.html')
	.pipe(gulp.dest('dist/dev'))
});

/*gulp.task('htmlmin', function(){
	return gulp.src('app/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/dev'))
});*/

// Watch functions
// Browsersync and Sass run before 'the watch' (the css will be the latest)
gulp.task('dev', ['browserSync', 'html', 'sass'], function(){
	gulp.watch(css_input, ['sass']);
	gulp.watch('index.html').on('change', reload);
});

