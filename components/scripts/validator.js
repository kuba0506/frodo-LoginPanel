/*
    ##     ##    ###    ##       #### ########     ###    ########  #######  ########
    ##     ##   ## ##   ##        ##  ##     ##   ## ##      ##    ##     ## ##     ##
    ##     ##  ##   ##  ##        ##  ##     ##  ##   ##     ##    ##     ## ##     ##
    ##     ## ##     ## ##        ##  ##     ## ##     ##    ##    ##     ## ########
     ##   ##  ######### ##        ##  ##     ## #########    ##    ##     ## ##   ##
      ## ##   ##     ## ##        ##  ##     ## ##     ##    ##    ##     ## ##    ##
       ###    ##     ## ######## #### ########  ##     ##    ##     #######  ##     ##
*/
    $('form').Valider({
        onInputError: function(error) {
            var label = this.closest('.label');
            if(label.length) {
                label.addClass('label--invalid');
            }
            var pos = {
                my: 'left center',
                at: 'right center',
                viewport: $('body'),
                adjust: {
                    x: 5,
                    y: 0
                }
            },
            customClasses = '';

            if(this.attr('type') === 'checkbox' || this.hasClass('tooltip-left')) {
                pos.my = 'right center';
                pos.at = 'left center';
                pos.adjust.x = -5;
                customClasses = 'qtip--smallInput';
            }
            this.qtip({
                content: {
                    text: error
                },
                show: {
                    event: false,
                    effect: false
                },
                hide: false,
                position: pos,
                style: {
                    tip: false,
                    classes: 'qtip--form qtip--error '+customClasses
                }
            }).qtip('enable').qtip('show');
        },
        onInputPass: function() {
            this.qtip('destroy');
            var label = this.closest('.label');
            if(label.length) {
                label.removeClass('label--invalid');
            }
        }
    });