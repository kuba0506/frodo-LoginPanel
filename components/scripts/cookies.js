/*
     ######   #######   #######  ##    ## #### ########  ######
    ##    ## ##     ## ##     ## ##   ##   ##  ##       ##    ##
    ##       ##     ## ##     ## ##  ##    ##  ##       ##
    ##       ##     ## ##     ## #####     ##  ######    ######
    ##       ##     ## ##     ## ##  ##    ##  ##             ##
    ##    ## ##     ## ##     ## ##   ##   ##  ##       ##    ##
     ######   #######   #######  ##    ## #### ########  ######
*/

    (function() {

        function CookieMonster() {
            this.init.apply(this, arguments);
        }

        CookieMonster.prototype = {
            init: function(info, more, description, force) {
                if(this.showed() && !force) return;
                this.html = $(
                    '<div class="cookieMonster">' +
                        '<div class="cookieMonster-info">' +
                            info +
                            '<span href="#" class="cookieMonster-close">&times;</span>' +
                            '<span href="#" class="cookieMonster-more">' + more + '</span>' +
                        '</div>' +
                        '<div class="cookieMonster-description">' + description + '</div>' +
                    '</div>'
                );
                var self = this,
                    body = $(document.body);

                this.html.appendTo(body);
                this.description = this.html.find('.cookieMonster-description');
                this.more = this.html.find('.cookieMonster-more');
                this.close = this.html.find('.cookieMonster-close');

                this.more.bind('click.cookieMonster', function() {
                    self.showDescription();
                });

                this.close.bind('click.cookieMonster', function() {
                    self.hide();
                });
            },
            hide: function() {
                this.html.slideUp(200, function() {
                    $(this).remove();
                });
                this.showed(true);
            },
            showed: function(save) {
                if(save) {
                    var date = new Date();
                    date.setTime(date.getTime()+(356*24*60*60*1000));
                    document.cookie = "CookieMonster=showed; expires="+date.toGMTString()+"; path=/";
                } else {
                    var name = "CookieMonster=";
                    var ca = document.cookie.split(';');
                    for(var i=0;i < ca.length;i++) {
                        var c = ca[i];
                        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
                    }
                    return null;
                }
            },
            showDescription: function() {
                this.description.slideToggle();
            }
        };


        new CookieMonster(
            'Nasza strona używa plików cookies. Jeśli nie chcesz, by pliki cookies były zapisywane na Twoim dysku zmień ustawienia swojej przeglądarki.',
            'Przeczytaj więcej o cookies',
            '<p><b>Czym są pliki "cookies"?</b></p>' +
            '<p>Pliki "cookies" to informacje tekstowe przechowywane na urządzeniu końcowym użytkownika (przeglądarka internetowa) w celu rozpoznania urządzenia  tak, aby móc dostarczyć funkcjonalności  takich jak np.: koszyk sklepowy, logowanie. Pliki cookies nie wyrządzają żadnych szkód urządzeniom na których są zapisywane.</p>' +
            '<p><b>Pliki cookies są wykorzystywane  na niniejszej stronie internetowej, do poniższych celów:</b></p>' +
            '<ul>' +
                '<li>utrzymywanie sesji użytkownika  na stronie po zalogowaniu, dzięki czemu nie ma konieczności podawania loginu i hasła na każdej podstronie, którą odwiedza użytkownik. Plik "cookies" wykorzystywane do tego celu są przechowywane tylko do momentu zakończenia sesji danej przeglądarki. Są automatycznie usuwane po jej zamknięciu.</li>' +
                '<li>umożliwienie funkcjonowania mechanizmu "koszyka sklepowego", który zapamiętuje produkty do niego dodane, bez konieczności ponownego ich dodawania do koszyka za każdym razem gdy użytkownik przechodzi na kolejną podstronę. Plik "cookies "wykorzystywane do tego celu  mogą być przechowywane dłużej niż bieżąca sesja przeglądarki użytkownika aby móc zapamiętać i przywrócić w razie zamknięcia przeglądarki, produktów, które użytkownik dodał do koszyka.</li>' +
                '<li>gromadzenie ogólnych, anonimowych statystyk  zachowań użytkowników na stronie, w celu poprawy zawartości oraz funkcjonalności strony internetowej.</li>' +
            '</ul>' +
            '<p><b>Usuwanie plików cookies:</b></p>' +
            '<p>Oprogramowanie do przeglądania stron internetowych ma domyślnie ustawione akceptowanie przyjmowania plików cookies. Ustawienie to można zmienić samodzielnie w dowolnym czasie tak aby pliki cookies były blokowane. Zablokowanie plików cookies może jednak spowodować nieprawidłowe funkcjonowanie mechanizmów na stronie internetowej co uniemożliwi w szczególności np.: korzystanie z koszyka zakupowego lub logowanie użytkownika.</p>'
        );
})();
