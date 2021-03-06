/**
 * Frodo.js v.1.6 - Multiprovider login panel
 * Copyright (c) 2016, Jakub Jurczyñski
 *
 * To initialise plugin just add data-login attribute to any html element
 * $(element).frodo(); or in html put data-login='{"lang": "ar"}'
 * To fire at a page load use:
 * $(element).frodo().trigger('click');
 */
;(function($) {
    "use strict";

    /*
    PRIVATE SETTINGS
     */
    var Private = {
        stopEvent: function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        resetMainClasses: function(state) {
            $('.' + Private.frodoConfig.frodoOverlay).toggleClass(Private.frodoConfig.frodoVisible, state);
            $('#' + Private.frodoConfig.frodo).toggleClass(Private.frodoConfig.frodoVisible, state);
            $('#' + Private.frodoConfig.frodoWrapper).addClass(Private.frodoConfig.noScroll, state);

            return true;
        },
        clearErrors: function() {
            var loginBox = $('.' + Private.frodoConfig.frodoLogin.box),
                errMsg = Private.frodoConfig.errorClass.msg,
                errInput = Private.frodoConfig.errorClass.input,
                input = loginBox.find('.' + errInput),
                msg = loginBox.find('.' + errMsg);

            input.removeClass(errInput);
            msg.text('').removeClass(errMsg);

            return true;
        },
        focusFirst: function() {
            return $('.' + Private.frodoConfig.frodoLogin.input).first().focus();
        },
        //Change submit button disabled state
        submitDisabled: function(bool) {
            var submitBtn = $('.' + Private.frodoConfig.frodoLogin.submit);

            return submitBtn.prop('disabled', bool);
        },
        /**
         * [showAlert show message above the form]
         * @param  {[object]} data
         * @param  {[object]} box
         * @param  {[object]} text
         * @return {[boolean]}
         */
        showAlert: function(data, options) {
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
        },
        /**
         * [closePanel close login panel]
         * @return {[boolean]}
         */
        closePanel: function() {
            Private.resetMainClasses(false);
            Private.clearInputs();
            Private.submitDisabled(false);
            Private.frodoConfig.currentForm = null;

            return true;
        },

        /**
         * [clearInputs - clear form input]
         * @return {[boolean]}
         */
        clearInputs: function() {
            $('.' + Private.frodoConfig.frodoLogin.input).each(function() {
                this.value = '';
            });

            return true;
        },
        //TEMP - shuffle random url
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        /*
         DEFAULT PLUGIN SETTINGS
         */
        defaults: {
            lang: 'en',
            version: 'basic',
            provider: ['eniro', 'facebook', 'google', 'android'],
            device: 'desktop',
            clientId: '',
            redirectUri: '/',
            scope: ''
        },

        /*
         MAIN CONFIG
         */
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
        },

        /*
        TRANSLATIONS
         */
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
        /*
        SOCIAL BUTTONS
        */
        socialBtn: {
            'eniro': {
                text: 'Eniro',
                link: 'https://accounts.eniro.com.test.eniro.net/frodo/oauth/eniro/authorize?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}'
            },
            'facebook': {
                text: 'Facebook',
                link: 'https://accounts.eniro.com.test.eniro.net/frodo/oauth/facebook/authorize?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}'
            },
            'google': {
                text: 'Google',
                link: 'https://accounts.eniro.com.test.eniro.net/frodo/oauth/google/authorize?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}'
            }
        }

        //END PRIVATE
    };

    /*
    -------------------C O N S T R U C T O R BEGIN-------------------------------------------------------
     */
    function Frodo(element, options) {
        //Element we call a function on
        var self = this;
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this.metaData = this.$element.data('login');

        this.elementListener(this.$element);

    }
    /*
    -------------------C O N S T R U C T O R  END----------------------------------------------------
     */


    /*
    -------------------M E T H O D S  BEGIN --------------------------------------------------
     */

    Frodo.prototype = {
        defaults: {
            lang: 'en',
            version: 'basic',
            provider: ['eniro', 'facebook', 'google'],
            device: 'desktop',
            clientId: '',
            redirectUri: '/',
            scope: ''
        },
        //INIT METHOD
        init: function() {

            var self = this,
                body = Private.frodoConfig.body,
                config = this.config;

            //Config object
            if (this.metaData) {
                this.options = this.metaData;
                this.config = config = $.extend(true, {}, this.defaults, this.options);
            } else {
                this.config = config = $.extend(true, {}, this.defaults, this.options);
            }
            //Set plugin language
            self.config.lang = self.lang = (self.config.lang in Private.translation) ?
                self.config.lang : self.defaults.lang;

            return this;
        },
        elementListener: function (element) {
            var self = this;
            //Add event handler for plugin element
            element.on('click', function() {
                self.init();
                self.build();
                self.attachEvents();

                //Reset frodo, wrapper and overlay classes
                Private.resetMainClasses(true);

                self.toggleForm('init');

                //Clear errors
                // Private.clearErrors();

                //Clear inputs
                // Private.clearInputs();

                //Enable submit btn
                // Private.submitDisabled(false);

                //Set focus on first not disabled input
                Private.focusFirst();
            });
        },

        //Build html structure
        build: function() {
            var self = this,
                config = this.config,
                lang = this.config.lang,
                frodo = $('#' + Private.frodoConfig.frodoWrapper),
                inputs = [],
                default_providers = this.defaults.provider,
                option_providers = this.options.provider,
                el = {},
                providers = [],
                keys = null;

            //CACHED OBJECTS
            el = {
                //Main elemenets
                wrapper: $('<div/>', {
                    id: Private.frodoConfig.frodoWrapper
                }),
                overlay: $('<div/>', {
                    class: (config.device === 'desktop') ? Private.frodoConfig.frodoOverlay : ''
                }),
                frodo: $('<div/>', {
                    id: Private.frodoConfig.frodo,
                    class: Private.frodoConfig.frodo
                }),
                form: $('<form/>', {
                    class: Private.frodoConfig.frodoForm,
                    action: Private.frodoConfig.submitUrl,
                    method: Private.frodoConfig.method,
                    name: Private.frodoConfig.frodoForm,
                    novalidate: true
                }),

                //Header
                header: $('<h3/>', {
                    class: Private.frodoConfig.frodoHeader.header
                }),
                headerTxt: $('<span/>', {
                    class: Private.frodoConfig.frodoHeader.text,
                    html: Private.translation[lang].loginTxt
                }),
                closeBtn: $('<button/>', {
                    class: Private.frodoConfig.frodoHeader.closeBtn,
                    type: 'button',
                    html: 'x'
                }),

                //Login form
                loginBox: $('<div/>', {
                    class: Private.frodoConfig.frodoLogin.box
                }),
                message: $('<div/>', {
                    id: Private.frodoConfig.frodoLogin.message,
                    class: Private.frodoConfig.frodoLogin.message
                }).append($('<span/>')),
                inputWrapper: $('<div/>', {
                        class: Private.frodoConfig.frodoLogin.inputWrapper
                    })
                    .append($('<span/>', {
                        class: Private.frodoConfig.frodoLogin.inputError
                    })),
                input: {
                    fullname: $('<input/>', {
                        type: 'text',
                        name: 'fullname',
                        class: Private.frodoConfig.frodoLogin.input + ' ' + Private.frodoConfig.hideClass,
                        placeholder: Private.translation[lang].userPlaceholder,
                        disabled: true
                    }),
                    email: $('<input/>', {
                        type: 'email',
                        name: 'email',
                        class: Private.frodoConfig.frodoLogin.input,
                        placeholder: Private.translation[lang].emailPlaceholder
                    }),
                    password: $('<input/>', {
                        id: 'firstPassword',
                        class: Private.frodoConfig.frodoLogin.input,
                        type: 'password',
                        name: 'password',
                        'data-if-match': '#secondPassword',
                        placeholder: Private.translation[lang].passPlaceholder
                    }),
                    passwordConfirm: $('<input/>', {
                        id: 'secondPassword',
                        class: Private.frodoConfig.frodoLogin.input + ' ' + Private.frodoConfig.hideClass,
                        type: 'password',
                        name: 'passwordConfirm',
                        placeholder: Private.translation[lang].passConfirmPlaceholder,
                        'data-if-match': '#firstPassword',
                        disabled: true
                    }),
                    passwordReset: $('<input/>', {
                        type: 'email',
                        name: 'passwordReset',
                        class: Private.frodoConfig.frodoLogin.input + ' ' + Private.frodoConfig.hideClass,
                        placeholder: Private.translation[lang].emailResetPlaceholder,
                        disabled: true
                    })

                },
                loginFooter: $('<div/>', {
                    class: Private.frodoConfig.frodoLogin.footer
                }),
                frodoLinksWrapper: $('<div/>', {
                    class: Private.frodoConfig.frodoLogin.linksWrapper
                }),
                forgotLink: $('<a/>', {
                    href: Private.frodoConfig.forgotLink,
                    class: Private.frodoConfig.frodoLogin.forgot,
                    html: Private.translation[lang].links[0]
                }),
                signUpLink: $('<a/>', {
                    href: Private.frodoConfig.signUpLink,
                    class: Private.frodoConfig.frodoLogin.signUp,
                    html: Private.translation[lang].links[1]
                }),
                submitBtn: $('<button/>', {
                    class: Private.frodoConfig.frodoLogin.submit,
                    type: 'submit',
                    html: Private.translation[lang].login
                }),

                //Social
                logWith: $('<span/>', {
                    class: Private.frodoConfig.log,
                    html: Private.translation[lang].logWith
                }),
                socialWrapper: $('<div/>', {
                    class: Private.frodoConfig.social
                })
            };
            /**
             * CREATING HTML STRUCTURE
             */

            //Wrap all content with frodo wrapper, and append frodo container and overlay
            $(Private.frodoConfig.body).wrapInner(el.wrapper).
            find('#' + Private.frodoConfig.frodoWrapper).
            append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            if (config.device === 'desktop') {
                el.header.append(el.headerTxt, el.closeBtn);
            } else {
                el.header.append(el.headerTxt);
            }

            //Add header txt to form
            $('.' + Private.frodoConfig.frodoForm).append(el.header);

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
                $('.' + Private.frodoConfig.frodoForm).append(el.loginBox);

                //Append log with text
                $('.' + Private.frodoConfig.frodoForm).append(el.logWith);

            }

            //Append social buttons
            el.socialWrapper.each(function() {
                var btns = '',
                    version = config.version,
                    //Set provider either from config or from option
                    provider = config.provider,
                    providerClass = (config.device === 'desktop') ? Private.frodoConfig.frodoLogin.frodoProvider : Private.frodoConfig.frodoLogin.frodoProvider + ' ' + Private.frodoConfig.frodoLogin.frodoProviderMobile,
                    result_provider = default_providers.concat(option_providers);

                    result_provider = result_provider.filter(function (el, i) {
                        //returns only unique elements
                        if (typeof el !== 'undefined') {
                            return result_provider.indexOf(el) === i;
                        }
                    });

                //If 'advanced' version is selected than skip eniro button
                if (version === 'advanced') {
                    result_provider.forEach(function(name, index) {
                        if (name === 'eniro')
                            result_provider.splice(index, 1);
                    });
                }

                //Create buttons
                result_provider.forEach(function(name) {
                    if (name in Private.socialBtn) {
                        var link = Private.socialBtn[name].link;


                        link = link.replace('{client_id}', config.clientId);
                        link = link.replace('{scope}', config.scope);
                        link = link.replace('{redirect_uri}', config.redirectUri);

                        btns += '<div class="' + providerClass + '">' +
                                        '<a class="frodo-btn frodo-btn-' + name + '"' +
                                         'href="' + link + '">' +
                                        '<i class="fa faa-' + name + '"></i>' + Private.socialBtn[name].text +
                                        '</a></div>';
                    }
                });

                $(this).append(btns);
            });
            $('.' + Private.frodoConfig.frodoForm).append(el.socialWrapper);

            //Set value of current form
            Private.frodoConfig.currentForm = Private.frodoConfig.forms[0];
            console.log('Login panel created');
        },
        destroy: function() {
            var frodoWrapper = $('#' + Private.frodoConfig.frodoWrapper),
                frodoBody = $('#' + Private.frodoConfig.frodo),
                frodoOverlay = $('.' + Private.frodoConfig.frodoOverlay),
                wrapperContent;

            this.detachEvents();
            frodoBody.remove();
            frodoOverlay.remove();
            wrapperContent = frodoWrapper.contents();
            frodoWrapper.replaceWith(wrapperContent);
            console.log('Plugin destroyed');
        },
        attachEvents: function() {

            var body = Private.frodoConfig.body,
                config = this.config,
                self = this;
            /*
            -----------------------------E V E N T  H A N D L E R S BEGIN----------------------------------------------------------
             */

            /*
            -----------------------------CLOSE LOGIN PANEL--------------------------------------------------------------------
             */

            if (config.device === 'desktop') {
                //Close login panel
                $(body).on('click', '.' + Private.frodoConfig.frodoHeader.closeBtn, function() {
                    Private.closePanel();
                    self.destroy();
                });

                $(body).on('keyup', function(event) {
                    //If 'Escape' key is pressed
                    if (event.keyCode === 27 && Private.frodoConfig.currentForm !== null) {
                        Private.closePanel();
                        self.destroy();
                    }
                });
            }

            /*
            -------------------------SIGN UP FORM HANDLER------------------------------------------------------------
             */
            $(body).on('click', '.' + Private.frodoConfig.frodoLogin.signUp, function(event) {
                Private.stopEvent(event);
                self.toggleForm('signup');
                Private.clearErrors();
                Private.submitDisabled(false);

                //Set focus on first not disabled input
                Private.focusFirst();
            });
            /*
            ------------------RESET FORM HANDLER-----------------------------------------------------------------
             */
            $(body).on('click', '.' + Private.frodoConfig.frodoLogin.forgot, function(event) {
                Private.stopEvent(event);
                self.toggleForm('reset');
                Private.clearErrors();
                Private.submitDisabled(false);

                //Set focus on first not disabled input
                Private.focusFirst();
            });

            /*
            -------------------FORM VALIDATION HANDLER --------------------------------------------------------
             */
            $(body).on('input', '.' + Private.frodoConfig.frodoLogin.input, function(event) {
                //If user press 'enter'
                if (event.which == 13 || event.keyCode == 13) {
                    $('.' + Private.frodoConfig.frodoForm).trigger('submit');
                }
                Private.submitDisabled(true);
                self.validate(event);
                Private.stopEvent(event);

            });
            $(body).on('submit', '.' + Private.frodoConfig.frodoForm, function(event) {
                Private.stopEvent(event);
                self.validate(event);
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

                index = Private.getRandomInt(0, address.length - 1);

                $.ajax({
                    type: 'GET',
                    url: address[index],
                    dataType: 'jsonp',
                    jsonpCallback: 'myCallback'
                }).then(function(response) {
                    Private.showAlert(response, {
                        messageBox: Private.frodoConfig.frodoLogin.message,
                        text: Private.frodoConfig.frodoLogin.message + '> span',
                        alert: Private.frodoConfig.frodoLogin.messageAlert
                    });
                });
            });

            /*
        --------------------E V E N T  H A N D L E R S  E N D-----------------------------------------------------
         */
        },
        detachEvents: function() {
            var body = Private.frodoConfig.body,
                frodo = $('#' + Private.frodoConfig.frodo);

            $(frodo).off();
        },
        /**
         * [toggleForm switch forms]
         * @param  {[string]} form [form name]
         * @return {[boolean]}
         * */
        toggleForm: function(form) {

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
                        $('.frodo-input[name="' + value + '"]').removeClass(Private.frodoConfig.hideClass).prop('disabled', false);
                    else
                        $('.frodo-input[name="' + value + '"]').addClass(Private.frodoConfig.hideClass).prop('disabled', true);
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
                text = Private.translation[this.lang],
                inputsObj = $('.' + Private.frodoConfig.frodoLogin.input),
                init = [inputsObj.filter('[name="email"]').attr('name'), inputsObj.filter('[name="password"]').attr('name')],
                signup = [inputsObj.filter('[name="fullname"]').attr('name'), inputsObj.filter('[name="email"]').attr('name'), inputsObj.filter('[name="password"]').attr('name'), inputsObj.filter('[name="passwordConfirm"]').attr('name')],
                reset = [inputsObj.filter('[name="passwordReset"]').attr('name')],
                inputs = objToArray(inputsObj),
                headerTxt = $('.' + Private.frodoConfig.frodoHeader.text),
                signUpTxt = $('.' + Private.frodoConfig.frodoLogin.signUp);


            //Delete alert message
            Private.showAlert(null, {
                messageBox: Private.frodoConfig.frodoLogin.message,
                text: Private.frodoConfig.frodoLogin.message + ' > span',
                alert: Private.frodoConfig.frodoLogin.messageAlert
            });

            //Clear form inputs
            Private.clearInputs();

            //Check which form is used
            if (form === 'signup') {
                //Check if is either login or reset form, switch to signup
                if (headerTxt.text() === text.loginTxt || headerTxt.text() === text.resetTxt) {
                    toggleInputs(inputs, signup); //toggle inputs
                    changeTxt(headerTxt, text.signUpTxt); //change header txt
                    changeTxt(signUpTxt, text.links[2]); //change link txt
                    Private.frodoConfig.currentForm = Private.frodoConfig.forms[1]; //switch current form to signup
                    console.log('tutaj jestem');
                    //Switch to login
                } else {
                    toggleInputs(inputs, init);
                    changeTxt(headerTxt, text.loginTxt);
                    changeTxt(signUpTxt, text.links[1]);
                    Private.frodoConfig.currentForm = Private.frodoConfig.forms[0];
                    console.log('jestem w else');
                }
            }
            //Form reset password
            else if (form === 'reset') {
                toggleInputs(inputs, reset);
                changeTxt(headerTxt, text.resetTxt);
                changeTxt(signUpTxt, text.links[1]);
                Private.frodoConfig.currentForm = Private.frodoConfig.forms[2];
            }

            //Form login, init state
            else if (form === 'init') {
                toggleInputs(inputs, init);
                changeTxt(headerTxt, text.loginTxt);
                changeTxt(signUpTxt, text.links[1]);
                Private.frodoConfig.currentForm = Private.frodoConfig.forms[0];
            }

            return true;
        },
        validate: function(event) {
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
                var anyEmpty = $('.' + Private.frodoConfig.frodoLogin.box).find('.' + Private.frodoConfig.frodoLogin.input).not(':disabled').filter(function() {
                        return !$(this).val();
                    }),
                    errMsg = anyEmpty.find('span');
                //if submit btn
                if (getInputName() === Private.frodoConfig.frodoForm) {
                    anyEmpty.each(function() {
                        var input = $(this),
                            errMsg = $('span', input.parent()),
                            type = input.attr('type'),
                            errors = Private.translation[lang].errors;

                        if (type === 'text') {
                            input.addClass(Private.frodoConfig.errorClass.input);
                            errMsg.text(errors.fullname).addClass(Private.frodoConfig.errorClass.msg);
                        } else if (type === 'password') {
                            input.addClass(Private.frodoConfig.errorClass.input);
                            errMsg.text(errors.password).addClass(Private.frodoConfig.errorClass.msg);
                        } else if (type === 'email') {
                            input.addClass(Private.frodoConfig.errorClass.input);
                            errMsg.text(errors.email).addClass(Private.frodoConfig.errorClass.msg);
                        }
                    });
                }

                return anyEmpty.length;
            }

            function setErrors(bool, name) {
                var errors = Private.translation[lang].errors,
                    errName = errors[name];

                if (bool) {
                    input.addClass(Private.frodoConfig.errorClass.input);
                    error.text(errName).addClass(Private.frodoConfig.errorClass.msg);
                } else {
                    input.removeClass(Private.frodoConfig.errorClass.input);
                    error.text('').removeClass(Private.frodoConfig.errorClass.msg);
                }
            }
            //Check for passwords match (only in case of singup form)
            function passwordsMatch(password) {

                var ifMatch = password.data('if-match'),
                    currentVal = getInputValue(password),
                    matchVal = $(ifMatch).val(),
                    allErrors = $('[data-if-match]', $('.' + Private.frodoConfig.frodoForm)).siblings('span');

                //Compare only if match password is >= 8
                if (matchVal.length >= 8) {
                    //Compare values
                    if (currentVal !== matchVal) {
                        error.text(Private.translation[lang].errors.passwordNotMatch).addClass(Private.frodoConfig.errorClass.msg);
                        Private.submitDisabled(true);
                    } else {
                        allErrors.text('').removeClass(Private.frodoConfig.errorClass.msg);
                        validateInput();
                    }
                }
            }
            //Check if there is no empty inputs or error messages
            function validateInput() {

                if (errors < 1 && anyInputEmpty() === 0) {
                    return Private.submitDisabled(false);
                } else {
                    return Private.submitDisabled(true);
                }
            }

            var frodo = this,
                config = this.config,
                lang = this.lang,
                input = $(event.target),
                errors = null,
                anyEmpty = null,
                submitBtn = $('.' + Private.frodoConfig.frodoLogin.submit),
                valid = false,
                error = $('span', input.parent());

            //If submit button was clicked
            if (getInputName() === Private.frodoConfig.frodoForm) {
                validateInput();
            }


            //Email
            if (checkInputType('email')) {

                // If email is wrong
                if (!checkEmail(input)) {
                    setErrors(true, 'email');
                } else {
                    setErrors(false, 'email');
                    errors = $('.' + Private.frodoConfig.errorClass.input).length;
                    validateInput();
                }
            }

            //All passwords
            if (checkInputType('password')) {

                //If any error occurs
                if (!checkPassword(input)) {
                    setErrors(true, 'password');
                    //Check for passwords match (only in case of singup form)
                    if (Private.frodoConfig.currentForm === Private.frodoConfig.forms[1]) {
                        passwordsMatch(input);
                    }
                } else {
                    setErrors(false, 'password');
                    errors = $('.' + Private.frodoConfig.errorClass.input).length;
                    //Check for passwords match (only in case of singup form)
                    validateInput();
                    if (Private.frodoConfig.currentForm === Private.frodoConfig.forms[1]) {
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
                    errors = $('.' + Private.frodoConfig.errorClass.input).length;
                    validateInput();
                }
            }
        }
        //END Frodo.prototype
    };

    /*
    -------------------M E T H O D S  END --------------------------------------------------
     */

    Frodo.defaults = Frodo.prototype.defaults;

    $.fn.frodo = function(options) {

        return this.each(function() {
            new Frodo(this, options);
            // new Frodo(this, options).init();
        });
    };

})(jQuery);
