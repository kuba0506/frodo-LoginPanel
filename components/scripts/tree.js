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