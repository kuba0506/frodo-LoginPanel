/*
     ######  ##    ##  ######  ##       ########
    ##    ##  ##  ##  ##    ## ##       ##
    ##         ####   ##       ##       ##
    ##          ##    ##       ##       ######
    ##          ##    ##       ##       ##
    ##    ##    ##    ##    ## ##       ##
     ######     ##     ######  ######## ########
*/
    $('[data-cycle]').each(function() {
        var el = $(this),
            config = el.dataConfig('cycle', {log: false});
        el.cycle(config);
    });