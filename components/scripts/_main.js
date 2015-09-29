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


  // $(document).ready(function(){

;(function( $ ) {
  "use strict";

            var defaults = {
                //Classes and ids
                frodoWrapper: '#frodo-wrapper',
                frodo: 'frodo',
                frodoOverlay: 'frodo-overlay',
                frodoForm: 'frodo-form',
                frodoClose: 'frodo-btn-close',
                forodMessage: 'frodo-login-message',
                frodoVisible: 'frodo-visible',
                hideClass: 'frodo-hide',

                //Settings, links
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
                
                // 'frodoOverlay': 'frodo-overlay',
            };

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

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }



            function toggleForm(form) {

              var loginBox = $('.frodo-login-box'),
                  inputs = loginBox.find('input'),
                  forgot = $('.frodo-forgot'),
                  signUp = $('.frodo-sign-up'),
                  headerTxt = $('.frodo-header').find('.frodo-header-txt'),
                  fullname = loginBox.find('input[name=fullname]'),
                  password = loginBox.find('input[name=password]'),
                  email = loginBox.find('input[name=email]'),
                  passwordConfirm = loginBox.find('input[name=passwordConfirm]'),
                  passwordReset = loginBox.find('input[name=passwordReset]');

                  if (form === 'sign-up') {
                    if (!passwordReset.hasClass(defaults.hideClass)) {
                      inputs.not(passwordReset).removeClass(defaults.hideClass).prop('disabled', false);
                      passwordReset.addClass(defaults.hideClass).prop('disabled', true);
                      headerTxt.text(defaults.registerTxt);
                      signUp.text(defaults.loginTxt);
                    } else {
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

                  } else if (form === 'reset') {
                    inputs.not(passwordReset).addClass(defaults.hideClass).prop('disabled', true);
                    passwordReset.removeClass(defaults.hideClass).prop('disabled', false);
                    headerTxt.text(defaults.resetTxt);
                    signUp.text(defaults.registerTxt);
                  } else {
                    fullname.add(password).removeClass(defaults.hideClass).prop('disabled', false);
                    email.add(passwordConfirm).add(passwordReset).addClass(defaults.hideClass).prop('disabled', true);
                    forgot.add(signUp).removeClass(defaults.hideClass);
                    headerTxt.text(defaults.loginTxt);
                    signUp.text(defaults.registerTxt);
                  }
            }


            //CACHED OBJECTS
            var el = {
              //Main elemenets
              wrapper: $('<div/>', { id: 'frodo-wrapper' }),
              overlay:  $('<div/>', { class: 'frodo-overlay'}),
              frodo: $('<div/>', { id: 'frodo', class: 'frodo' }),
              form: $('<form/>', { 
                        class: 'frodo-form', 
                        action: defaults.submitUrl,
                        method: 'get',
                        name: 'frodo-form'
                         }),

              //Header
              header: $('<h3/>', { class: 'frodo-header' }),
              headerTxt: $('<span/>', { class: 'frodo-header-txt', html: defaults.loginTxt }),
              closeBtn: $('<button/>', { 
                        class: 'frodo-btn-close', 
                        type: 'button',
                        html: 'x'  }),

              //Login form
              loginBox: $('<div/>', { class: 'frodo-login-box' }),
              message: $('<span/>', { id: 'frodo-error-message' }),
              fullname: $('<input/>', {
                        type: 'text',
                        name: 'fullname',
                        class: 'frodo-input',
                        placeholder: defaults.userPlaceholder
              }),
              password: $('<input/>', {
                        type: 'password',
                        name: 'password',
                        class: 'frodo-input',
                        placeholder: defaults.passPlaceholder
              }),
              passwordConfirm: $('<input/>', {
                        type: 'password',
                        name: 'passwordConfirm',
                        class: 'frodo-input frodo-hide',
                        placeholder: defaults.passConfirmPlaceholder,
                        disabled: true
              }),
              email: $('<input/>', {
                        type: 'email',
                        name: 'email',
                        class: 'frodo-input frodo-hide',
                        placeholder: defaults.emailPlaceholder,
                        disabled: true
              }),
              passwordReset: $('<input/>', {
                        type: 'email',
                        name: 'passwordReset',
                        class: 'frodo-input frodo-hide',
                        placeholder: defaults.emailResetPlaceholder,
                        disabled: true
              }),
              loginFooter: $('<div/>', { class: 'frodo-login-footer' }),
              frodoLinksWrapper: $('<div/>', { class: 'frodo-links' }),
              forgotLink: $('<a/>', { 
                        href: defaults.forgotLink,
                        class: 'frodo-forgot', 
                        html: defaults.links[0] 
              }), 
              signUpLink: $('<a/>', { 
                        href: defaults.signUpLink,
                        class: 'frodo-sign-up', 
                        html: defaults.links[1] 
              }),
              submitBtn: $('<button/>', {
                        class: 'frodo-btn-submit',
                        type: 'submit',
                        html: defaults.login    
              }),

              //Social text
              logWith: $('<span/>', { class: 'frodo-log-with', html: defaults.logWith }),

              //Social
              socialWrapper: $('<div/>', { class: 'frodo-social' })

            };

            //PLUGIN LOGIC
            
            //CONTAINERS
            var body = $('body');
 
            //Wrap all content with frodo wrapper, aand append frodo container and overlay
            body.wrapInner(el.wrapper).
                  find(defaults.frodoWrapper).
                  append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            el.header.append(el.headerTxt, el.closeBtn);
            $('.' + defaults.frodoForm).append(el.header);

            //Append login box
            el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink)

            el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);

            // el.loginBox.append(el.message, el.fullname, el.password, el.passwordConfirm, el.email , el.loginFooter);
            el.loginBox.append(el.message, el.email, el.fullname, el.password, el.passwordConfirm, el.passwordReset , el.loginFooter);
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



            //EVENT HANDLERS
            
            //Open login panel
            $('[data-login]').on('click', function(e) {

                e.preventDefault();
                toggleForm();
        
                $('.frodo-overlay').toggleClass(defaults.frodoVisible);
                $('#' + defaults.frodo).toggleClass(defaults.frodoVisible);
                
                $(defaults.frodoWrapper).toggleClass('frodo-no-scroll');

                //Nice to have
                // $('body').toggleClass(defaults.bodyReset);
            });

            //Exit button
            $('.' + defaults.frodoClose).click(function() {

                //Block mouse scroll when panel is open 
                $(defaults.frodoWrapper).removeClass('frodo-no-scroll');

                //Remove uneccessary classes                
                $('#' + defaults.frodo).removeClass(defaults.frodoVisible);
                $('.' + defaults.frodoOverlay).removeClass(defaults.frodoVisible);
                $('#' + defaults.frodoMessage).empty();


                //Nice to have
                // $('body').toggleClass(defaults.bodyReset);
                });
            // });
            
            //Register form        
            $('body').on('click', '.frodo-sign-up', function (event) {
              event.preventDefault();
              toggleForm('sign-up');
            });

            //Reset form
            $('body').on('click', '.frodo-forgot', function (event) {
              event.preventDefault();
              toggleForm('reset');
            });


            // Ajax - jsonp
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