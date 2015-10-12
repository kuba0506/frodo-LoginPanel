/**
 * Frodo.js v.1.0 - Multiprovider login panel
 * Copyright (c) 2015, Jakub Jurczyñski
 *
 * Just add data-login attribute to any html element
 * $([data-login]).frodo();
 */
;
(function($) {
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
        links: ['Forgot your password ?', 'Sign up now', 'Log in now'],
        login: 'Submit',
        logWith: 'or with:'
    };

    //CACHED OBJECTS
    var el = {

        //Main elemenets
        wrapper: $('<div/>', {
            id: defaults.frodoWrapper
        }),
        overlay: $('<div/>', {
            class: defaults.frodoOverlay
        }),
        frodo: $('<div/>', {
            id: defaults.frodo,
            class: defaults.frodo
        }),
        form: $('<form/>', {
            class: defaults.frodoForm,
            action: defaults.submitUrl,
            method: defaults.method,
            name: defaults.frodoForm
        }),

        //Header
        header: $('<h3/>', {
            class: defaults.frodoHeader.header
        }),
        headerTxt: $('<span/>', {
            class: defaults.frodoHeader.text,
            html: defaults.loginTxt
        }),
        closeBtn: $('<button/>', {
            class: defaults.frodoHeader.closeBtn,
            type: 'button',
            html: 'x'
        }),

        //Login form
        loginBox: $('<div/>', {
            class: defaults.frodoLogin.box
        }),
        message: $('<div/>', {
            id: defaults.frodoLogin.message,
            class: defaults.frodoLogin.message
        }).append($('<span/>')),
        input: {
            fullname: $('<input/>', {
                type: 'text',
                name: 'fullname',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                placeholder: defaults.userPlaceholder,
                disabled: true
            }),
            email: $('<input/>', {
                type: 'email',
                name: 'email',
                class: defaults.frodoLogin.input,
                placeholder: defaults.emailPlaceholder
            }),
            password: $('<input/>', {
                type: 'password',
                name: 'password',
                class: defaults.frodoLogin.input,
                placeholder: defaults.passPlaceholder
            }),
            passwordConfirm: $('<input/>', {
                type: 'password',
                name: 'passwordConfirm',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                placeholder: defaults.passConfirmPlaceholder,
                disabled: true
            }),
            passwordReset: $('<input/>', {
                type: 'email',
                name: 'passwordReset',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                placeholder: defaults.emailResetPlaceholder,
                disabled: true
            })

        },
        loginFooter: $('<div/>', {
            class: defaults.frodoLogin.footer
        }),
        frodoLinksWrapper: $('<div/>', {
            class: defaults.frodoLogin.linksWrapper
        }),
        forgotLink: $('<a/>', {
            href: defaults.forgotLink,
            class: defaults.frodoLogin.forgot,
            html: defaults.links[0]
        }),
        signUpLink: $('<a/>', {
            href: defaults.signUpLink,
            class: defaults.frodoLogin.signUp,
            html: defaults.links[1]
        }),
        submitBtn: $('<button/>', {
            class: defaults.frodoLogin.submit,
            type: 'submit',
            html: defaults.login
        }),

        //Social 
        logWith: $('<span/>', {
            class: defaults.log,
            html: defaults.logWith
        }),
        socialWrapper: $('<div/>', {
            class: defaults.social
        })
    };

    //TEMP - Array of social buttons
    var social = [{
        provider: 'facebook',
        text: 'Facebook',
        link: '#'
    }, {
        provider: 'twitter',
        text: 'Twitter',
        link: '#'
    }, {
        provider: 'google-plus',
        text: 'Google++',
        link: '#'
    }, {
        provider: 'linkedin',
        text: 'LinkedIn',
        link: '#'
    }, {
        provider: 'android',
        text: 'Android',
        link: '#'
    }, {
        provider: 'skype',
        text: 'Skype',
        link: '#'
    }];

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
            frodo.toggleForm('init');
            frodo.clearInputs();
        });

        /*
-----------------------------CLOSE LOGIN PANEL--------------------------------------------------------------------
 */
        //Close login panel
        $(config.body).on('click', '.' + config.frodoHeader.closeBtn, function() {
            frodo.closePanel();
        });

        $(config.body).on('keyup', function(event) {
            //If 'Escape' key is pressed
            if (event.keyCode === 27) {
                frodo.closePanel();
            }
        });

        /*
-----------------------------REGISTER FORM HANDLER-----------------------------------------------------------------
 */
        //Register form handler       
        $(config.body).on('click', '.' + config.frodoLogin.signUp, function(event) {
            event.preventDefault();
            frodo.toggleForm('signup');
        });
        /*
-----------------------------RESET FORM HANDLER-----------------------------------------------------------------
 */
        //Reset form handler
        $(config.body).on('click', '.' + config.frodoLogin.forgot, function(event) {
            event.preventDefault();
            frodo.toggleForm('reset');
        });

        /*
-----------------------------FORM VALIDATION HANDLER --------------------------------------------------------
 */
        $(config.body).on('keyup', 'input', function(event) {
            var submit = $('.' + config.frodoLogin.submit);
            submit.prop('disabled', true);
            frodo.validate(event);
        });

        /*
-----------------------------AJAX FORM VALIDATION-----------------------------------------------------------------
 */
        // TEMP - Ajax - jsonp
        $(config.body).on('click', '.frodo-btn', function() {
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
            }).then(function(response) {
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

    Frodo.prototype.init = function() {
        //Shorthand for this.config
        var config = this.config,
            inputs = [];

        /**
         * CREATING HTML STRUCTURE
         */

        //Check if there is only one instace of plugin
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

            for (var input in el.input) {
                inputs.push(el.input[input]);
            }

            el.loginBox.append(el.message, inputs, el.loginFooter);
            $('.' + config.frodoForm).append(el.loginBox);

            //Append log with text
            $('.' + config.frodoForm).append(el.logWith);

            //Append social buttons
            el.socialWrapper.each(function() {
                var btns = '';

                for (var i = 0, len = social.length; i < len; i++) {
                    btns += '<div class="frodo-provider">\
                          <a class="frodo-btn frodo-btn-' + social[i].provider + '" \
                          href="' + social[i].link + '">\
                          <i class="fa fa-' + social[i].provider + '"></i>' + social[i].text + '</a>\
                        </div>';
                }
                $(this).append(btns);
            });
            $('.' + config.frodoForm).append(el.socialWrapper);
            console.log('Login panel created');
        }

    };

    Frodo.prototype.validate = function(event) {
        function checkInputName(name) {
            return $(event.target).attr('name') === name;
        }

        var config = this.config,
            input = $(event.target),
            error = $('span', input.parent()),

            //Test values
            fullnamePattern = /([A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{1}[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]{1,30}[- ]{0,1}|[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{1}[- \']{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{0,1}[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]{1,30}[- ]{0,1}|[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]{1,2}[ -\']{1}[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{1}[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž]{1,30}){2,5}/;

        if (checkInputName('fullname')) {
            var is_ok = fullnamePattern.test(input.val());

            console.log(is_ok);

            if (!is_ok) {
                input.addClass('frodo-err');
                error.removeClass(config.hideClass).text(config.fullnameError).addClass('frodo-err-msg');
            } else {
                input.removeClass('frodo-err');
                error.addClass(config.hideClass).text('').removeClass('frodo-err-msg');
            }
        }
        if (checkInputName('email')) {
            console.log('email');
            var is_ok = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!is_ok) {
                input.addClass('frodo-err');
                error.removeClass(config.hideClass).text(config.emailErr).addClass('frodo-err-msg');
            } else {
                input.removeClass('frodo-err');
                error.addClass(config.hideClass).text('').removeClass('frodo-err-msg');
            }
        }
        if (checkInputName('password')) {
            console.log('password');
            input.addClass('frodo-err');
            error.removeClass(config.hideClass).text(config.passwordShortErr).addClass('frodo-err-msg');
        }
        if (checkInputName('passwordConfirm')) {
            console.log('passwordConfirm');
            input.addClass('frodo-err');
            error.removeClass(config.hideClass).text(config.passwordMatchErr).addClass('frodo-err-msg');
        }
        if (checkInputName('passwordReset')) {
            console.log('passwordReset');
            input.addClass('frodo-err');
            error.removeClass(config.hideClass).text(config.passwordShortErr).addClass('frodo-err-msg');
        }

    };

    /**
     * [toggleForm switch forms]
     * @param  {[string]} form [form name]
     * @return {[boolean]} 
     * */
    Frodo.prototype.toggleForm = function(form) {

        function changeTxt(selector, text) {

            $(selector).text(text);

            return true;
        }

        function aggregateInputs(obj) {
            var inputs = [];

            for (var input in obj)
                inputs.push(obj[input])

            return inputs;
        }

        function toggleInputs(inputs, arr) {

            inputs.map(function(value) {
                if (arr.indexOf(value.attr('name')) !== -1)
                    $(value).removeClass(config.hideClass).prop('disabled', false);
                else
                    $(value).addClass(config.hideClass).prop('disabled', true);
            });

            return true;
        }

        //Shorthand for this.config
        var config = this.config,
            input = el.input,
            init = [input.email.attr('name'), input.password.attr('name')],
            signup = [input.fullname.attr('name'), input.email.attr('name'), input.password.attr('name'), input.passwordConfirm.attr('name')],
            reset = [input.passwordReset.attr('name')],
            inputs = aggregateInputs(el.input),
            headerTxt = $('.' + config.frodoHeader.text),
            signUpTxt = $('.' + config.frodoLogin.signUp),
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
        if (form === 'signup') {
            //Check if form switched
            if (headerTxt.text() === config.loginTxt) {
                toggleInputs(inputs, signup);
                changeTxt(headerTxt, config.registerTxt);
                changeTxt(signUpTxt, config.links[2]);
                // formChanged = true;
            } else {
                toggleInputs(inputs, init);
                changeTxt(headerTxt, config.loginTxt);
                changeTxt(signUpTxt, config.links[1]);
                // formChanged = false;
            }
        }
        //Form reset password
        else if (form === 'reset') {
            //Show
            toggleInputs(inputs, reset);
            changeTxt(headerTxt, config.resetTxt);
            changeTxt(signUpTxt, config.links[1]);
        }

        //Close button reset form
        else if (form === 'init') {
            toggleInputs(inputs, init);
            changeTxt(headerTxt, config.loginTxt);
            changeTxt(signUpTxt, config.links[1]);
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
    Frodo.prototype.closePanel = function() {
        //Shorthand for this.config
        var config = this.config,
            submit = $('.' + config.frodoLogin.submit);

        //Block mouse scroll when panel is open 
        $('#' + config.frodoWrapper).removeClass('frodo-no-scroll');

        //Enable submit btn
        submit.prop('disabled', false);

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
    Frodo.prototype.clearInputs = function() {
        //Shorthand for this.config
        var config = this.config;

        $('.' + config.frodoLogin.input).each(function() {
            this.value = '';
        });

        return true;
    };

    //TEMP - shuffle random url
    Frodo.prototype.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /*
    -------------------M E T H O D S  END --------------------------------------------------
     */

    $.fn.frodo = function(options) {

        new Frodo(this.filter('[data-login]'), options);

        return this;
    };



})(jQuery);

//Initialization of a plugin
;
(function($) {
    "use strict";

    $('[data-login]').frodo();
}(jQuery));
