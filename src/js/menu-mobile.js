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