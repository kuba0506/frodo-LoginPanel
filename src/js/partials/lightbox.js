/*
    ##       ####  ######   ##     ## ######## ########   #######  ##     ##
    ##        ##  ##    ##  ##     ##    ##    ##     ## ##     ##  ##   ##
    ##        ##  ##        ##     ##    ##    ##     ## ##     ##   ## ##
    ##        ##  ##   #### #########    ##    ########  ##     ##    ###
    ##        ##  ##    ##  ##     ##    ##    ##     ## ##     ##   ## ##
    ##        ##  ##    ##  ##     ##    ##    ##     ## ##     ##  ##   ##
    ######## ####  ######   ##     ##    ##    ########   #######  ##     ##
*/
    (function() {
        $('[data-lightbox]').each(function() {
            var el = $(this),
                config = {
                    delegate: el.is('a') ? undefined : el.data('lightbox')||'a',
                    gallery: {
                        enabled: true,
                        tPrev: 'Poprzednie',
                        tNext: 'Następne',
                        tCounter: '%curr%/%total%'
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 300,
                    type: 'image'
                };
            if(el.data('lightboxConfig')) {
                config = el.dataConfig('lightboxConfig', config);
            }
            el.magnificPopup(config);
        });
    })();