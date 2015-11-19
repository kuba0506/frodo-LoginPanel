/*
    ########  #######   #######  ##       ######## #### ########   ######
       ##    ##     ## ##     ## ##          ##     ##  ##     ## ##    ##
       ##    ##     ## ##     ## ##          ##     ##  ##     ## ##
       ##    ##     ## ##     ## ##          ##     ##  ########   ######
       ##    ##     ## ##     ## ##          ##     ##  ##              ##
       ##    ##     ## ##     ## ##          ##     ##  ##        ##    ##
       ##     #######   #######  ########    ##    #### ##         ######
*/
    (function() {

        $('[data-title]').each(function() {
            var el = $(this);
            el.qtip({
                content: {
                    attr: el.data('title') ? 'data-title' : 'title'
                },
                style: {
                    tip: false
                },
                position: {
                    adjust: {
                        x: 5,
                        y: 5
                    }
                }
            });
        });

        // Images
        var dataImage = $('[data-image]'),
            dataImageImages = [];
        if (dataImage.size()) {
            dataImage.each(function() {
                dataImageImages.push($(this).data('image'));
            });
            preload(dataImageImages);

            dataImage.qtip({
                content: {
                    text: function(api) {
                        return $('<img />').attr('src', $(this).data('image'));
                    }
                },
                position: {
                    viewport: $('body'),
                    adjust: {
                        x: 5,
                        y: 5
                    }
                },
                style: {
                    tip: false,
                    offset: 10,
                    classes: 'qtip--image'
                },
                show: {
                    delay: 300
                }
            });
        }

        // Zoom
        var dataZoom = $('[data-zoom]'),
            dataZoomImages = [];
        if (dataZoom.size()) {
            dataZoom.each(function() {
                dataZoomImages.push($(this).data('zoom'));
            });
            preload(dataZoomImages);

            dataZoom.qtip({
                content: {
                    text: function(api) {
                        var parent = $(this).parents('a');
                        if (parent.size()) {
                            var a = $('<a/>', {
                                href: parent.attr('href')
                            });
                            return a.append($('<img />').attr('src', $(this).data('zoom')));
                        } else {
                            return $('<img />').attr('src', $(this).data('zoom'));
                        }
                    }
                },
                position: {
                    viewport: $('body'),
                    my: 'center center',
                    at: 'center center',
                    adjust: {
                        method: 'shift none'
                    }
                },
                style: {
                    classes: 'qtip--image'
                },
                show: {
                    delay: 300
                },
                hide: {
                    fixed: true
                }
            });
        }
    })();