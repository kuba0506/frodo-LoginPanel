/*(function($) {

    // the constructor
    var MyClass = function( node, options ) {

        // node is the target
        this.node = node;

        // options is the options passed from jQuery
        this.options = $.extend({

            // default options here
            id: 0

        }, options);

    };

    // A singleton for private stuff
    var Private = {

        increaseId: function( val ) {

            // private method, no access to instance
            // use a bridge or bring it as an argument
            this.options.id += val;
        }
    };

    // public methods
    MyClass.prototype = {

        // bring back constructor
        constructor: MyClass,

        // not necessary, just my preference.
        // a simple bridge to the Private singleton
        Private: function(  ) { //fn, arguments

            var args = Array.prototype.slice.call( arguments ),
                fn = args.shift();

            if ( typeof Private[ fn ] == 'function' ) {
                Private[ fn ].apply( this, args );
            }
        },

        // public method, access to instance via this
        increaseId: function( val ) {

            alert( this.options.id );

            // call a private method via the bridge
            this.Private( 'increaseId', val );

            alert( this.options.id );

            // return the instance for class chaining
            return this;

        },

        // another public method that adds a class to the node
        applyIdAsClass: function() {

            this.node.className = 'id' + this.options.id;

            return this;

        }
    };


    // the jQuery prototype
    $.fn.myClass = function( options ) {

        // loop though elements and return the jQuery instance
        return this.each( function() {

            // initialize and insert instance into $.data
            $(this).data('myclass', new MyClass( this, options ) );
        });
    };

}( jQuery ));*/

;(function ($) {
  "use strict";

  /**
   * CONSTRUCTOR
   */
   var FrodoLoginPanel = function ( element, options ) {
        // Object properties
        this.element = element;
        this.options = $.extend(true, {}, defaults, options); //extend default options

   };

  /**
   * PRIVATE PROPERTIES
   */
  var Private = {

    //DEFAULT SETTINGS
    defaults: {
        lang: 'en',
        version: 'basic',
        provider: ['linkedin', 'facebook', 'google'],
        device: 'desktop',
        clientId: '',
        redirectUri: '/',
        scope: ''
    },

    //MAIN CONFIG
    frodoConfig: {
        //State values
        currentForm: null,
        forms: ['login', 'signup', 'reset'],

        //Classes and ids
        body: 'body',
        frodoWrapper: 'frodo-wrapper',
        frodo: 'frodo',
        frodoOverlay: 'frodo-overlay',
        frodoForm: 'frodo-form',
        frodoHeader: {
            header: 'frodo-header',
            text: 'frodo-header-txt',
            closeBtn: 'frodo-btn-close'
        },
        frodoLogin: {
            box: 'frodo-login-box',
            message: 'frodo-message',
            messageAlert: 'frodo-message-alert',
            messageSuccess: 'frodo-message-success',
            frodoProvider: 'frodo-provider',
            frodoProviderMobile: 'frodo-provider-mobile',
            input: 'frodo-input',
            inputWrapper: 'frodo-input-wrapper',
            inputError: 'frodo-err-msg',
            footer: 'frodo-login-footer',
            linksWrapper: 'frodo-links',
            forgot: 'frodo-forgot',
            signUp: 'frodo-sign-up',
            submit: 'frodo-btn-submit'
        },
        log: 'frodo-log-with',
        social: 'frodo-social',

        //Helpers
        frodoVisible: 'frodo-visible',
        hideClass: 'frodo-hide',
        noScroll: 'frodo-no-scroll',

        //Error classes
        errorClass: {
            input: 'frodo-err-input',
            msg: 'frodo-err-msg'
        },

        //Form settings
        method: 'get',
        submitUrl: '?',
        forgotLink: '#',
        signUpLink: '#'
    },

    //TRANSLATIONS
    translation: {
        'en': {
            loginTxt: 'Log in',
            signUpTxt: 'Sign up',
            resetTxt: 'Password Reset',
            userPlaceholder: 'Fullname',
            passPlaceholder: 'Password',
            passConfirmPlaceholder: 'Confirm password',
            emailPlaceholder: 'Email',
            emailResetPlaceholder: 'Your email address',
            links: ['Forgot your password ?', 'Sign up now', 'Log in now'],
            login: 'Submit',
            logWith: 'or',
            //Errors
            errors: {
                email: 'Invalid email address format',
                password: 'Password should be at least 8 characters',
                passwordNotMatch: 'Passwords don\'t match',
                fullname: 'Invalid username'
            }
        },
        'se': {
            loginTxt: 'Logga in',
            signUpTxt: 'Skapa nytt konto',
            resetTxt: 'E-postadress Återställning',
            userPlaceholder: 'För och efternamn',
            passPlaceholder: 'Lösenord',
            passConfirmPlaceholder: 'Bekräfta lösenord',
            emailPlaceholder: 'E-postadress',
            emailResetPlaceholder: 'Din E-postadress',
            links: ['Glömt lösenord?', 'Skapa nytt konto', 'Logga in'],
            login: 'Skicka',
            logWith: 'eller',
            //Errors
            errors: {
                email: 'Ogiltig E-mailadress',
                password: 'Lösenord skall innehålla minst åtta tecken',
                passwordNotMatch: 'De använda lösernorden stämmer inte med varandra',
                fullname: 'Ogiltigt användarnamn'
            }
        },
        'dk': {
            loginTxt: 'Log ind',
            signUpTxt: 'Opret ny konto',
            resetTxt: 'Nulstil adgangskode',
            userPlaceholder: 'For-og efternavn',
            passPlaceholder: 'Adgangskode',
            passConfirmPlaceholder: 'Bekræft adgangskode',
            emailPlaceholder: 'Mailadresse',
            emailResetPlaceholder: 'Din mailadresse',
            links: ['Glemt adgangskode?', 'Opret ny konto', 'Log ind'],
            login: 'Send',
            logWith: 'eller',
            //Errors
            errors: {
                email: 'Ugyldig mailadresse',
                password: 'Adgangskode skal indeholde mindst otte tegn',
                passwordNotMatch: 'De indtastede adgangskoder er ikke ens',
                fullname: 'Ugyldigt brugernavn'
            }
        },
        'no': {
            loginTxt: 'Logg inn',
            signUpTxt: 'Opprett ny konto',
            resetTxt: 'Nullstill passord',
            userPlaceholder: 'For- og etternavn',
            passPlaceholder: 'Passord',
            passConfirmPlaceholder: 'Bekreft passord',
            emailPlaceholder: 'E-postadresse',
            emailResetPlaceholder: 'Din e-postadresse',
            links: ['Glemt passordet ditt ?', 'Opprett ny konto', 'Logg inn'],
            login: 'Send',
            logWith: 'eller',
            //Errors
            errors: {
                email: 'Ugyldig e-postadresse',
                password: 'Passordet må være på minst åtte tegn',
                passwordNotMatch: 'Passordet matcher ikke inntastet passord',
                fullname: 'Ugyldig brukernavn'
            }
        },
        'ar': {
            loginTxt: 'تسجيل دخول',
            signUpTxt: 'تسجيل',
            resetTxt: 'إعادة تعيين كلمة المرور',
            userPlaceholder: 'الاسم الكامل',
            passPlaceholder: 'كلمة المرور',
            passConfirmPlaceholder: 'تأكيد كلمة المرور',
            emailPlaceholder: 'بريد إلكتروني',
            emailResetPlaceholder: 'عنوان بريدك الإلكتروني',
            links: ['هل نسيت كلمة المرور؟', 'التسجيل الآن', 'تسجيل الدخول الآن'],
            login: 'اعتماد',
            logWith: 'أو',
            //Errors
            errors: {
                email: ' تنسيق عنوان البريد الإلكتروني غير صحيح',
                password: 'يجب أن تتكون كلمة المرور من 8 حروف على الأقل',
                passwordNotMatch: 'كلمة المرور غير متطابقة',
                fullname: 'اسم المستخدم غير صحيح'
            }
        }
    },

    //SOCIAL BUTTONS
    socialBtn: {
        'eniro': {
            text: 'Eniro',
            link: '#'
        },
        'facebook': {
            text: 'Facebook',
            link: '#'
        },
        'twitter': {
            text: 'Twitter',
            link: '#'
        },
        'google': {
            text: 'Google',
            link: '#'
        },
        'linkedin': {
            text: 'LinkedIn',
            link: '#'
        },
        'android': {
            text: 'Android',
            link: '#'
        },
        'skype': {
            text: 'Skype',
            link: '#'
        }
    }

  };

  /**
   * PUBLIC METHODS
   */
  FrodoLoginPanel.prototype = {

    constructor: FrodoLoginPanel, //Bring back constructor

    init: function () {},

    build: function () {},

    destroy: function () {}
  };

  /*
  JQUERY PROTOTYPE
   */
  $.fn.frodoLoginPanel = function (options) {

    if (this.length) { //don't act on empty elements

        return this.each(function () { // loop though elements and return the jQuery instance
            // $(this).data('frodoLoginPanel', new FrodoLoginPanel(this, options));
            $.data(this, 'frodoLoginPanel', new FrodoLoginPanel(this, options)); // initialize and insert instance into $.data
        });

    }

  };

})(jQuery);
