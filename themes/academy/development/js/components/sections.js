export function termsPageNavigation($) {
    const SITE_HEADER = document.querySelector('#site-header');
    const TERMS_NAVIGATION = document.querySelector('.js-terms-page-navigation');
    const TERMS_ANCHOR = (TERMS_NAVIGATION) && TERMS_NAVIGATION.querySelectorAll('li > a');
    const TERMS_SECTIONS = document.querySelectorAll('.terms-content h4');
    const TERMS_MENU_OPENER = document.querySelector('.js-terms-menu-opener');

    // terms page sticky for mobile
    function termsSticky() {
        const navWrapper = TERMS_NAVIGATION.closest('.terms-navigation-wrapper');

        if (window.matchMedia( '(min-width: 768px)' ).matches || window.scrollY < 24) {
            navWrapper.removeAttribute('style');
        } else  {
            navWrapper.style.transform = `translateY(${window.scrollY - 24}px)`;
        }
    }

    // terms set active menuitem
    function termsActive() {
        let menuMargin = SITE_HEADER.clientHeight + 70;

        if (!window.matchMedia( '(min-width: 1200px)' ).matches) {
            menuMargin -= 110;
        }

        [...TERMS_SECTIONS].forEach( section => {

            const id = section.getAttribute('id');

            const scrollToTop = section.offsetTop;

            if ( scrollToTop < menuMargin + window.scrollY ) {

                [...TERMS_ANCHOR].forEach( btn => {
                    btn.classList.remove('active');
                });

                TERMS_NAVIGATION.querySelector(`[href="#${id}"]`).classList.add('active');
            }
        });
    }
    
    // terms page check
    if (TERMS_NAVIGATION) {
        setTimeout(termsSticky, 0);
        termsActive();

        $(window).on('scroll', function() {
            termsActive(); // TODO: is this function realy neede here?
            termsSticky();
        });

        $(window).on('resize', function() {
            setTimeout(termsSticky, 0);
            setTimeout(termsActive, 0);
        });
    }


    // ===========================================
    // Terms page navigation

    (TERMS_NAVIGATION) && [...TERMS_ANCHOR].forEach( btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            const id = event.target.getAttribute('href')
            const section = document.querySelector(id);

            let scrollToTop = section.offsetTop - SITE_HEADER.clientHeight;

            if (window.matchMedia( '(min-width: 1651px)' ).matches && !SITE_HEADER.classList.contains('scrolled')) {
                scrollToTop += 20;
            } else if (!window.matchMedia( '(min-width: 1200px)' ).matches) {
                scrollToTop += 50;
            } else {
                scrollToTop -= 20;
            }


            (section) && window.scroll({
                'behavior': 'smooth',
                'left'    : 0,
                'top'     : scrollToTop,
            });
        });


    });

    // terms open menu for tablet
    (TERMS_MENU_OPENER) && TERMS_MENU_OPENER.addEventListener('click', () => {
        const mainSection = TERMS_MENU_OPENER.closest('.section');

        if (mainSection.classList.contains('active')) {
            mainSection.classList.remove('active');
        } else {
            mainSection.classList.add('active');
        }
    });
}

export function ticksListAccordion($) {
    const $list = $('.ticks-list');

    if ($list[0]) {
        $list.find('.tick.expandable').on('click', function() {
            const $tick = $(this);

            $list.find('.tick').removeClass('active');

            $tick.addClass('active');
        })

    }
}
