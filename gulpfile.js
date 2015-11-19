/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
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
	jshint = require('gulp-jshint'),
	minify = require('gulp-uglify'),
	del = require('del'),
	debug = require('gulp-debug'),
	inject = require('gulp-inject'),
	tsc = require('gulp-typescript'),
	tslint = require('gulp-tslint'),
	sourcemaps = require('gulp-sourcemaps'),
	debug = require('gulp-debug'),
	Config = require('./gulpfile.config'),
	tsProject = tsc.createProject('tsconfig.json');
	// beautify = require('gulp-beautify'),
	// watch = require('gulp-watch');

//Initialize gulp config 
var config = new Config();

/**
 * Typescript
 */

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
                              config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
                              config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
                              '!' + config.tsOutputPath + '/lib'
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

/**
 * END TypeScript
 */

//Łączenie JS
gulp.task('js',function () {
	gulp.src(config.jsSources)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(plumber())
	.pipe(include())
		.on('error', gutil.log)
	.pipe(rename('jquery.frodo.js'))
	.pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
	.pipe(gulp.dest('builds/development/js'))
});

//JS linting
gulp.task('lint', function () {
	gulp.src(config.jsSources)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(config.sassSources)
	.pipe(plumber())
	.pipe(sass(config.sassOptions))
	.on('error', gutil.log)
	.pipe(autoprefixer(' > 2%'))
	.pipe(rename('jquery.frodo.css'))
	.pipe(gulp.dest(config.cssSources))
});

//Serwer - BrowserSync
gulp.task('connect', function () {
	browserSync.init({
		server: {
			baseDir: 'builds/development/'
		}
		// logLevel: "debug",
		// logConnections: true
		// browser: ["google-chrome", "firefox"]
	});

	// gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('builds/development/css/**/*').on('change', reload);
	gulp.watch('builds/development/js/**/*').on('change', reload);
	gulp.watch('builds/development/*.html').on('change', reload);
});

//Html
gulp.task('html', function () {
	gulp.src(config.htmlSources)
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
	gulp.src(config.imgSources)
	.pipe(plumber())
	.pipe(changed(config.imageOutput))
	.pipe(imagemin())
	.pipe(gulp.dest(config.imageOutput));
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
	gulp.watch(config.htmlSources, ['html']);
	gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
	gulp.watch('src/js/*.js', ['lint']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch(config.imgSources, ['img']);
});

/**
 * Default task
 */
gulp.task('default', ['html', 'js', 'sass', 'img', 'connect', 'watch']);
gulp.task('ts', ['html', 'ts-lint', 'compile-ts','js', 'sass', 'img', 'connect', 'watch']);
// gulp.task('ts', ['ts-lint', 'compile-ts']);