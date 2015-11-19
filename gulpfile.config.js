'use strict';

var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        //TypeScript
        this.sourceApp = this.source + 'ts/';

        this.tsOutputPath = this.source + '/js';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';


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

            imgDestination = 'builds/development/images',

            sassOptions = {
                errLogToConsole: true,
                outputStyle: 'compact'
            };

        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;