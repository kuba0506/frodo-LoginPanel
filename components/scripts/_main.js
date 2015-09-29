/**
 * Frodo.js v.1.0 - Multiprovider login panel
 * Copyright (c) 2015, Jakub Jurczyñski
 *
 * Just add data-login attribute to any html element
 * $([data-login]).frodo();
 */
;(function ($) {
    "use strict";

    //Default plugin settings 
    var defaults = {

        lang: 'en',

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
            input: 'frodo-input',
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

        //Settings
        method: 'get',
        submitUrl: '?',
        forgotLink: '#',
        signUpLink: '#',

        //Translation
        loginTxt: 'Log in',
        registerTxt: 'Sign up',
        resetTxt: 'Password Reset',
        userPlaceholder: 'Fullname',
        passPlaceholder: 'Password',
        passConfirmPlaceholder: 'Confirm password',
        emailPlaceholder: 'Email',
        emailResetPlaceholder: 'Your email address',
        links: [ 'Forgot your password ?', 'Sign up now', 'Log in now'],
        login: 'Submit',
        logWith: 'or with:'
    };

        //TEMP - Array of social buttons
    var social = [
        {
            provider: 'facebook',
            text: 'Facebook',
            link: '#'
        },
        {
            provider: 'twitter',
            text: 'Twitter',
            link: '#'
        },
        {
            provider: 'google-plus',
            text: 'Google++',
            link: '#'
        },
        {
            provider: 'linkedin',
            text: 'LinkedIn',
            link: '#'
        },
        {
            provider: 'android',
            text: 'Android',
            link: '#'
        },
        {
            provider: 'skype',
            text: 'Skype',
            link: '#'
        } 
    ];


/*
-------------------C O N S T R U C T O R BEGIN-------------------------------------------------------
 */
    function Frodo(element, options) {
        //Assign this to variable in order to use it also in callback functions
        var frodo = this,
            //Shorthand for frodo.config
            config;

        //Config object 
        frodo.config = config = $.extend(true, {}, defaults, options);

        //Element we call a function on
        frodo.element = element;

 /*
-----------------------------E V E N T  H A N D L E R S BEGIN----------------------------------------------------------
 */

 /*
-----------------------------OPEN LOGIN PANEL--------------------------------------------------------------------
 */
        frodo.element.on('click', function(e) {

            e.preventDefault();

            //Open / reset login panel
            $('.' + config.frodoOverlay).toggleClass(config.frodoVisible);
            $('#' + config.frodo).toggleClass(config.frodoVisible);
            $('#' + config.frodoWrapper).toggleClass('frodo-no-scroll');
            frodo.showAlert(null, {
                messageBox: config.frodoLogin.message,
                text: config.frodoLogin.message + ' > span',
                alert: config.frodoLogin.messageAlert
            });
            frodo.toggleForm('open');
            frodo.clearInputs();
        });

 /*
-----------------------------CLOSE LOGIN PANEL--------------------------------------------------------------------
 */
        //Close login panel
        $(config.body).on('click', '.' + config.frodoHeader.closeBtn, function () {
            frodo.closePanel();
        });

        $(config.body).on('keyup', function (event) {
            //If 'Escape' key is pressed
            if (event.keyCode === 27) {
                frodo.closePanel();
            }
        });

 /*
-----------------------------REGISTER FORM HANDLER-----------------------------------------------------------------
 */
        //Register form handler       
        $(config.body).on('click', '.' +  config.frodoLogin.signUp, function (event) {
          event.preventDefault();
          frodo.toggleForm('sign-up');
        });
 /*
-----------------------------RESET FORM HANDLER-----------------------------------------------------------------
 */
        //Reset form handler
        $(config.body).on('click', '.' +  config.frodoLogin.forgot, function (event) {
          event.preventDefault();
          frodo.toggleForm('reset');
        });
 /*
-----------------------------AJAX FORM VALIDATION-----------------------------------------------------------------
 */
        // TEMP - Ajax - jsonp
        $(config.body).on('click', '.azm-social', function () {
            var url = 'http://jurczynski.czest.pl/registerFailed.json?callback=myCallback',
                url2 = 'http://jurczynski.czest.pl/registerSuccess.json?callback=myCallback',
                address = [url, url2],
                index;

            index = frodo.getRandomInt(0, address.length - 1);

            console.log(address[index]);

            $.ajax({
                type: 'GET',
                url: address[index],
                dataType: 'jsonp',
                jsonpCallback: 'myCallback'
            }).then(function (response) {
                frodo.showAlert(response, {
                    messageBox: config.frodoLogin.message,
                    text: config.frodoLogin.message + '> span',
                    alert: config.frodoLogin.messageAlert
                });
            });
        });

 /*
-----------------------------E V E N T  H A N D L E R S  E N D-------------------------------------------------------
 */

/*
---------------------------------------------------------------------------------------------------------------
 */
        //INITIALIZE PLUGIN
        frodo.init();
    }
/*
-------------------C O N S T R U C T O R  END----------------------------------------------------
 */

/*
-------------------M E T H O D S  BEGIN --------------------------------------------------
 */

    Frodo.prototype.init = function () {
        //Shorthand for this.config
        var config = this.config,
      
        //CACHED OBJECTS
            el = {

            //Main elemenets
            wrapper: $('<div/>', { id: config.frodoWrapper }),
            overlay:  $('<div/>', { class: config.frodoOverlay }),
            frodo: $('<div/>', { id: config.frodo, class: config.frodo }),
            form: $('<form/>', { 
                    class: config.frodoForm, 
                    action: config.submitUrl,
                    method: config.method,
                    name: config.frodoForm
                     }),

            //Header
            header: $('<h3/>', { class: config.frodoHeader.header }),
            headerTxt: $('<span/>', { class: config.frodoHeader.text, html: config.loginTxt }),
            closeBtn: $('<button/>', { 
                    class: config.frodoHeader.closeBtn, 
                    type: 'button',
                    html: 'x'  }),

            //Login form
            loginBox: $('<div/>', { class: config.frodoLogin.box }),
            message: $('<div/>', { 
                    id: config.frodoLogin.message,
                    class: config.frodoLogin.message
             }),
            messageTxt: $('<span/>'),
            fullname: $('<input/>', {
                    type: 'text',
                    name: 'fullname',
                    class: config.frodoLogin.input,
                    placeholder: config.userPlaceholder
            }),
            password: $('<input/>', {
                    type: 'password',
                    name: 'password',
                    class: config.frodoLogin.input ,
                    placeholder: config.passPlaceholder
            }),
            passwordConfirm: $('<input/>', {
                    type: 'password',
                    name: 'passwordConfirm',
                    class: config.frodoLogin.input + ' ' + config.hideClass,
                    placeholder: config.passConfirmPlaceholder,
                    disabled: true
            }),
            email: $('<input/>', {
                    type: 'email',
                    name: 'email',
                    class: config.frodoLogin.input + ' ' + config.hideClass,
                    placeholder: config.emailPlaceholder,
                    disabled: true
            }),
            passwordReset: $('<input/>', {
                    type: 'email',
                    name: 'passwordReset',
                    class: config.frodoLogin.input + ' ' + config.hideClass,
                    placeholder: config.emailResetPlaceholder,
                    disabled: true
            }),
            loginFooter: $('<div/>', { class: config.frodoLogin.footer }),
            frodoLinksWrapper: $('<div/>', { class: config.frodoLogin.linksWrapper }),
            forgotLink: $('<a/>', { 
                    href: config.forgotLink,
                    class: config.frodoLogin.forgot, 
                    html: config.links[0] 
            }), 
            signUpLink: $('<a/>', { 
                    href: config.signUpLink,
                    class: config.frodoLogin.signUp, 
                    html: config.links[1] 
            }),
            submitBtn: $('<button/>', {
                    class: config.frodoLogin.submit ,
                    type: 'submit',
                    html: config.login    
            }),

            //Social 
            logWith: $('<span/>', { class: config.log, html: config.logWith }),
            socialWrapper: $('<div/>', { class: config.social })
        };

        if ($('#' + config.frodoWrapper).length === 0) {
            /**
             * CREATING HTML STRUCTURE
             */

            //Wrap all content with frodo wrapper, and append frodo container and overlay
            $(config.body).wrapInner(el.wrapper).
                  find('#' + config.frodoWrapper).
                  append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            el.header.append(el.headerTxt, el.closeBtn);
            $('.' + config.frodoForm).append(el.header);

            //Append login box
            el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink)
            el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);
            el.message.append(el.messageTxt);
            el.loginBox.append(el.message, el.email, el.fullname, 
                el.password, el.passwordConfirm, el.passwordReset , el.loginFooter);
            $('.' + config.frodoForm).append(el.loginBox);

            //Append log with text
            $('.' + config.frodoForm).append(el.logWith);

            //Append social buttons
            el.socialWrapper.each(function() {
              var btns = '';

                for (var i=0, len = social.length; i < len; i++) {
                    btns += '<div class="frodo-provider">\
                          <a class="azm-social azm-btn azm-' + social[i].provider + '" \
                          href="' + social[i].link + '">\
                          <i class="fa fa-' + social[i].provider + '"></i>' + social[i].text +'</a>\
                        </div>';
                }
              $(this).append(btns);
            });
            $('.' + config.frodoForm).append(el.socialWrapper);
            console.log('Login panel created');
        }

    };

    /**
     * [toggleForm switch forms]
     * @param  {[string]} form [form name]
     * @return {[boolean]} 
     * */
    Frodo.prototype.toggleForm = function(form) {

        function changeTxt(el1, txt1, el2, txt2) {
            el1.text(txt1);
            el2.text(txt2);

            return true;
        }

        //Shorthand for this.config
        var config = this.config,

            loginBox = $('.' + config.frodoLogin.box),
            inputs = loginBox.find('input'),
            headerTxt = $('.' + config.frodoHeader.header).find('.' + config.frodoHeader.text),
            forgot = $('.' + config.frodoLogin.forgot),
            signUp = $('.' + config.frodoLogin.signUp),
            fullname = loginBox.find('input[name=fullname]'),
            password = loginBox.find('input[name=password]'),
            email = loginBox.find('input[name=email]'),
            passwordConfirm = loginBox.find('input[name=passwordConfirm]'),
            passwordReset = loginBox.find('input[name=passwordReset]'),
            that = this;

            //Delete alert message
            this.showAlert(null, {
                messageBox: config.frodoLogin.message,
                text: config.frodoLogin.message + ' > span',
                alert: config.frodoLogin.messageAlert
            });

            //Clear form inputs
            this.clearInputs();

            //Check which form is used
            if (form === 'sign-up') {
                //Go from 'forgot' to 'sign-up'
                if (!passwordReset.hasClass(config.hideClass)) {
                  inputs.not(passwordReset).removeClass(config.hideClass).prop('disabled', false);
                  passwordReset.addClass(config.hideClass).prop('disabled', true);
                  changeTxt(headerTxt, config.registerTxt, signUp, config.loginTxt);
                } 
                //Switch 'sign-up' to 'log-in'
                else {
                  $(email).add(passwordConfirm).toggleClass(config.hideClass).prop('disabled', function (index, oldProp) {
                    return !oldProp;
                  });
                  signUp.text( function (i, text) {
                    return text === that.config.links[1] ? that.config.links[2] : that.config.links[1];
                  });
                  headerTxt.text(function (i, text) {
                    return text === that.config.loginTxt ? that.config.registerTxt : that.config.loginTxt;
                  });
                }
            } 
            //Form reset password
            else if (form === 'reset') {
                inputs.not(passwordReset).addClass(config.hideClass).prop('disabled', true);
                passwordReset.removeClass(config.hideClass).prop('disabled', false);
                changeTxt(headerTxt, config.resetTxt, signUp, config.registerTxt);
            }

            //Close button reset form
            else if (form === 'open') {
                fullname.add(password).removeClass(config.hideClass).prop('disabled', false);
                email.add(passwordConfirm).add(passwordReset).addClass(config.hideClass).prop('disabled', true);
                changeTxt(headerTxt, config.loginTxt, signUp, config.links[1]);
            }

        return true;
    };

    /**
     * [showAlert show message above the form]
     * @param  {[object]} data 
     * @param  {[object]} box  
     * @param  {[object]} text 
     * @return {[boolean]}     
     */
    Frodo.prototype.showAlert = function(data, options) {
        if (data === undefined) {
            data = false;
        }

        // console.log(options.text);
        if (data) {
            if (data.fail) {
                $('#' + options.messageBox).addClass(options.alert);
                $('.' + options.text).empty().text(data.message);
            } else {
                $('#' + options.messageBox).removeClass(options.alert);
                $('.' + options.text).empty();
            }
        } else {
            $('#' + options.messageBox).removeClass(options.alert);
            $('.' + options.text).empty();
        }

        return true;    
    };

     /**
     * [closePanel close login panel]
     * @return {[boolean]} 
     */
    Frodo.prototype.closePanel = function () {
        //Shorthand for this.config
        var config = this.config;

        //Block mouse scroll when panel is open 
        $('#' + config.frodoWrapper).removeClass('frodo-no-scroll');

        // console.log(frodo);

        //Remove uneccessary classes                
        $('#' + config.frodo).removeClass(config.frodoVisible);
        $('.' + config.frodoOverlay).removeClass(config.frodoVisible);
        $('#' + config.frodoMessage).empty();
        this.clearInputs();
        
        return true;        
    };

    /**
     * [clearInputs - clear form input]
     * @return {[boolean]}
     */
    Frodo.prototype.clearInputs = function () {
        //Shorthand for this.config
        var config = this.config;

        $('.' + config.frodoLogin.input).each( function () {
            this.value = '';
        });

        return true;
    };

    //TEMP - shuffle random url
    Frodo.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

/*
-------------------M E T H O D S  END --------------------------------------------------
 */

    $.fn.frodo = function (options) {

        new Frodo(this.filter('[data-login]'), options);

        return this;
    };

})( jQuery );

//Initialization of a plugin
;(function ($) {
    "use strict";
    
     $('[data-login]').frodo();
}(jQuery));


///=include jquery.frodo.js