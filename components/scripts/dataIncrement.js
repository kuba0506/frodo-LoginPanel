/*
DATA INCREMENT/DECREMENT
 */
    $('[data-increment]').on('click', function(event) {
        event.preventDefault();
        var i = parseInt($($(this).data('increment')).get(0).value);
        log($('#qty').attr('max'));
        if (i>= $('#qty').attr('max')) {
            return false;
        }
        if (isNaN(i))
            i=0;
            i++;
        $($(this).data('increment')).get(0).value = (i);
    });
    $('[data-decrement]').on('click', function(event) {
        event.preventDefault();
        var i = parseInt($($(this).data('decrement')).get(0).value);
        if (isNaN(i))
            i=0;
        if (i > 0)
            i--;
        $($(this).data('decrement')).get(0).value = (i);
    });