/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	changed = require('gulp-changed'),
	include  = require('gulp-include'),
	imagemin  = require('gulp-imagemin'),
	connect  = require('gulp-connect'), //tworzy serwer
	browserSync  = require('browser-sync').create(), //tworzy serwer
	plumber  = require('gulp-plumber'), 
	rename  = require('gulp-rename'), 
	minify = require('gulp-uglify');
	// uglify  = require('gulp-uglify'),
	// sass  = require('gulp-sass'), 
	// watch = require('gulp-watch');

/**
 * Sources
 */
var jsSources = [
	'components/scripts/_main.js'
	],

	sassSources = 'components/sass/styles.scss',

	cssSources = 'builds/development/css',

	htmlSources = 'builds/development/*.html',

	imgSources = 'components/images/**/*',

	imgDestination = 'builds/development/images';

//Proste logowanie
gulp.task('log', function () {
	gutil.log('Błąd!!');
});

//Łączenie JS
gulp.task('js',function () {
	gulp.src(jsSources)
	.pipe(plumber())
	.pipe(include())
		.on('error', gutil.log)
	// .pipe(watch(jsSources))
	// .pipe(browserify())
	.pipe(rename('jquery.frodo.js'))
	.pipe(gulp.dest('builds/development/js'))
	.pipe(connect.reload())
	// .pipe(watch())
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(sassSources)
	.pipe(plumber())
	// .pipe(watch(sassSources))
	.pipe(compass({
		css: 'builds/development/css/',
		sass: 'components/sass/',
		image: 'builds/development/images',
		style: 'compact',
	}))
	.on('error', gutil.log)
	.pipe(autoprefixer(' > 2%'))
	// .pipe(sass(
	// 	{ outputStyle: 'compact' }))
	.pipe(gulp.dest(cssSources))
	.pipe(connect.reload())
});

//Serwer - LiveReload
// gulp.task('connect', function () {
// 	connect.server({
// 		root: 'builds/development/',
// 		livereload: true
// 	});
// });
//Serwer - BrowserSync
gulp.task('connect', function () {
	browserSync.init({
		server: {
			baseDir: './builds/development/'
		}
	});

	// gulp.watch('components/sass/**/*.scss', ['sass']);
	gulp.watch('builds/development/css/**/*').on('change', browserSync.reload);
	gulp.watch('builds/development/js/**/*').on('change', browserSync.reload);
	gulp.watch('builds/development/*.html').on('change', browserSync.reload);
});

//Html
gulp.task('html', function () {
	gulp.src(htmlSources)
	// .pipe(watch(htmlSources))
	.pipe(connect.reload());
});

//Zdjęcia
gulp.task('img', function () {
	gulp.src(imgSources)
	.pipe(plumber())
	// .pipe(watch(imgSources))
	.pipe(changed(imgDestination))
	.pipe(imagemin())
	.pipe(gulp.dest(imgDestination));
});


// ////////////////////////////////////////////////
// Build Task
// // /////////////////////////////////////////////
//usuwa wszystko za katalogu build
gulp.task('build:cleanfolder', function(callback) {
	del([
		'build/**'
	], callback);
});

//buduje katalog na wszystkie pliki
gulp.task('build:copy' , ['build:cleanfolder'],  function(){
	return gulp.src('app/**/*')
	.pipe(gulp.dest('build'));
});

//usuwa niepotrzebe pliki z katalogu build
gulp.task('build:remove' ,['build:copy'] ,function(callback) {
	del([
		'build/styles/',
		'build/js/!(*.min.js)'
		], callback);
});

gulp.task('build', ['build:copy', 'build:remove']);


/**
 * Watch task
 */
gulp.task('watch', function () {
	gulp.watch(htmlSources, ['html']);
	gulp.watch('components/sass/**/*.scss', ['sass']);
	gulp.watch('components/scripts/*.js', ['js']);
	gulp.watch('imgSources', ['img']);
});

/**
 * Default task
 */
gulp.task('default', ['html', 'js', 'sass', 'img', 'connect', 'watch']);