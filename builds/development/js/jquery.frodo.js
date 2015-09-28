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


  $(document).ready(function(){

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
                loginTxt: 'Log in',
                userPlaceholder: 'Username',
                passPlaceholder: 'Password',
                links: [ 'Forgot your password?', 'Sign up now' ],
                login: 'Login'

                
                // 'frodoOverlay': 'frodo-overlay',
            };

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
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
              header: $('<h3/>', { class: 'frodo-header', html: defaults.loginTxt }),
              closeBtn: $('<button/>', { 
                        class: 'frodo-btn-close', 
                        type: 'button',
                        html: 'x'  }),

              //Login form
              loginBox: $('<div/>', { class: 'frodo-login-box' }),
              message: $('<span/>', { id: 'frodo-error-message' }),
              username: $('<input/>', {
                        type: 'text',
                        class: 'frodo-input',
                        placeholder: defaults.userPlaceholder,
                        autofocus: true
              }),
              password: $('<input/>', {
                        type: 'text',
                        class: 'frodo-input',
                        placeholder: defaults.passPlaceholder,
                        autofocus: true
              }),
              loginFooter: $('<div/>', { class: 'frodo-login-footer' }),
              frodoLinksWrapper: $('<div/>', { class: 'frodo-links' }),
              forgotLink: $('<a/>', { 
                        href: defaults.forgotLink, 
                        html: defaults.links[0] 
              }), 
              signUpLink: $('<a/>', { 
                        href: defaults.signUpLink, 
                        html: defaults.links[1] 
              }),
              submitBtn: $('<button/>', {
                        class: 'frodo-btn-submit',
                        type: 'submit',
                        html: defaults.login    
              }) 
            };

            //PLUGIN LOGIC
            
            //CONTAINERS
            var body = $('body');
 
            //Wrap all content with frodo wrapper, aand append frodo container and overlay
            body.wrapInner(el.wrapper).
                  find(defaults.frodoWrapper).
                  append(el.frodo.append(el.form), el.overlay);

            //Insert form header
            el.header.append(el.closeBtn);
            $('.' + defaults.frodoForm).append(el.header);

            //Append login box
            el.frodoLinksWrapper.append(el.forgotLink, el.signUpLink)
            el.loginFooter.append(el.frodoLinksWrapper, el.submitBtn);
            el.loginBox.append(el.message, el.username, el.password, el.loginFooter);
            $('.' + defaults.frodoForm).append(el.loginBox);

            //Append frodo and frodo-overlay
            // $('#' + defaults.frodoWrapper).append(frodoInit); 

            //EVENT HANDLERS
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


            //Open login panel
            $('[data-login]').on('click', function(e) {

                e.preventDefault();
        
                // var panel = $('#frodo');

                $('.frodo-overlay').toggleClass(defaults.frodoVisible);
                $('#' + defaults.frodo).toggleClass(defaults.frodoVisible);
                
                $(defaults.frodoWrapper).toggleClass('frodo-no-scroll');

                //Change panel visibility
                // (panel.hasClass(defaults.frodoVisible)) ? 
                // panel.removeClass(defaults.frodoVisible)
                // : addClass(defaults.frodoVisible);

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
        });

///=include jquery.frodo.js