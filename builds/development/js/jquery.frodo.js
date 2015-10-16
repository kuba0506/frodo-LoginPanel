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
        //Error class
        errorClass: {
            input: 'frodo-err-input',
            msg: 'frodo-err-msg'
        },

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
        logWith: 'or',
        //Errors
        errors: {
            email: 'Invalid email address format',
            password: 'Password should be at least 8 characters',
            passwordNotMatch: 'Passwords don\'t match',
            fullname: 'Invalid username'
        }
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
            name: defaults.frodoForm,
            novalidate: true
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
        inputWrapper: $('<div/>', {
                class: 'frodo-input-wrapper'
            })
            .append($('<span/>', {
                class: 'frodo-err-msg'
            })),
        // inputError: $('<span/>', { class:  'frodo-err-msg' }),
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
                id: 'firstPassword',
                class: defaults.frodoLogin.input,
                type: 'password',
                name: 'password',
                'data-if-match': '#secondPassword',
                placeholder: defaults.passPlaceholder
            }),
            passwordConfirm: $('<input/>', {
                id: 'secondPassword',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                type: 'password',
                name: 'passwordConfirm',
                placeholder: defaults.passConfirmPlaceholder,
                'data-if-match': '#firstPassword',
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
            frodo.clearErrors();
            frodo.clearInputs();

            //Enable submit btn
            frodo.submitDisabled(false);
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
        $(config.body).on('click', '.' + config.frodoLogin.signUp, function(event) {
            event.preventDefault();
            frodo.toggleForm('signup');
            frodo.clearErrors();
            frodo.submitDisabled(false);
        });
        /*
-----------------------------RESET FORM HANDLER-----------------------------------------------------------------
 */
        $(config.body).on('click', '.' + config.frodoLogin.forgot, function(event) {
            event.preventDefault();
            frodo.toggleForm('reset');
            frodo.clearErrors();
            frodo.submitDisabled(false);
        });

        /*
-----------------------------FORM VALIDATION HANDLER --------------------------------------------------------
 */
        $(config.body).on('keyup', 'input', function(event) {
            frodo.submitDisabled(true);
            frodo.validate(event);
        });
        $(config.body).on('submit', '.' + config.frodoForm, function(event) {
            event.preventDefault();
            frodo.validate(event);
            // frodo.submitDisabled(true);
            // frodo.validate(event);
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
            inputs = [],
            keys = [];

        /**
         * CREATING HTML STRUCTURE
         */

        //Check if there is only one instace of plugin
        if ($('#' + config.frodoWrapper).length === 0) {

            //Wrap all content with frodo wrapper, and append frodo container and overlay
            $(config.body).wrapInner(el.wrapper).
            find('#' + config.frodoWrapper).
            append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            el.header.append(el.headerTxt, el.closeBtn);
            $('.' + config.frodoForm).append(el.header);

            //Append login box
            el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink);
            el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);

            //Create array of all inputs
            var keys = Object.keys(el.input);

            for (var i = 0, len = keys.length; i < len; i++) {
                inputs.push(el.input[keys[i]]);
            }

            //Wrap each input with wrapper
            inputs = inputs.map(function(input) {
                return el.inputWrapper.clone().prepend(input);
            });
            //Finally append everything into box
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

    Frodo.prototype.clearErrors = function() {
        var loginBox = $('.' + defaults.frodoLogin.box),
            errMsg = defaults.errorClass.msg,
            errInput = defaults.errorClass.input,
            input = loginBox.find('.' + errInput),
            msg = loginBox.find('.' + errMsg);

        input.removeClass(errInput);
        msg.text('').removeClass(errMsg);

        return true;
    };

    //Change submit button disabled state
    Frodo.prototype.submitDisabled = function(bool) {
        var submitBtn = $('.' + defaults.frodoLogin.submit);

        return submitBtn.prop('disabled', bool);
    };

    Frodo.prototype.validate = function(event) {

        //Get input name
        function getInputName() {
            return input.attr('name');
        }

        function getInputType() {
            return input.attr('type');
        }

        //Chek input type
        function checkInputType(name) {
            return getInputType() === name;
        }

        //Get input value
        function getInputValue(input) {
            return input.val();
        }
        //Get input length
        function getInputLength(input) {
            return getInputValue(input).length;
        }

        //Validate email
        function checkEmail(email) {
            var pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            return pattern.test(getInputValue(email));
        }

        function inputIsEmpty(input) {
            var val = getInputLength(input);

            return !val;
        }

        function anyInputEmpty() {
            var anyEmpty = $('.' + config.frodoLogin.box).find('.' + config.frodoLogin.input).not(':disabled').filter(function() {
                return !$(this).val();
            }).length;


            return anyEmpty;
        }

        function checkPassword(password) {
            var val = getInputLength(password);

            if (val < 8 || inputIsEmpty(password))
                return false;
            else
                return true;
        }

        function setErrors(bool, name) {
            var errors = config.errors,
                errName = errors[name];
            // var ifMatch = input.data('if-match'),
            //     firstPass = getInputValue($('#' + 'firstPassword' )),
            //     secondPass = getInputValue($('#' + 'secondPassword' ));

            //     console.log('firstPass', firstPass);
            //     console.log('secondPass', secondPass);
            if (bool) {
                input.addClass(config.errorClass.input);
                error.text(errName).addClass(config.errorClass.msg);
            } else {
                input.removeClass(config.errorClass.input);
                error.text('').removeClass(config.errorClass.msg);
            }
        }
        //Check if there is no empty inputs or error messages 
        function validateInput() {

            if (errors < 1 && anyInputEmpty() === 0) {

                return frodo.submitDisabled(false);
            } else {
                return frodo.submitDisabled(true);
            }
        }

        var frodo = this,
            config = this.config,
            input = $(event.target),
            errors = null,
            anyEmpty = null,
            submitBtn = $('.' + config.frodoLogin.submit),
            valid = false,
            error = $('span', input.parent());

        //Disable submit btn 
        // submitBtn.prop('disabled', true);
        // this.submitDisabled();

        //If submit button was clicked
        if (getInputName() === config.frodoForm) {
            console.log('submit');
            validateInput();
        }


        //Email
        if (checkInputType('email')) {

            // If email is wrong
            if (!checkEmail(input)) {
                setErrors(true, 'email');
            } else {
                setErrors(false, 'email');
                errors = $('.' + config.errorClass.input).length;
                validateInput();
            }
        }

        //All passwords
        if (checkInputType('password')) {

            //If any error occurs
            if (!checkPassword(input)) {
                setErrors(true, 'password');
            } else {
                setErrors(false, 'password');
                errors = $('.' + config.errorClass.input).length;
                validateInput();
            }
        }

        //Fullname
        if (checkInputType('text')) {
            if (inputIsEmpty(input)) {
                setErrors(true, 'fullname');
            } else {
                setErrors(false, 'password');
                errors = $('.' + config.errorClass.input).length;
                validateInput();
            }
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
            var inputs = [],
                keys = Object.keys(obj);

            for (var i = 0, len = keys.length; i < len; i++) {
                inputs.push(obj[keys[i]]);
            }

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
            signUpTxt = $('.' + config.frodoLogin.signUp);

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
            //Check if is either login or reset form
            if (headerTxt.text() === config.loginTxt || headerTxt.text() === config.resetTxt) {
                toggleInputs(inputs, signup);
                changeTxt(headerTxt, config.registerTxt);
                changeTxt(signUpTxt, config.links[2]);
            } else {
                toggleInputs(inputs, init);
                changeTxt(headerTxt, config.loginTxt);
                changeTxt(signUpTxt, config.links[1]);
            }
        }
        //Form reset password
        else if (form === 'reset') {
            toggleInputs(inputs, reset);
            changeTxt(headerTxt, config.resetTxt);
            changeTxt(signUpTxt, config.links[1]);
        }

        //Form login, init state
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

        //Remove uneccessary classes                
        $('#' + config.frodo).removeClass(config.frodoVisible);
        $('.' + config.frodoOverlay).removeClass(config.frodoVisible);
        $('#' + config.frodoMessage).empty();
        this.clearInputs();
        this.submitDisabled(false);

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
