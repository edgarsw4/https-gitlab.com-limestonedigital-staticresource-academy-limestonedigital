import Popup from '../modules/popup-window.js';
import {
    isInViewport,
} from '../modules/helpers.js';

export function menuClassHandle() {
    const SITE_HEADER = document.querySelector('#site-header');

    if (!SITE_HEADER) {
        return;
    }

    // check for pages wich started not from top o the page
    if ( window.scrollY>1 ) {
        SITE_HEADER.classList.add('scrolled');
    } else {
        SITE_HEADER.classList.remove('scrolled');
    }

    window.addEventListener('scroll', () => {
        if ( window.scrollY>1 ) {
            SITE_HEADER.classList.add('scrolled');
        } else {
            SITE_HEADER.classList.remove('scrolled');
        }
    });
}

export function burger() {
  // BURGER
  const $menuBtn = $('.menu-btn');
  const $siteHeader = $('.site-header');
  const $body = $('body');
  const $html = $('html');

  $menuBtn.on('click', () => {
    if($menuBtn.hasClass('open')) {
      $menuBtn.removeClass('open');
      $siteHeader.removeClass('open');
      $body.removeClass('menu-opened');
      $html.removeClass('menu-opened');
    } else {
      $menuBtn.addClass('open');
      $siteHeader.addClass('open');
      $body.addClass('menu-opened');
      $html.addClass('menu-opened');
    }
  });
}

export function clickOnHash($) {
    $('a').click(function(event) {
        const link = $(event.target).attr('href');
        const hash = link.substr(link.indexOf('#'));
        const $hash = $(hash);

        if ($hash[0]) {
            const offset = $hash.offset().top - $('#site-header').height();

			$('html, body').animate({
				scrollTop: offset,
			}, 1500, 'swing');
		}
    });
}

export function scrollToURLHash($) {
    if(window.location.hash) {
		const $hash = $(window.location.hash);

		if ($hash[0]) {
            const offset = $hash.offset().top - $('#site-header').height();

			$('html, body').animate({
				scrollTop: offset,
			}, 1500, 'swing');
		}
	}
}

export function initPopups() {
    // Init popups Windows
    const popup_windows = new Popup();
    popup_windows.init();
    window.popup_windows = popup_windows;
}

export function inViewportChecking($) {
    const STAGES_ITEMS             = document.querySelectorAll(
        '.stages-holder .stage'
    );

    $(window).on('scroll', () => {
        // Adding scroll animation to Stage items
        ( STAGES_ITEMS ) && [...STAGES_ITEMS].forEach( (item) => {
            if ( isInViewport(item, 0) ) {
                item.classList.add('in-viewport');
            } else {
                item.classList.remove('in-viewport');
            }
        });
    });
}

export function cookieReminderInit() {
    const CLOSE_COOKIE_REMINDER    = document.querySelectorAll('.js-close-reminder');
    const COOKIE_POLICY_BOX        = document.querySelector('.js-cookie-policy-box');

    const cookie_policy_check = Cookies.get('cookie_policy');

    if ( cookie_policy_check !== 'viewed' ) {
        setTimeout( () => {
            (COOKIE_POLICY_BOX) && COOKIE_POLICY_BOX.classList.add('opened');
        }, 2000 );
    }

    (CLOSE_COOKIE_REMINDER) && CLOSE_COOKIE_REMINDER.forEach( item => {

        item.addEventListener('click', (event) => {
            event.preventDefault();

            (COOKIE_POLICY_BOX) && COOKIE_POLICY_BOX.classList.remove('opened');
            Cookies.set('cookie_policy', 'viewed', {expires: 40});
        });

    });
}

export function parallax($) {
    function parallaxEvent() {
        if (!window.matchMedia('(max-width: 1439px)').matches) {
            const windowHeight = $(window).height();
            doParallax($('.circle-1'), windowHeight, 'top');
            doParallax($('.circle-2'), windowHeight, 'bottom');
            doParallax($('.circle-3'), windowHeight, 'top');
            doParallax($('.circle-4'), windowHeight, 'bottom');
            doParallax($('.circle-5'), windowHeight, 'top');
        }
    }

    parallaxEvent();
    $(window).scroll(parallaxEvent);
    $(window).resize(parallaxEvent);
}

function doParallax($element, windowHeight, position) {
    const elementTop = $element.offset().top;
    const circleTop = window.scrollY - elementTop + windowHeight;

    if (circleTop > 0 && circleTop < windowHeight) {
        const newCircleTop = circleTop / 2;
        if ('top' === position) {
            $element.css('top', newCircleTop+'px');
        } else {
            $element.css('bottom', '-'+(newCircleTop / 1.5)+'px');
        }
        
    }
}
