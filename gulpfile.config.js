'use strict';

var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        //TypeScript
        this.sourceApp = this.source + 'ts/';

        this.tsOutputPath = this.source + '/js';
        this.jsSources = [this.source + '/js/*.js'];
        // this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';

        //Sass
        this.sassSources = 'src/sass/*.scss';
        this.sassOptions = {
            errLogToConsole: true,
            outputStyle: 'compact'
        };

        // CSS
        this.cssSources = 'builds/development/css';

        // HTML
        this.htmlSources = 'builds/development/*.html';

        // IMAGES
        this.imgSources = 'src/images/**/*';
        this.imageOutput = 'builds/development/images';


        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;