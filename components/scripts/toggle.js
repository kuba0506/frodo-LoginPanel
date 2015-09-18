/*
    ########  #######   ######    ######   ##       ########
       ##    ##     ## ##    ##  ##    ##  ##       ##
       ##    ##     ## ##        ##        ##       ##
       ##    ##     ## ##   #### ##   #### ##       ######
       ##    ##     ## ##    ##  ##    ##  ##       ##
       ##    ##     ## ##    ##  ##    ##  ##       ##
       ##     #######   ######    ######   ######## ########
*/
    (function() {
        var toogles = $('[data-toggle]');
        toogles.on('change click keyup', function(event) {
            var el = $(this),
                toggle = $(el.data('toggle')),
                clear  = el.data('toggleClear');

            if (el.is(':checkbox')){
                if (el.prop('checked')) {
                    toggle.show();
                } else {
                    toggle.hide();
                    if (clear) {
                        toggle.find('input:text, textarea').val('');
                    }
                }
            } else if (el.is('select')) {
                var selected = el.find('option:selected');
                toggle = $(selected.data('val'));
                selected.siblings().each(function() {
                    $($(this).data('val')).hide();
                });
                toggle.show();
            } else if (el.is(':radio')) {
                if (el.prop('checked')) {
                    var form = el.parents('form'),
                        name = el.attr('name');
                    form.find('[name="'+name+'"]').each(function() {
                        $($(this).data('toggle')).hide();
                    });
                    toggle.show();
                } else {
                    toggle.hide();
                }
            } else {
                toggle.toggle();
                event.preventDefault();
            }
            // Ala F5 dla tooltipów bo możliwe, że zmieniła się ich pozycja
            $('body, html').trigger('resize');
        });

        // Odświeżamy domyslnie zaznaczone checkboxy
        toogles.filter('input:checkbox, input:radio, select').trigger('change');
    })();