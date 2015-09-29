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

    /**
     * [toggleForm switch forms]
     * @param  {[string]} form [form name]
     * @return {[boolean]} 
     * */
    function toggleForm(form) {

        function changeTxt(el1, txt1, el2, txt2) {
            el1.text(txt1);
            el2.text(txt2);

            return true;
    }

    var loginBox = $('.frodo-login-box'),
        inputs = loginBox.find('input'),
        headerTxt = $('.frodo-header').find('.frodo-header-txt'),
        forgot = $('.frodo-forgot'),
        signUp = $('.frodo-sign-up'),
        fullname = loginBox.find('input[name=fullname]'),
        password = loginBox.find('input[name=password]'),
        email = loginBox.find('input[name=email]'),
        passwordConfirm = loginBox.find('input[name=passwordConfirm]'),
        passwordReset = loginBox.find('input[name=passwordReset]');


        //Check what form is used
        if (form === 'sign-up') {

            //Go from 'forgot' to 'sign-up'
            if (!passwordReset.hasClass(defaults.hideClass)) {
              inputs.not(passwordReset).removeClass(defaults.hideClass).prop('disabled', false);
              passwordReset.addClass(defaults.hideClass).prop('disabled', true);
              changeTxt(headerTxt, defaults.registerTxt, signUp, defaults.loginTxt);
            } 
            //Switch 'sign-up' to 'log-in'
            else {
              $(email).add(passwordConfirm).toggleClass(defaults.hideClass).prop('disabled', function (index, oldProp) {
                return !oldProp;
              });
              signUp.text( function (i, text) {
                return text === defaults.links[1] ? defaults.links[2] : defaults.links[1];
              });
              headerTxt.text(function (i, text) {
                return text === defaults.loginTxt ? defaults.registerTxt : defaults.loginTxt;
              });
            }
        } 
        //Form reset password
        else if (form === 'reset') {
            inputs.not(passwordReset).addClass(defaults.hideClass).prop('disabled', true);
            passwordReset.removeClass(defaults.hideClass).prop('disabled', false);
            changeTxt(headerTxt, defaults.resetTxt, signUp, defaults.registerTxt);
        }

        //Close button reset form
        else if (form === 'close') {
            fullname.add(password).removeClass(defaults.hideClass).prop('disabled', false);
            email.add(passwordConfirm).add(passwordReset).addClass(defaults.hideClass).prop('disabled', true);
            changeTxt(headerTxt, defaults.loginTxt, signUp, defaults.registerTxt);
        }

        return true;
    }

        /**
     * [closePanel close plogin panel]
     * @return {[boolean]} 
     */
    function closePanel() {
         //Block mouse scroll when panel is open 
        $('#' + defaults.frodoWrapper).removeClass('frodo-no-scroll');

        //Remove uneccessary classes                
        $('#' + defaults.frodo).removeClass(defaults.frodoVisible);
        $('.' + defaults.frodoOverlay).removeClass(defaults.frodoVisible);
        $('#' + defaults.frodoMessage).empty();

        //Nice to have
        // $('body').toggleClass(defaults.bodyReset);
        
        return true;        
    }

    //Default values 
    var defaults = {

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
        loginTxt: 'Log in now',
        registerTxt: 'Sign up now',
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
        }, {
          provider: 'android',
          text: 'Android',
          link: '#'
        }, {
          provider: 'skype',
          text: 'Skype',
          link: '#'
        }  
    ];

    //TEMP - suffle random url
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * PLUGIN LOGIC
     */
    
    //CACHED OBJECTS
    var el = {

        //Main elemenets
        wrapper: $('<div/>', { id: defaults.frodoWrapper }),
        overlay:  $('<div/>', { class: defaults.frodoOverlay }),
        frodo: $('<div/>', { id: defaults.frodo, class: defaults.frodo }),
        form: $('<form/>', { 
                class: defaults.frodoForm, 
                action: defaults.submitUrl,
                method: defaults.method,
                name: defaults.frodoForm
                 }),

        //Header
        header: $('<h3/>', { class: defaults.frodoHeader.header }),
        headerTxt: $('<span/>', { class: defaults.frodoHeader.text, html: defaults.loginTxt }),
        closeBtn: $('<button/>', { 
                class: defaults.frodoHeader.closeBtn, 
                type: 'button',
                html: 'x'  }),

        //Login form
        loginBox: $('<div/>', { class: defaults.frodoLogin.box }),
        message: $('<span/>', { id: defaults.frodoLogin.message }),
        fullname: $('<input/>', {
                type: 'text',
                name: 'fullname',
                class: defaults.frodoLogin.input,
                placeholder: defaults.userPlaceholder
        }),
        password: $('<input/>', {
                type: 'password',
                name: 'password',
                class: defaults.frodoLogin.input ,
                placeholder: defaults.passPlaceholder
        }),
        passwordConfirm: $('<input/>', {
                type: 'password',
                name: 'passwordConfirm',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                placeholder: defaults.passConfirmPlaceholder,
                disabled: true
        }),
        email: $('<input/>', {
                type: 'email',
                name: 'email',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                placeholder: defaults.emailPlaceholder,
                disabled: true
        }),
        passwordReset: $('<input/>', {
                type: 'email',
                name: 'passwordReset',
                class: defaults.frodoLogin.input + ' ' + defaults.hideClass,
                placeholder: defaults.emailResetPlaceholder,
                disabled: true
        }),
        loginFooter: $('<div/>', { class: defaults.frodoLogin.footer }),
        frodoLinksWrapper: $('<div/>', { class: defaults.frodoLogin.linksWrapper }),
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
                class: defaults.frodoLogin.submit ,
                type: 'submit',
                html: defaults.login    
        }),

        //Social 
        logWith: $('<span/>', { class: defaults.log, html: defaults.logWith }),
        socialWrapper: $('<div/>', { class: defaults.social })
    };

            
    /**
     * CREATING HTML STRUCTURE
     */

    //Wrap all content with frodo wrapper, and append frodo container and overlay
    $(defaults.body).wrapInner(el.wrapper).
          find('#' + defaults.frodoWrapper).
          append(el.frodo.append(el.form), el.overlay);

    //Insert form header
    el.header.append(el.headerTxt, el.closeBtn);
    $('.' + defaults.frodoForm).append(el.header);

    //Append login box
    el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink)
    el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);
    el.loginBox.append(el.message, el.email, el.fullname, 
        el.password, el.passwordConfirm, el.passwordReset , el.loginFooter);
    $('.' + defaults.frodoForm).append(el.loginBox);

    //Append log with text
    $('.' + defaults.frodoForm).append(el.logWith);

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

    $('.' + defaults.frodoForm).append(el.socialWrapper);

    /**
     * EVENT HANDLERS
     */
    
    //Open login panel
    $('[data-login]').on('click', function(e) {

        e.preventDefault();
        toggleForm('close');

        //Open / reset login panel
        $('.' + defaults.frodoOverlay).toggleClass(defaults.frodoVisible);
        $('#' + defaults.frodo).toggleClass(defaults.frodoVisible);
        $('#' + defaults.frodoWrapper).toggleClass('frodo-no-scroll');

        //Nice to have
        // $('body').toggleClass(defaults.bodyReset);
    });

    //Close login panel
    $('.' + defaults.frodoHeader.closeBtn).on('click', closePanel);

    $(defaults.body).on('keyup', function (event) {
        //If 'Escape' key is pressed
        if (event.keyCode === 27) {
            closePanel();
        }
    });
    
    //Register form        
    $(defaults.body).on('click', '.frodo-sign-up', function (event) {
      event.preventDefault();
      toggleForm('sign-up');
    });

    //Reset form
    $(defaults.body).on('click', '.frodo-forgot', function (event) {
      event.preventDefault();
      toggleForm('reset');
    });


    // TEMP - Ajax - jsonp
    $('.azm-social').on('click', function () { 
        // var url = 'http://www.eniro.se.test.eniro.net/webmaster-content/wmc-js/jsonp.js',
        var url = 'http://jurczynski.czest.pl/registerFailed.json?callback=myCallback',
            url2 = 'http://jurczynski.czest.pl/registerSuccess.json?callback=myCallback',
            address = [url, url2], index;

        index = getRandomInt(0, address.length-1);

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
                var message = $('#frodo-login-message');
                if (response.fail) {
                    message.empty();
                    message.text(response.message);
                } else {
                    message.empty();
                }
            }
        });
    });

})( jQuery );

///=include jquery.frodo.js