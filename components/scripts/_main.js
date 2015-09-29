// ;(function ($) {
//   "use strict";

//   //Default plugin settings
//   var defaults = {
//     lang: 'en',
//     bgColor: null
//   };

//   //Constructor
//   function Frodo(element, options) {
//     var _this = this;

//     //Config
//     _this.config = $.extend(true, {}, defaults, options);

//   }

//   $.fn.frodo = function () {};
// })(jQuery);
// 

;(function( $ ) {
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
        links: [ 'Forgot your password ?', 'Sign up now' , 'Log in now'],
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
 function Frodo (element, options) {
    //Assign this to variable in order to use it also in callback functions
    var frodo = this;

    //CONFIG 
    frodo.config = $.extend(true, {}, defaults, options);

    //ELEMENT WE CALL FUNCTION ON
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
        $('.' + frodo.config.frodoOverlay).toggleClass(frodo.config.frodoVisible);
        $('#' + frodo.config.frodo).toggleClass(frodo.config.frodoVisible);
        $('#' + frodo.config.frodoWrapper).toggleClass('frodo-no-scroll');
        frodo.showAlert(null, {
            messageBox: frodo.config.frodoLogin.message,
            text: frodo.config.frodoLogin.message + ' > span',
            alert: frodo.config.frodoLogin.messageAlert
        });
        frodo.toggleForm('open');
        frodo.clearInputs();
    });

 /*
-----------------------------CLOSE LOGIN PANEL--------------------------------------------------------------------
 */
    //Close login panel
    // $('.' + frodo.config.frodoHeader.closeBtn).on('click', frodo.closePanel);
    $(frodo.config.body).on('click', '.' + frodo.config.frodoHeader.closeBtn ,function () {
    // $('.' + frodo.config.frodoHeader.closeBtn).on('click', function () {
    // $('.' + frodo.config.frodoHeader.header).on('click', function () {
        frodo.closePanel();
    });

    $(frodo.config.body).on('keyup', function (event) {
        //If 'Escape' key is pressed
        if (event.keyCode === 27) {
            frodo.closePanel();
        }
    });

 /*
-----------------------------REGISTER FORM HANDLER-----------------------------------------------------------------
 */
    //Register form handler       
    $(frodo.config.body).on('click', '.' +  frodo.config.frodoLogin.signUp, function (event) {
      event.preventDefault();
      frodo.toggleForm('sign-up');
    });
 /*
-----------------------------RESET FORM HANDLER-----------------------------------------------------------------
 */
    //Reset form handler
    $(frodo.config.body).on('click', '.' +  frodo.config.frodoLogin.forgot, function (event) {
    // $(frodo.config.body).on('click', '.frodo-forgot', function (event) {
      event.preventDefault();
      frodo.toggleForm('reset');
    });
 /*
-----------------------------AJAX FORM VALIDATION-----------------------------------------------------------------
 */
    // TEMP - Ajax - jsonp
    $('.azm-social').on('click', function () { 
        // var url = 'http://www.eniro.se.test.eniro.net/webmaster-content/wmc-js/jsonp.js',
        var url = 'http://jurczynski.czest.pl/registerFailed.json?callback=myCallback',
            url2 = 'http://jurczynski.czest.pl/registerSuccess.json?callback=myCallback',
            address = [url, url2], index;

        index = frodo.getRandomInt(0, address.length-1);

        console.log(address[index]);

        $.ajax({
            type: 'GET',
            url: address[index],
            dataType: 'jsonp',
            jsonpCallback: 'myCallback',
            success: function (response) {
                // var span = $('<span/>', {'id':'message'});
                // if (response.fail) {
                //     if (span) {
                //         span.empty();
                //     }
                //         span.text(response.message).fadeIn();
                //     }
                // else {
                //     span.fadeOut().remove();
                // }
                var messageTxt = $('#' + frodo.config.frodoLogin.message + ' > span'),
                    messageBox = $('#' + frodo.config.frodoLogin.message);

                frodo.showAlert(response, {
                    messageBox: frodo.config.frodoLogin.message,
                    text: frodo.config.frodoLogin.message + '> span',
                    alert: frodo.config.frodoLogin.messageAlert
                });
                // if (response.fail) {
                //     messageBox.addClass(defaults.frodoLogin.messageAlert);
                //     messageTxt.empty().text(response.message);
                // } else {
                //     messageBox.removeClass(defaults.frodoLogin.messageAlert);
                //     messageTxt.empty();
                // }
            }
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
  
    //CACHED OBJECTS
    var el = {

        //Main elemenets
        wrapper: $('<div/>', { id: this.config.frodoWrapper }),
        overlay:  $('<div/>', { class: this.config.frodoOverlay }),
        frodo: $('<div/>', { id: this.config.frodo, class: this.config.frodo }),
        form: $('<form/>', { 
                class: this.config.frodoForm, 
                action: this.config.submitUrl,
                method: this.config.method,
                name: this.config.frodoForm
                 }),

        //Header
        header: $('<h3/>', { class: this.config.frodoHeader.header }),
        headerTxt: $('<span/>', { class: this.config.frodoHeader.text, html: this.config.loginTxt }),
        closeBtn: $('<button/>', { 
                class: this.config.frodoHeader.closeBtn, 
                type: 'button',
                html: 'x'  }),

        //Login form
        loginBox: $('<div/>', { class: this.config.frodoLogin.box }),
        message: $('<div/>', { 
                id: this.config.frodoLogin.message,
                class: this.config.frodoLogin.message
         }),
        messageTxt: $('<span/>'),
        fullname: $('<input/>', {
                type: 'text',
                name: 'fullname',
                class: this.config.frodoLogin.input,
                placeholder: this.config.userPlaceholder
        }),
        password: $('<input/>', {
                type: 'password',
                name: 'password',
                class: this.config.frodoLogin.input ,
                placeholder: this.config.passPlaceholder
        }),
        passwordConfirm: $('<input/>', {
                type: 'password',
                name: 'passwordConfirm',
                class: this.config.frodoLogin.input + ' ' + this.config.hideClass,
                placeholder: this.config.passConfirmPlaceholder,
                disabled: true
        }),
        email: $('<input/>', {
                type: 'email',
                name: 'email',
                class: this.config.frodoLogin.input + ' ' + this.config.hideClass,
                placeholder: this.config.emailPlaceholder,
                disabled: true
        }),
        passwordReset: $('<input/>', {
                type: 'email',
                name: 'passwordReset',
                class: this.config.frodoLogin.input + ' ' + this.config.hideClass,
                placeholder: this.config.emailResetPlaceholder,
                disabled: true
        }),
        loginFooter: $('<div/>', { class: this.config.frodoLogin.footer }),
        frodoLinksWrapper: $('<div/>', { class: this.config.frodoLogin.linksWrapper }),
        forgotLink: $('<a/>', { 
                href: this.config.forgotLink,
                class: this.config.frodoLogin.forgot, 
                html: this.config.links[0] 
        }), 
        signUpLink: $('<a/>', { 
                href: this.config.signUpLink,
                class: this.config.frodoLogin.signUp, 
                html: this.config.links[1] 
        }),
        submitBtn: $('<button/>', {
                class: this.config.frodoLogin.submit ,
                type: 'submit',
                html: this.config.login    
        }),

        //Social 
        logWith: $('<span/>', { class: this.config.log, html: this.config.logWith }),
        socialWrapper: $('<div/>', { class: this.config.social })
    };

    if ($('#' + this.config.frodoWrapper).length === 0) {
        /**
         * CREATING HTML STRUCTURE
         */

        //Wrap all content with frodo wrapper, and append frodo container and overlay
        $(this.config.body).wrapInner(el.wrapper).
              find('#' + this.config.frodoWrapper).
              append(el.frodo.append(el.form), el.overlay);

        //Insert form header
        el.header.append(el.headerTxt, el.closeBtn);
        $('.' + this.config.frodoForm).append(el.header);

        //Append login box
        el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink)
        el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);
        el.message.append(el.messageTxt);
        el.loginBox.append(el.message, el.email, el.fullname, 
            el.password, el.passwordConfirm, el.passwordReset , el.loginFooter);
        $('.' + this.config.frodoForm).append(el.loginBox);

        //Append log with text
        $('.' + this.config.frodoForm).append(el.logWith);

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
        $('.' + this.config.frodoForm).append(el.socialWrapper);
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

        var loginBox = $('.' + this.config.frodoLogin.box),
            inputs = loginBox.find('input'),
            headerTxt = $('.' + this.config.frodoHeader.header).find('.' + this.config.frodoHeader.text),
            forgot = $('.' + this.config.frodoLogin.forgot),
            signUp = $('.' + this.config.frodoLogin.signUp),
            fullname = loginBox.find('input[name=fullname]'),
            password = loginBox.find('input[name=password]'),
            email = loginBox.find('input[name=email]'),
            passwordConfirm = loginBox.find('input[name=passwordConfirm]'),
            passwordReset = loginBox.find('input[name=passwordReset]'),
            that = this;

            //Delete alert message
            this.showAlert(null, {
                messageBox: this.config.frodoLogin.message,
                text: this.config.frodoLogin.message + ' > span',
                alert: this.config.frodoLogin.messageAlert
            });

            //Clear form inputs
            this.clearInputs();

            //Check which form is used
            if (form === 'sign-up') {
                //Go from 'forgot' to 'sign-up'
                if (!passwordReset.hasClass(this.config.hideClass)) {
                  inputs.not(passwordReset).removeClass(this.config.hideClass).prop('disabled', false);
                  passwordReset.addClass(this.config.hideClass).prop('disabled', true);
                  changeTxt(headerTxt, this.config.registerTxt, signUp, this.config.loginTxt);
                } 
                //Switch 'sign-up' to 'log-in'
                else {
                  $(email).add(passwordConfirm).toggleClass(this.config.hideClass).prop('disabled', function (index, oldProp) {
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
                inputs.not(passwordReset).addClass(this.config.hideClass).prop('disabled', true);
                passwordReset.removeClass(this.config.hideClass).prop('disabled', false);
                changeTxt(headerTxt, this.config.resetTxt, signUp, this.config.registerTxt);
            }

            //Close button reset form
            else if (form === 'open') {
                fullname.add(password).removeClass(this.config.hideClass).prop('disabled', false);
                email.add(passwordConfirm).add(passwordReset).addClass(this.config.hideClass).prop('disabled', true);
                changeTxt(headerTxt, this.config.loginTxt, signUp, this.config.links[1]);
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
         //Block mouse scroll when panel is open 
        $('#' + this.config.frodoWrapper).removeClass('frodo-no-scroll');

        // console.log(frodo);

        //Remove uneccessary classes                
        $('#' + this.config.frodo).removeClass(this.config.frodoVisible);
        $('.' + this.config.frodoOverlay).removeClass(this.config.frodoVisible);
        $('#' + this.config.frodoMessage).empty();
        this.clearInputs();

        // showAlert.call(defaults, {
        //     messageBox: defaults.frodoLogin.message,
        //     text: defaults.frodoLogin.message + ' > span',
        //     alert: defaults.frodoLogin.messageAlert
        // } );

        //Nice to have
        // $('body').toggleClass(defaults.bodyReset);
        
        return true;        
    };

    /**
     * [clearInputs - clear form input]
     * @return {[boolean]}
     */
    Frodo.prototype.clearInputs = function () {
        $('.' + this.config.frodoLogin.input).each( function () {
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

        new Frodo(this, options);

        return this;
    };

})( jQuery );

///=include jquery.frodo.js