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

