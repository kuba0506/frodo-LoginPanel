/*
     ######  ##     ##  #######  ########
    ##    ## ##     ## ##     ## ##     ##
    ##       ##     ## ##     ## ##     ##
     ######  ######### ##     ## ########
          ## ##     ## ##     ## ##
    ##    ## ##     ## ##     ## ##
     ######  ##     ##  #######  ##
*/

    $('[data-cart]').on('click', function(event) {
        event.preventDefault();
        var form = $(this).parents('form'),
            dostawa = $('input[name="dostawa"]:checked', form).val(),
            error = $($(this).data('cart'));

        if (dostawa) {
            form[0].action+='?cashdesk=1';
            form.submit();
        } else {
            error.removeClass('hide');
        }
    });


    $('[data-inputclone]').each(function() {
        var wrapper = $(this);
        wrapper.on('click.inputclone', '[data-inputclone-trigger]', function(event) {
            event.preventDefault();
            wrapper.find('[data-from]').each(function() {
                var input = $(this),
                    from = input.data('from').split(','),
                    value = [];
                $.each(from, function () {
                    value.push($('[name="'+this+'"]').val());
                });
                input.val(value.join(' '));
            });
        });
    });


    $('[data-newaccount]').each(function () {
        var checkbox = $(this),
            form = checkbox.closest('form'),
            toggle = $(checkbox.data('toggle')).find('input'),
            button = form.find('button:last'),
            config = checkbox.dataConfig('newaccount'),
            data = {
                on: {
                    action: config.action,
                    button: config.button
                },
                off: {
                    action: form.attr('action'),
                    button: button.text()
                }
            };

        checkbox.on('change click keyup', function () {
            var type = checkbox.prop('checked') ? 'on' : 'off';
            form.attr('action', data[type].action);
            button.text(data[type].button);
            toggle.prop('required', type === 'on');
        }).trigger('change');
    });