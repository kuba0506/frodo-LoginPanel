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
                frodoForm: 'frodo-form',
                frodoVisible: 'frodo-visible',

                //Settings, links
                submitUrl: '?',
                forgotLink: '#',
                signUpLink: '#',

                //Translation
                loginTxt: 'Log In',
                registerTxt: 'Sign Up',
                userPlaceholder: 'Fullname',
                passPlaceholder: 'Password',
                passConfirmPlaceholder: 'Confirm password',
                emailPlaceholder: 'Email',
                emailResetPlaceholder: 'Your email address',
                links: [ 'Forgot your password?', 'Sign up now' , 'Log in now'],
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
              event.preventDefault();

              var loginBox = $('.frodo-login-box'),
                  forgot = $('.frodo-forgot'),
                  headerTxt = $('.frodo-header').find('.frodo-header-txt'),
                  email = loginBox.find('input[name=email]'),
                  passwordConfirm = loginBox.find('input[name=passwordConfirm]'),
                  passwordReset = loginBox.find('input[name=passwordReset]'),
                  hideClass = 'frodo-hide';

                  if (form === 'sign-up') {
                    $(email).add(passwordConfirm).toggleClass(hideClass).prop('disabled', function (index, oldProp) {
                      return !oldProp;
                    });
                    forgot.text( function (i, text) {
                      return text === defaults.links[0] ? defaults.links[2] : defaults.links[0];
                    });
                    headerTxt.text(function (i, text) {
                      return text === defaults.loginTxt ? defaults.registerTxt : defaults.loginTxt;
                    });

                  } else {
                    console.log('Reset');
                    // loginBox.find('input').not(passwordReset).toggleClass(
                    //   function () {
                    //     return hideClass ? !$(this).hasClass(hideClass) : '113';
                    //   }).prop('disabled', function (index, oldProp) {
                    //   return !oldProp;
                    // });
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
                        placeholder: defaults.userPlaceholder,
                        autofocus: true
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
        
                $('.frodo-overlay').toggleClass(defaults.frodoVisible);
                $('#' + defaults.frodo).toggleClass(defaults.frodoVisible);
                
                $(defaults.frodoWrapper).toggleClass('frodo-no-scroll');

                //Nice to have
                // $('body').toggleClass(defaults.bodyReset);
            });

            //Exit button
            $('.frodo-btn-close').click(function() {

                //Block mouse scroll when panel is open 
                $(defaults.frodoWrapper).removeClass('frodo-no-scroll');

                //Remove uneccessary classes                
                $('#frodo').removeClass(defaults.frodoVisible);
                $('.frodo-overlay').removeClass(defaults.frodoVisible);
                $('#frodo-login-message').empty();

                //Nice to have
                // $('body').toggleClass(defaults.bodyReset);
                });
            // });
            
            //Register form        
            $('body').on('click', '.frodo-forgot', function () {
              toggleForm('sign-up');
            });

            //Reset form
            $('body').on('click', '.frodo-sign-up', function () {
              toggleForm();
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