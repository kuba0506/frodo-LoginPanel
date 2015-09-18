var loginPanel = function () {
/*
    ########  ########   #######  ########  ########   #######  ##      ## ##    ##
    ##     ## ##     ## ##     ## ##     ## ##     ## ##     ## ##  ##  ## ###   ##
    ##     ## ##     ## ##     ## ##     ## ##     ## ##     ## ##  ##  ## ####  ##
    ##     ## ########  ##     ## ########  ##     ## ##     ## ##  ##  ## ## ## ##
    ##     ## ##   ##   ##     ## ##        ##     ## ##     ## ##  ##  ## ##  ####
    ##     ## ##    ##  ##     ## ##        ##     ## ##     ## ##  ##  ## ##   ###
    ########  ##     ##  #######  ##        ########   #######   ###  ###  ##    ##
*/
(function() {
        var dropdowns = $('[data-dropdown]'),
            open_class = 'dropdown--open',
            open = false,
            open_content = false,
            timer = null,
            timer_time = 350;

        dropdowns.on('click mouseenter mouseleave', function(event) {
            if ($(window).width() > 768) {
                if (event.type === 'mouseleave') {
                    timer = setTimeout(function() {
                        if (open) {
                            open.removeClass(open_class);
                            open_content.hide();
                            open_content = open = false;
                        }
                    }, timer_time);
                } else {
                    clearTimeout(timer);
                }
            }
            if ($(event.target).closest('[data-dropdown-content]').length) {
                return;
            }
            event.preventDefault();
            var link = $(this),
                content = link.find('[data-dropdown-content]');
            if (event.type === 'click') {
                if (!open) {
                    link.addClass(open_class);
                    content.show();
                    open = link;
                    open_content = content;
                } else {
                    if (open) {
                        open.removeClass(open_class);
                        open_content.hide();
                        open_content = open = false;
                    }
                    content.hide();
                }
            } else if (event.type === 'mouseenter') {
                if ($(window).width() > 768) {
                    if (open) {
                        open.removeClass(open_class);
                        open_content.hide();
                        content.show();
                        link.addClass(open_class);
                        open = link;
                        open_content = content;
                    } else {
                        //dodano 16.01.15
                        link.addClass(open_class);
                        content.show();
                        open = link;
                        open_content = content;
                    }
                }   
            }
        });

        $('body').on('click.dropdown-clear', function(event) {
            if (open && !$(event.target).closest('[data-dropdown]').length) {
                open.removeClass(open_class);
                open_content.hide();
                open_content = open = false;
            }
        });
    })();


/*
    ######## ########  ######## ########
       ##    ##     ## ##       ##
       ##    ##     ## ##       ##
       ##    ########  ######   ######
       ##    ##   ##   ##       ##
       ##    ##    ##  ##       ##
       ##    ##     ## ######## ########
*/
    $('[data-tree]').each(function() {

        var container = $(this),
            open = container.data('tree'),
            span = container.find('span');

            span.next('ul').hide();

        if (open) {
            open = $('#'+open).addClass('active');
            open.parents('ul').show();
            open.parents('li').addClass('open');
            open.children('a').next('ul').show();
            open.children('span').next('ul').show();
        }

        // container.on('click', 'a', function(event){
        container.on('click', 'a', function(event){
            if ($(this).next('ul').size()) {

                if (!$(this).hasClass('js-go')) {

                    var a = $(this),
                        li = a.parent('li'),
                        next = a.next('ul'),
                        speed = 200;

                    if (li.hasClass('open')) {
                        // Zamykamy
                        var sub_li = next.find('li.open'),
                            sub_menu = sub_li.find('ul');
                        next.slideUp(speed);
                        li.removeClass('open');
                        sub_menu.slideUp(speed);
                        sub_li.removeClass('open');
                    } else {
                        var sib_li = li.siblings().add(li.siblings().find('li.open')),
                            sib_menu = li.siblings('.open').find('ul');
                        // Otwieramy
                        next.slideDown(speed);
                        li.addClass('open');
                        sib_li.removeClass('open');
                        sib_menu.slideUp(speed);
                    }
                    event.preventDefault();
                }
            }
        });
    });
//Menu mobilne
    $('.mobile-menu').on('click', function () {
        $(this).toggleClass('mobile-menu--rotate');

        $('.ul-wrapper').toggleClass('menu-toggle');
    });

//Wyłącznie menu mobilnego
    $('body').on('click', function (e) {

        if (!$(e.target).closest('.nav').length) {
            $('.mobile-menu').removeClass('mobile-menu--rotate');
            $('.ul-wrapper').removeClass('menu-toggle');
        }
    });
/// =include scrollTotop.js
/// =include cycle.js
/// =include lightbox.js
/// =include toggle.js
/// =include validator.js
/// =include tooltips.js
/// =include cookies.js
/**
 *     __    ____  ______
    / /   / __ \/ ____/
   / /   / / / / / __  
  / /___/ /_/ / /_/ /  
 /_____/\____/\____/   
                       
 */

function log() {
    try {
        console.log.apply(console, arguments);
    } catch (e) {
        try {
            opera.postError.apply(opera, arguments);
        } catch (e) {
            alert(Array.prototype.join.call(arguments, ''));
        }
    }
}
};

//Uruchomienie skryptów po załadowaniu strony
$(document).ready(loginPanel);