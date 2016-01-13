'use strict';
//For production type: gulp --type production

var gutil = require('gulp-util'),
    minify = require('gulp-uglify'),
    prod = gutil.env.type === 'production';

var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        // this.source = './src/';
        //TypeScript
        this.sourceApp = this.source + 'ts';

        this.tsOutputPath = this.source + 'js/';
        this.jsSources = [this.source + 'js/*.js'];
        // this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';

        //Development and production
        this.devSource = './builds/development/';
        // this.devSource = './builds/development/';
        this.prodSource = './builds/production/';
        // this.prodSource = './builds/production/';

        // JS
        this.devJS = this.devSource + 'js/';
        this.prodJS = this.prodSource + 'js/';
        this.jsOutput =  prod ? this.prodJS : this.devJS;
        this.devJsName = 'jquery.frodo.js';
        this.prodJsName = 'jquery.frodo.min.js';
        this.jsFileName = prod ? this.prodJsName : this.devJsName;

        //Sass
        this.sassSources = 'src/sass/';
        this.sassOptions = {
            errLogToConsole: true,
            outputStyle: prod ? 'compressed' : 'compact'
        };

        // CSS
        this.devCss = this.devSource + '/css';
        this.prodCss = this.prodSource + '/css';
        this.cssOutput =  prod ? this.prodCss : this.devCss;
        this.devCssName = 'jquery.frodo.css';
        this.prodCssName = 'jquery.frodo.min.css';
        this.cssFileName = prod ?  this.prodCssName : this.devCssName;

        // HTML
        this.devHtml = this.devSource + '*.html';
        this.prodHtml = this.prodSource + '*.html';

        // IMAGES
        this.imgSources = this.source + 'images/**/*';
        this.devImg = this.devSource + 'images';
        this.prodImg = this.prodSource + 'images';
        this.imgOutput = prod ? this.prodImg : this.devImg;

        this.prodMinify = prod ? minify() : gutil.noop();
        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;