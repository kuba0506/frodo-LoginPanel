/**
 * Frodo.js v.1.1 - Multiprovider login panel
 * Copyright (c) 2015, Jakub Jurczyñski
 *
 * Just add data-login attribute to any html element
 * $([data-login]).frodo();
 */
;
(function($) {
    "use strict";

    /*
    DEFAULT PLUGIN SETTINGS 
     */
    var defaults = {

        lang: 'en',
        version: 'basic',
        provider: ['eniro', 'facebook', 'google-plus'],


        currentForm: null,
        forms: ['login', 'signup', 'reset'],

        //DELETE!!!
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
        noScroll: 'frodo-no-scroll',
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
        /*loginTxt: 'Log in',
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
        }*/
    };

    /*
    MAIN CONFIG    
     */
    var frodoConfig = {
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
        //Error class
        errorClass: {
            input: 'frodo-err-input',
            msg: 'frodo-err-msg'
        },

        //Settings
        method: 'get',
        submitUrl: '?',
        forgotLink: '#',
        signUpLink: '#'

        //Translation DELETE!!!!!!!
        /*loginTxt: 'Log in',
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
        }*/
    };

    /*
    TRANSLATIONS
     */
    var translation = {
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
            loginTxt: 'Sweden'
        },
        'no': {},
        'dk': {}
    };

    /*
    SOCIAL BUTTONS 
     */
    //TEMP - Array of social buttons
    // var social = [];
    // {% for s in socials %}
    // social.push({
    //  provider: {{ s.provider }},
    //  text: {{ s.text }},
    //  link: {{ s.link }} 
    // });
    // {% endfor %}
    // var social = {
    //         'eniro': {
    //             text: 'Eniro',
    //             link: '#'
    //         }, 
    //         'facebook': {
    //             text: 'Facebook',
    //             link: '#'
    //         }, 
    //         'twitter': {
    //             text: 'Twitter',
    //             link: '#'
    //         },
    //         'google-plus': {
    //             text: 'Google++',
    //             link: '#'
    //         },
    //         'linkedin': {
    //             text: 'LinkedIn',
    //             link: '#'
    //         },
    //         'android': {
    //             text: 'Android',
    //             link: '#'
    //         }, 
    //         'skype': {
    //             text: 'Skype',
    //             link: '#'
    //         }
    //     };

    //DELETE !!!
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
            config,
            body;

        //Config object 
        frodo.config = config = $.extend(true, {}, defaults, options);

        //Element we call a function on
        frodo.element = element;

        //Shorthand for config.body
        frodo.body = body = frodoConfig.body;
        // body = config.body;

        /*
-----------------------------E V E N T  H A N D L E R S BEGIN----------------------------------------------------------
 */

        /*
-----------------------------OPEN LOGIN PANEL--------------------------------------------------------------------
 */
        frodo.element.on('click', function(event) {

            //Prevent default behaviour
            frodo.stopEvent(event);

            //Reset frodo, wrapper and overlay classes
            frodo.resetMainClasses(true);

            //Reset err message
            frodo.showAlert(null, {
                messageBox: frodoConfig.frodoLogin.message,
                text: frodoConfig.frodoLogin.message + ' > span',
                alert: frodoConfig.frodoLogin.messageAlert
            });

            //Rest form to login
            frodo.toggleForm('init');

            //Clear errors
            frodo.clearErrors();

            //Clear inputs
            frodo.clearInputs();

            //Enable submit btn
            frodo.submitDisabled(false);

            //Set focus on first not disabled input
            frodo.focusFirst();

            console.log(config.version);
            console.log(config.lang);
        });

        /*
-----------------------------CLOSE LOGIN PANEL--------------------------------------------------------------------
 */
        //Close login panel
        $(body).on('click', '.' + frodoConfig.frodoHeader.closeBtn, function() {
            frodo.closePanel();
        });

        $(body).on('keyup', function(event) {
            //If 'Escape' key is pressed
            if (event.keyCode === 27 && frodoConfig.currentForm !== null) {
                frodo.closePanel();
            }
        });

        /*
-----------------------------REGISTER FORM HANDLER-----------------------------------------------------------------
 */
        $(body).on('click', '.' + frodoConfig.frodoLogin.signUp, function(event) {
            frodo.stopEvent(event);
            frodo.toggleForm('signup');
            frodo.clearErrors();
            frodo.submitDisabled(false);

            //Set focus on first not disabled input
            frodo.focusFirst();
        });
        /*
-----------------------------RESET FORM HANDLER-----------------------------------------------------------------
 */
        $(body).on('click', '.' + frodoConfig.frodoLogin.forgot, function(event) {
            frodo.stopEvent(event);
            frodo.toggleForm('reset');
            frodo.clearErrors();
            frodo.submitDisabled(false);

            //Set focus on first not disabled input
            frodo.focusFirst();
        });

        /*
-----------------------------FORM VALIDATION HANDLER --------------------------------------------------------
 */
        $(body).on('input', 'input', function(event) {
            frodo.submitDisabled(true);
            frodo.validate(event);
            frodo.stopEvent(event);

            //If user press 'enter'
            if (event.keyCode === 13) {
                $('.' + frodoConfig.frodoForm).trigger('submit');
            }
        });
        $(body).on('submit', '.' + frodoConfig.frodoForm, function(event) {
            frodo.stopEvent(event);
            frodo.validate(event);
            //Ajax submit
        });

        /*
-----------------------------AJAX FORM VALIDATION-----------------------------------------------------------------
 */
        // TEMP - Ajax - jsonp
        $(body).on('click', '.frodo-btn', function() {
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
                    messageBox: frodoConfig.frodoLogin.message,
                    text: frodoConfig.frodoLogin.message + '> span',
                    alert: frodoConfig.frodoLogin.messageAlert
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
            frodoWrapper = $('#' + frodoConfig.frodoWrapper),
            inputs = [],
            keys = [],
            el = {},
            keys = null;

        //CACHED OBJECTS
        el = {
            //Main elemenets
            wrapper: $('<div/>', {
                id: frodoConfig.frodoWrapper
            }),
            overlay: $('<div/>', {
                class: frodoConfig.frodoOverlay
            }),
            frodo: $('<div/>', {
                id: frodoConfig.frodo,
                class: frodoConfig.frodo
            }),
            form: $('<form/>', {
                class: frodoConfig.frodoForm,
                action: frodoConfig.submitUrl,
                method: frodoConfig.method,
                name: frodoConfig.frodoForm,
                novalidate: true
            }),

            //Header
            header: $('<h3/>', {
                class: frodoConfig.frodoHeader.header
            }),
            headerTxt: $('<span/>', {
                class: frodoConfig.frodoHeader.text,
                html: translation[config.lang].loginTxt
            }),
            closeBtn: $('<button/>', {
                class: frodoConfig.frodoHeader.closeBtn,
                type: 'button',
                html: 'x'
            }),

            //Login form
            loginBox: $('<div/>', {
                class: frodoConfig.frodoLogin.box
            }),
            message: $('<div/>', {
                id: frodoConfig.frodoLogin.message,
                class: frodoConfig.frodoLogin.message
            }).append($('<span/>')),
            inputWrapper: $('<div/>', {
                    class: frodoConfig.frodoLogin.inputWrapper
                })
                .append($('<span/>', {
                    class: frodoConfig.frodoLogin.inputError
                })),
            input: {
                fullname: $('<input/>', {
                    type: 'text',
                    name: 'fullname',
                    class: frodoConfig.frodoLogin.input + ' ' + frodoConfig.hideClass,
                    placeholder: translation[config.lang].userPlaceholder,
                    disabled: true
                }),
                email: $('<input/>', {
                    type: 'email',
                    name: 'email',
                    class: frodoConfig.frodoLogin.input,
                    placeholder: translation[config.lang].emailPlaceholder
                }),
                password: $('<input/>', {
                    id: 'firstPassword',
                    class: frodoConfig.frodoLogin.input,
                    type: 'password',
                    name: 'password',
                    'data-if-match': '#secondPassword',
                    placeholder: translation[config.lang].passPlaceholder
                }),
                passwordConfirm: $('<input/>', {
                    id: 'secondPassword',
                    class: frodoConfig.frodoLogin.input + ' ' + frodoConfig.hideClass,
                    type: 'password',
                    name: 'passwordConfirm',
                    placeholder: translation[config.lang].passConfirmPlaceholder,
                    'data-if-match': '#firstPassword',
                    disabled: true
                }),
                passwordReset: $('<input/>', {
                    type: 'email',
                    name: 'passwordReset',
                    class: frodoConfig.frodoLogin.input + ' ' + frodoConfig.hideClass,
                    placeholder: translation[config.lang].emailResetPlaceholder,
                    disabled: true
                })

            },
            loginFooter: $('<div/>', {
                class: frodoConfig.frodoLogin.footer
            }),
            frodoLinksWrapper: $('<div/>', {
                class: frodoConfig.frodoLogin.linksWrapper
            }),
            forgotLink: $('<a/>', {
                href: frodoConfig.forgotLink,
                class: frodoConfig.frodoLogin.forgot,
                html: translation[config.lang].links[0]
            }),
            signUpLink: $('<a/>', {
                href: frodoConfig.signUpLink,
                class: frodoConfig.frodoLogin.signUp,
                html: translation[config.lang].links[1]
            }),
            submitBtn: $('<button/>', {
                class: frodoConfig.frodoLogin.submit,
                type: 'submit',
                html: translation[config.lang].login
            }),

            //Social 
            logWith: $('<span/>', {
                class: frodoConfig.log,
                html: translation[config.lang].logWith
            }),
            socialWrapper: $('<div/>', {
                class: frodoConfig.social
            })
        };

        /**
         * CREATING HTML STRUCTURE
         */

        //Check if there is only one instace of plugin
        if (frodoWrapper.length === 0) {

            //Wrap all content with frodo wrapper, and append frodo container and overlay
            $(frodoConfig.body).wrapInner(el.wrapper).
            find('#' + config.frodoWrapper).
            append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            el.header.append(el.headerTxt, el.closeBtn);
            $('.' + frodoConfig.frodoForm).append(el.header);

            //Additional funcionality for widget advanced version
            if (config.version === 'advanced') {

                //Append login box
                el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink);
                el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);

                //Create array of all inputs
                keys = Object.keys(el.input);

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

            }

            //Append social buttons
            el.socialWrapper.each(function() {
                var btns = '';
                //ZMIENIĆ !!!!
                for (var i = 0, len = social.length; i < len; i++) {
                    btns += '<div class="frodo-provider">\
                          <a class="frodo-btn frodo-btn-' + social[i].provider + '" \
                          href="' + social[i].link + '">\
                          <i class="fa fa-' + social[i].provider + '"></i>' + social[i].text + '</a>\
                        </div>';
                }
                $(this).append(btns);
            });
            $('.' + frodoConfig.frodoForm).append(el.socialWrapper);

            //Set value of current form
            frodoConfig.currentForm = frodoConfig.forms[0];

            console.log('Login panel created');
        } else {
            return false;
        }

    };

    Frodo.prototype.stopEvent = function(e) {
        var e = e || window.event;

        e.preventDefault();
        e.stopPropagation();
    };


    Frodo.prototype.resetMainClasses = function(state) {
        $('.' + frodoConfig.frodoOverlay).toggleClass(frodoConfig.frodoVisible, state);
        $('#' + frodoConfig.frodo).toggleClass(frodoConfig.frodoVisible, state);
        $('#' + frodoConfig.frodoWrapper).addClass(frodoConfig.noScroll, state);

        return true;
    };

    Frodo.prototype.clearErrors = function() {
        var loginBox = $('.' + frodoConfig.frodoLogin.box),
            errMsg = frodoConfig.errorClass.msg,
            errInput = frodoConfig.errorClass.input,
            input = loginBox.find('.' + errInput),
            msg = loginBox.find('.' + errMsg);

        input.removeClass(errInput);
        msg.text('').removeClass(errMsg);

        return true;
    };

    Frodo.prototype.focusFirst = function() {
        return $('.' + frodoConfig.frodoLogin.input).not(':disabled').first().focus();
    };

    //Change submit button disabled state
    Frodo.prototype.submitDisabled = function(bool) {
        var submitBtn = $('.' + frodoConfig.frodoLogin.submit);

        return submitBtn.prop('disabled', bool);
    };

    Frodo.prototype.validate = function(event) {

        /**
         * HELPERS
         */
        //Get input name
        function getInputName() {
            return input.attr('name');
        }
        //Get input type
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

        function inputIsEmpty(input) {
            var val = getInputLength(input);

            return !val;
        }
        /**
         * VALIDATORS
         */
        //Validate email
        function checkEmail(email) {
            var pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            return pattern.test(getInputValue(email));
        }
        //Validate password
        function checkPassword(password) {
            var val = getInputLength(password);

            if (val < 8 || inputIsEmpty(password))
                return false;
            else
                return true;
        }

        function anyInputEmpty() {
            var anyEmpty = $('.' + frodoConfig.frodoLogin.box).find('.' + frodoConfig.frodoLogin.input).not(':disabled').filter(function() {
                    return !$(this).val();
                }),
                errMsg = anyEmpty.find('span');
            //if submit btn
            if (getInputName() === frodoConfig.frodoForm) {
                anyEmpty.each(function() {
                    var input = $(this),
                        errMsg = $('span', input.parent()),
                        type = input.attr('type'),
                        errors = translation[config.lang].errors;

                    if (type === 'text') {
                        input.addClass(frodoConfig.errorClass.input);
                        errMsg.text(errors.fullname).addClass(frodoConfig.errorClass.msg);
                    } else if (type === 'password') {
                        input.addClass(frodoConfig.errorClass.input);
                        errMsg.text(errors.password).addClass(frodoConfig.errorClass.msg);
                    } else if (type === 'email') {
                        input.addClass(frodoConfig.errorClass.input);
                        errMsg.text(errors.email).addClass(frodoConfig.errorClass.msg);
                    }
                });
            }

            return anyEmpty.length;
        }

        function setErrors(bool, name) {
            var errors = translation[config.lang].errors,
                errName = errors[name];

            if (bool) {
                input.addClass(frodoConfig.errorClass.input);
                error.text(errName).addClass(frodoConfig.errorClass.msg);
            } else {
                input.removeClass(frodoConfig.errorClass.input);
                error.text('').removeClass(frodoConfig.errorClass.msg);
            }
        }
        //Check for passwords match (only in case of singup form)
        function passwordsMatch(password) {

            var ifMatch = password.data('if-match'),
                currentVal = getInputValue(password),
                matchVal = $(ifMatch).val(),
                allErrors = $('[data-if-match]', $('.' + frodoConfig.frodoForm)).siblings('span');

            //Compare only if match password is >= 8
            if (matchVal.length >= 8) {
                //Compare values
                if (currentVal !== matchVal) {
                    error.text(translation[config.lang].errors.passwordNotMatch).addClass(frodoConfig.errorClass.msg);
                    frodo.submitDisabled(true);
                } else {
                    allErrors.text('').removeClass(frodoConfig.errorClass.msg);
                    validateInput();
                }
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
            submitBtn = $('.' + frodoConfig.frodoLogin.submit),
            valid = false,
            error = $('span', input.parent());

        //If submit button was clicked
        if (getInputName() === frodoConfig.frodoForm) {
            validateInput();
        }


        //Email
        if (checkInputType('email')) {

            // If email is wrong
            if (!checkEmail(input)) {
                setErrors(true, 'email');
            } else {
                setErrors(false, 'email');
                errors = $('.' + frodoConfig.errorClass.input).length;
                validateInput();
            }
        }

        //All passwords
        if (checkInputType('password')) {

            //If any error occurs
            if (!checkPassword(input)) {
                setErrors(true, 'password');
                //Check for passwords match (only in case of singup form)
                if (frodoConfig.currentForm === frodoConfig.forms[1]) {
                    passwordsMatch(input);
                }
            } else {
                setErrors(false, 'password');
                errors = $('.' + frodoConfig.errorClass.input).length;
                //Check for passwords match (only in case of singup form)
                validateInput();
                if (frodoConfig.currentForm === frodoConfig.forms[1]) {
                    passwordsMatch(input);
                }
            }
        }

        //Fullname
        if (checkInputType('text')) {
            if (inputIsEmpty(input)) {
                setErrors(true, 'fullname');
            } else {
                setErrors(false, 'password');
                errors = $('.' + frodoConfig.errorClass.input).length;
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
                if (arr.indexOf(value) !== -1)
                // if (arr.indexOf(value.attr('name')) !== -1)
                    $('.frodo-input[name="' + value + '"]').removeClass(frodoConfig.hideClass).prop('disabled', false);
                // $(value).removeClass(config.hideClass).prop('disabled', false);
                else
                    $('.frodo-input[name="' + value + '"]').addClass(frodoConfig.hideClass).prop('disabled', true);
                // $(value).addClass(config.hideClass).prop('disabled', true);
            });

            return true;
        }

        function objToArray(obj) {
            var arr = [];

            obj.each(function() {
                return arr.push($(this).attr('name'));
            });

            return arr;
        }

        //Shorthand for this.config
        var config = this.config,
            text = translation[config.lang],
            inputsObj = $('.frodo-input'),
            init = [inputsObj.filter('[name="email"]').attr('name'), inputsObj.filter('[name="password"]').attr('name')],
            signup = [inputsObj.filter('[name="fullname"]').attr('name'), inputsObj.filter('[name="email"]').attr('name'), inputsObj.filter('[name="password"]').attr('name'), inputsObj.filter('[name="passwordConfirm"]').attr('name')],
            reset = [inputsObj.filter('[name="passwordReset"]').attr('name')],
            inputs = objToArray(inputsObj),
            headerTxt = $('.' + frodoConfig.frodoHeader.text),
            signUpTxt = $('.' + frodoConfig.frodoLogin.signUp);


        //Delete alert message
        this.showAlert(null, {
            messageBox: frodoConfig.frodoLogin.message,
            text: frodoConfig.frodoLogin.message + ' > span',
            alert: frodoConfig.frodoLogin.messageAlert
        });

        //Clear form inputs
        this.clearInputs();

        //Check which form is used
        if (form === 'signup') {
            //Check if is either login or reset form, switch to signup
            if (headerTxt.text() === text.loginTxt || headerTxt.text() === text.resetTxt) {
                toggleInputs(inputs, signup);
                changeTxt(headerTxt, text.signUpTxt);
                changeTxt(signUpTxt, text.links[2]);
                frodoConfig.currentForm = frodoConfig.forms[1];

                //Switch to login
            } else {
                toggleInputs(inputs, init);
                changeTxt(headerTxt, text.loginTxt);
                changeTxt(signUpTxt, text.links[1]);
                frodoConfig.currentForm = frodoConfig.forms[0];
            }
        }
        //Form reset password
        else if (form === 'reset') {
            toggleInputs(inputs, reset);
            changeTxt(headerTxt, text.resetTxt);
            changeTxt(signUpTxt, text.links[1]);
            frodoConfig.currentForm = frodoConfig.forms[2];
        }

        //Form login, init state
        else if (form === 'init') {
            toggleInputs(inputs, init);
            changeTxt(headerTxt, text.loginTxt);
            changeTxt(signUpTxt, text.links[1]);
            frodoConfig.currentForm = frodoConfig.forms[0];
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
        var submit = $('.' + frodoConfig.frodoLogin.submit);

        //Block mouse scroll when panel is open 
        $('#' + frodoConfig.frodoWrapper).removeClass(frodoConfig.noScroll);

        //Remove uneccessary classes                
        this.resetMainClasses();
        $('#' + frodoConfig.frodoWrapper).removeClass(frodoConfig.noScroll);
        this.clearInputs();
        this.submitDisabled(false);
        frodoConfig.currentForm = null;

        return true;
    };

    /**
     * [clearInputs - clear form input]
     * @return {[boolean]}
     */
    Frodo.prototype.clearInputs = function() {
        $('.' + frodoConfig.frodoLogin.input).each(function() {
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

    $('[data-login]').frodo({

        version: 'advanced',
        lang: 'en'

    });
}(jQuery));
