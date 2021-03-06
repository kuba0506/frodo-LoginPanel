/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
    //CSS
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),

    //HTML
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    htmlhint = require("gulp-htmlhint") //html validator
    //CSS
    uncss = require('gulp-uncss'), //remove unused css
    csslint = require('gulp-csslint'),
    //JS
    include  = require('gulp-include'),
    prettify = require('gulp-jsbeautifier'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'), //code style
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    //IMG
    imagemin  = require('gulp-imagemin'),
    //UTILS
    gutil = require('gulp-util'), //dodatkowe narzędzia jak log
    changed = require('gulp-changed'),
    //Browser Sync
    browserSync  = require('browser-sync').create(), //tworzy serwer
    reload = browserSync.reload,
    //Fix broken pipe
    plumber  = require('gulp-plumber'),
    //Debug
    debug = require('gulp-debug'),
    //Minify
    minify = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    del = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	Config = require('./gulpfile.config'),
	tsProject = tsc.createProject('tsconfig.json');

//Initialize gulp config
var config = new Config();

/**
 * Typescript START
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
                       // .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        // .pipe(sourcemaps.write('.'))
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
 * TypeScript END
 */

//Łączenie JS
gulp.task('js',function () {
	gulp.src(config.jsSources +  'js/*.js')
	.pipe(plumber())
	.pipe(debug())
	.pipe(sourcemaps.init())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(include())
		.on('error', gutil.log)
    .pipe(rename(config.jsFileName))
    .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    //.pipe(config.prodMinify)
    .pipe(rename(config.jsFileName))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src'))
	.pipe(gulp.dest(config.jsOutput))
});

//JS linting
gulp.task('lint', function () {
	gulp.src(config.jsSources +  'js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(config.sassSources + '*.scss')
	.pipe(plumber())
	.pipe(debug())
	.pipe(sourcemaps.init())
	.pipe(sass(config.sassOptions))
	.on('error', gutil.log)
	.pipe(autoprefixer({browsers: ['> 2%']}))
	.pipe(rename(config.cssFileName))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.cssOutput))
});

//CSS
gulp.task('css', function () {
    gulp.src(config.outputSource + config.outputCssName)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(uncss({
            html: [config.htmlOutput  + '*.html']
        }))
        .pipe(gulp.dest(config.htmlOutput));
});


//Serwer - BrowserSync
gulp.task('connect', function () {
	browserSync.init({
		server: {
			// baseDir: config.devSource
			baseDir: config.outputSource
		}
		// logLevel: "debug",
		// logConnections: true
		// browser: ["google-chrome", "firefox"]
	});

	// gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch(config.htmlSources).on('change', reload);
	gulp.watch(config.sassSources + '**/*').on('change', reload);
	gulp.watch(config.jsSources +  'js/*.js').on('change', reload);
	// gulp.watch(config.devSource + '/*.html').on('change', reload);
});


		// function() {
  // return gulp.src('src/*.html')
  //   .pipe(htmlmin({collapseWhitespace: true}))
  //   .pipe(gulp.dest('dist'))
//Html
gulp.task('html', function () {
	gulp.src(config.htmlSources)
            .pipe(htmlhint())
            .pipe(htmlhint.reporter())
            //.pipe(config.prodHtmlMin)
			// .pipe(htmlmin(config.htmlOptions))
			.pipe(gulp.dest(config.htmlOutput));
});
// Include sources
gulp.task('include', function () {
	gulp.src(config.htmlOutput + '**/*.*')
			.pipe(gulp.dest(config.htmlOutput));
});
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
	// .pipe(gulp.dest(devHtml))
	// .pipe(watch(devHtml))
	// .pipe(connect.reload());

//Zdjęcia
gulp.task('img', function () {
	gulp.src(config.imgSources)
	.pipe(plumber())
	.pipe(debug())
	.pipe(changed(config.imgOutput))
	.pipe(imagemin())
	.pipe(gulp.dest(config.imgOutput));
});


// ////////////////////////////////////////////////
// Build Task
// // /////////////////////////////////////////////
//usuwa wszystko z katalogu build
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
	gulp.watch(config.jsSources +  'js/*.js', ['js']);
	gulp.watch(config.sassSources + '**/*.scss', ['sass']);
	gulp.watch(config.imgSources, ['img']);
});

/**
 * Default task
 */
gulp.task('default', ['html', 'js', 'sass', 'css', 'img', 'include','connect', 'watch']);
gulp.task('ts', ['html', 'ts-lint', 'compile-ts','js', 'sass', 'css', 'img', 'include', 'connect', 'watch']);
