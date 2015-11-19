/**
 * Frodo.js v.1.4 - Multiprovider login panel
 * Copyright (c) 2015, Jakub Jurczyñski
 *
 * To initialise plugin just add data-login attribute to any html element
 * $([data-login]).frodo();
 * To fire at page load use:
 * $([data-login]).frodo().trigger('click');
 */
;
(function($) {
    'use strict';

    /*
    DEFAULT PLUGIN SETTINGS
     */
    var defaults = {
        lang: 'en',
        version: 'basic',
        provider: ['linkedin', 'facebook', 'google'],
        device: 'desktop',
        clientId: '',
        redirectUri: '/',
        scope: ''
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
        //Error class
        errorClass: {
            input: 'frodo-err-input',
            msg: 'frodo-err-msg'
        },

        //Form settings
        method: 'get',
        submitUrl: '?',
        forgotLink: '#',
        signUpLink: '#'

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
    };

    /*
    SOCIAL BUTTONS
     */
    var social = {
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
        };

    /*
    -------------------C O N S T R U C T O R BEGIN-------------------------------------------------------
     */
    function Frodo(element, options) {
        //Assign this to variable in order to use it also in callback functions
        var frodo = this,
            //Shorthand for frodo.config
            config,
            lang,
            body;

        //User options
        frodo.defaults_provider = defaults.provider;
        frodo.options_provider = options.provider;
        //Config object
        frodo.config = config = $.extend(true, {}, defaults, options);

        //Element we call a function on
        frodo.element = element;

        //Set language
        var defaultLang = Object.keys(translation[defaults.lang]),
            configLang = (typeof translation[config.lang] !== 'undefined') ? Object.keys(translation[config.lang]) : void 0;

        frodo.lang = ((typeof configLang === 'undefined') || (defaultLang.length !== configLang.length)) ? defaults.lang : config.lang;


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
        });

        /*
-----------------------------CLOSE LOGIN PANEL--------------------------------------------------------------------
 */
        if (config.device === 'desktop') {
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
        }

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
            //If user press 'enter'
            if (event.which === 13 || event.keyCode === 13) {
                $('.' + frodoConfig.frodoForm).trigger('submit');
            }
            frodo.submitDisabled(true);
            frodo.validate(event);
            frodo.stopEvent(event);

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
            lang = this.lang,
            frodo = $('#' + frodoConfig.frodoWrapper),
            inputs = [],
            def_providers = this.defaults_provider,
            opt_providers = this.options_provider,
            el,
            providers = [],
            keys = null;

        //CACHED OBJECTS
        el = {
            //Main elemenets
            wrapper: $('<div/>', {
                id: frodoConfig.frodoWrapper
            }),
            overlay: $('<div/>', {
                class: (config.device === 'desktop') ? frodoConfig.frodoOverlay : ''
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
                html: translation[lang].loginTxt
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
                    placeholder: translation[lang].userPlaceholder,
                    disabled: true
                }),
                email: $('<input/>', {
                    type: 'email',
                    name: 'email',
                    class: frodoConfig.frodoLogin.input,
                    placeholder: translation[lang].emailPlaceholder
                }),
                password: $('<input/>', {
                    id: 'firstPassword',
                    class: frodoConfig.frodoLogin.input,
                    type: 'password',
                    name: 'password',
                    'data-if-match': '#secondPassword',
                    placeholder: translation[lang].passPlaceholder
                }),
                passwordConfirm: $('<input/>', {
                    id: 'secondPassword',
                    class: frodoConfig.frodoLogin.input + ' ' + frodoConfig.hideClass,
                    type: 'password',
                    name: 'passwordConfirm',
                    placeholder: translation[lang].passConfirmPlaceholder,
                    'data-if-match': '#firstPassword',
                    disabled: true
                }),
                passwordReset: $('<input/>', {
                    type: 'email',
                    name: 'passwordReset',
                    class: frodoConfig.frodoLogin.input + ' ' + frodoConfig.hideClass,
                    placeholder: translation[lang].emailResetPlaceholder,
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
                html: translation[lang].links[0]
            }),
            signUpLink: $('<a/>', {
                href: frodoConfig.signUpLink,
                class: frodoConfig.frodoLogin.signUp,
                html: translation[lang].links[1]
            }),
            submitBtn: $('<button/>', {
                class: frodoConfig.frodoLogin.submit,
                type: 'submit',
                html: translation[lang].login
            }),

            //Social
            logWith: $('<span/>', {
                class: frodoConfig.log,
                html: translation[lang].logWith
            }),
            socialWrapper: $('<div/>', {
                class: frodoConfig.social
            })
        };

        /**
         * CREATING HTML STRUCTURE
         */

        //Check if there is only one instace of plugin
        if (frodo.length === 0) {

            //Wrap all content with frodo wrapper, and append frodo container and overlay
            $(frodoConfig.body).wrapInner(el.wrapper).
            find('#' + frodoConfig.frodoWrapper).
            append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            if (config.device === 'desktop') {
                el.header.append(el.headerTxt, el.closeBtn);
            } else {
                el.header.append(el.headerTxt);
            }

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
                $('.' + frodoConfig.frodoForm).append(el.loginBox);

                //Append log with text
                $('.' + frodoConfig.frodoForm).append(el.logWith);

            }

            //Append social buttons
            el.socialWrapper.each(function() {
                var btns = '',
                    version = config.version,
                    //Set provider either from config or from option
                    // provider = options.provider || config.provider,
                    provider = config.provider,
                    providerClass = (config.device === 'desktop') ?
                        frodoConfig.frodoLogin.frodoProvider :
                        frodoConfig.frodoLogin.frodoProvider + ' ' + frodoConfig.frodoLogin.frodoProviderMobile,
                    defaults_provider = def_providers,
                    options_provider = opt_providers,
                    result_provider = defaults_provider.slice();

                //Aggregate providers from config and options
                if (options_provider) {

                    options_provider.forEach(function(opt_name) {
                        result_provider.forEach(function(conf_name) {
                            if (opt_name !== conf_name && result_provider.indexOf(opt_name) === -1) {
                                result_provider.push(opt_name);
                            }

                        });
                    });
                }

                //If 'advanced' version is selected than skip eniro button
                if (version === 'advanced') {
                    result_provider.forEach(function(name, index) {
                        if (name === 'eniro') {
                            result_provider.splice(index, 1);
                        }
                    });
                }
                //Create buttons
                result_provider.forEach(function(name) {

                    var link = social[name].link;

                    link = link.replace('{client_id}', config.clientId);
                    link = link.replace('{scope}', config.scope);
                    link = link.replace('{redirect_uri}', config.redirectUri);
                    if (name in social) {
                        btns += '<div class="' + providerClass + '" ">' +
                                    '<a class="frodo-btn frodo-btn-' + name + '"' +
                                     'href="' + link + '">' +
                                    '<i class="fa fa-' + name + '"></i>' + social[name].text + '</a>' +
                                    '</div>';
                    }
                });

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
        e = e || window.event;

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
        return $('.' + frodoConfig.frodoLogin.input).first().focus();
    };

    //Change submit button disabled state
    Frodo.prototype.submitDisabled = function(bool) {
        var submitBtn = $('.' + frodoConfig.frodoLogin.submit);

        return submitBtn.prop('disabled', bool);
    };

    Frodo.prototype.validate = function(event) {
        var frodo = this,
            config = this.config,
            lang = this.lang,
            input = $(event.target),
            errors = null,
            anyEmpty = null,
            submitBtn = $('.' + frodoConfig.frodoLogin.submit),
            valid = false,
            error = $('span', input.parent());

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

            if (val < 8 || inputIsEmpty(password)) {
                return false;
            } else {
                return true;
            }

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
                        errors = translation[lang].errors;

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
            var errors = translation[lang].errors,
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
                    error.text(translation[lang].errors.passwordNotMatch).addClass(frodoConfig.errorClass.msg);
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
                if (arr.indexOf(value) !== -1) {
                    $('.frodo-input[name="' + value + '"]').removeClass(frodoConfig.hideClass).prop('disabled', false);
                } else {
                    $('.frodo-input[name="' + value + '"]').addClass(frodoConfig.hideClass).prop('disabled', true);
                }
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
            text = translation[this.lang],
            inputsObj = $('.frodo-input'),
            init = [inputsObj.filter('[name="email"]').attr('name'), inputsObj.filter('[name="password"]').attr('name')],
            signup = [inputsObj.filter('[name="fullname"]').attr('name'),
                      inputsObj.filter('[name="email"]').attr('name'),
                      inputsObj.filter('[name="password"]').attr('name'),
                      inputsObj.filter('[name="passwordConfirm"]').attr('name')],
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
            } else {
                //Switch to login
                toggleInputs(inputs, init);
                changeTxt(headerTxt, text.loginTxt);
                changeTxt(signUpTxt, text.links[1]);
                frodoConfig.currentForm = frodoConfig.forms[0];
            }
        } else if (form === 'reset') {
            //Form reset password
            toggleInputs(inputs, reset);
            changeTxt(headerTxt, text.resetTxt);
            changeTxt(signUpTxt, text.links[1]);
            frodoConfig.currentForm = frodoConfig.forms[2];
        } else if (form === 'init') {
            //Form login, init state
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


