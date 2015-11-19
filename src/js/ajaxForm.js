/*
       ###          ##    ###    ##     ##       ########  #######  ########  ##     ##
      ## ##         ##   ## ##    ##   ##        ##       ##     ## ##     ## ###   ###
     ##   ##        ##  ##   ##    ## ##         ##       ##     ## ##     ## #### ####
    ##     ##       ## ##     ##    ###          ######   ##     ## ########  ## ### ##
    ######### ##    ## #########   ## ##         ##       ##     ## ##   ##   ##     ##
    ##     ## ##    ## ##     ##  ##   ##        ##       ##     ## ##    ##  ##     ##
    ##     ##  ######  ##     ## ##     ##       ##        #######  ##     ## ##     ##
*/
    $('form[data-ajax]').on('submit', function(event) {
        if (!event.isDefaultPrevented()) {
            var form = $(this),
                loader = $(form.data('ajaxLoading')),
                data = form.serialize();

            loader.fadeTo('fast', 0.8);

            $.ajax({
                url: form.data('ajax') || form.attr('action'),
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(json){
                    loader.fadeOut('fast');
                    if (json.msg) {
                        form.slideUp(function(){
                            var info = $('<div/>', {
                                'text': json.msg,
                                'class': 'box box--ok'
                            }).hide();
                            form.replaceWith(info);
                            info.slideDown();
                        });
                    } else {
                        form.data("valider").invalidate(json);
                    }
                }
            });
            event.preventDefault();
        }
    });