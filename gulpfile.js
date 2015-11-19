/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	// compass = require('gulp-compass'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	changed = require('gulp-changed'),
	include  = require('gulp-include'),
	imagemin  = require('gulp-imagemin'),
	connect  = require('gulp-connect'), //tworzy serwer
	browserSync  = require('browser-sync').create(), //tworzy serwer
	reload = browserSync.reload,
	plumber  = require('gulp-plumber'), 
	rename  = require('gulp-rename'), 
	prettify = require('gulp-jsbeautifier'),
	minify = require('gulp-uglify');
	// beautify = require('gulp-beautify'),
	// sass  = require('gulp-sass'), 
	// watch = require('gulp-watch');

/**
 * Sources
 */
var jsSources = [
	'src/js/_main.js'
	],

	sassSources = 'src/sass/styles.scss',

	cssSources = 'builds/development/css',

	htmlSources = 'builds/development/*.html',

	imgSources = 'src/images/**/*',

	imageOutput = 'builds/development/images',

	sassOptions = {
  		errLogToConsole: true,
	    outputStyle: 'compact'
	};

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
	.pipe(rename('jquery.frodo.js'))
	.pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
	.pipe(gulp.dest('builds/development/js'))
	// .pipe(watch(jsSources))
	// .pipe(browserify())
	// .pipe(minify())
	// .pipe(beautify({indentSize: 12}))
	// .pipe(connect.reload())
	// .pipe(watch())gulp
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(sassSources)
	.pipe(plumber())
	// .pipe(watch(sassSources))
	// .pipe(compass({
	// 	css: 'builds/development/css/',
	// 	sass: 'src/sass/',
	// 	image: 'builds/development/images',
	// 	style: 'compact',
	// }))
	.pipe(sass(sassOptions))
	.on('error', gutil.log)
	.pipe(autoprefixer(' > 2%'))
	.pipe(rename('jquery.frodo.css'))
	// .pipe(sass(
	// 	{ outputStyle: 'compact' }))
	.pipe(gulp.dest(cssSources))
	// .pipe(connect.reload())
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
			baseDir: 'builds/development/'
		},
		logLevel: "debug",
		logConnections: true,
		browser: ["google-chrome", "firefox"]
	});

	// gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('builds/development/css/**/*').on('change', reload);
	gulp.watch('builds/development/js/**/*').on('change', reload);
	gulp.watch('builds/development/*.html').on('change', reload);
});

//Html
gulp.task('html', function () {
	gulp.src(htmlSources)
	// .pipe(prettify({
	//         braceStyle: "collapse",
	//         indentChar: " ",
	//         indentScripts: "keep",
	//         indentSize: 0,
	//         maxPreserveNewlines: 10,
	//         preserveNewlines: true,
	//         unformatted: ["a", "sub", "sup", "b", "i", "u"],
	//         wrapLineLength: 0
	// 	}))
	// .pipe(gulp.dest(htmlSources))
	// .pipe(watch(htmlSources))
	// .pipe(connect.reload());
});

//Zdjęcia
gulp.task('img', function () {
	gulp.src(imgSources)
	.pipe(plumber())
	// .pipe(watch(imgSources))
	.pipe(changed(imageOutput))
	.pipe(imagemin())
	.pipe(gulp.dest(imageOutput));
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
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/scripts/*.js', ['js']);
	gulp.watch('imgSources', ['img']);
});

/**
 * Default task
 */
gulp.task('default', ['html', 'js', 'sass', 'img', 'connect', 'watch']);