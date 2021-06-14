import Popup from '../modules/popup-window.js';
import {
    isInViewport,
} from '../modules/helpers.js';
import {CountUp} from '../countUp.js';

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


function split_value(val) {
    const chars = val.split('');
    let number = '';
    let text = '';

    chars.forEach(char => {
        const numerical = /\.|[0-9]/g;

        if (numerical.test(char)) {
            number += char;
        } else {
            text += char;
        }
    })

    return {
        number,
        text,
    };
}

function animate_value(item) {
    const number_el = document.createElement('span');
    const value_el = item;
    const { number, text } = split_value(item.dataset.value);
    const prefix = (item.dataset.prefix === undefined)? '': item.dataset.prefix;
    let decimalPlaces = 0;

    if (number.indexOf('.') >= 0) {
        decimalPlaces = number.length - number.indexOf('.') - 1;
    }

    number_el.innerText = '0';
    value_el.innerHTML = '';
    value_el.prepend(number_el);

    const options = {
        prefix,
        decimalPlaces,
        duration: 1,
        suffix: text,
        useGrouping: false,
    }

    const countUp = new CountUp(number_el, parseFloat(number), options);
    if (!countUp.error) {
        countUp.start();
    } else {
        console.error(countUp.error);
    }
}

function set_value(item) {
    // const value_el = item.querySelector('.js-value');
    item.innerHTML = item.dataset.value;
}

function show_improvement(improvement_el) {
    return new Promise((resolve, reject) => {
        improvement_el.classList.add('active');
        const item = improvement_el.querySelector('.statistic-item .js-value');

        if (window.matchMedia( '(min-width: 768px)' ).matches) {
            setTimeout(() => {
                animate_value(item);

                item.classList.add('active');

                resolve(true);
            }, 500);
        } else {
            // no animation for mobile
            set_value(item);

            item.classList.add('active');

            resolve(true);
        }
    });
}

export function ideaAnimations($) {
    const improvements_holder = document.querySelector('.statistic-items');

    if (improvements_holder) {

        window.addEventListener('scroll', () => {
            if ( isInViewport(improvements_holder, 0)  && !improvements_holder.classList.contains('active')) {
                improvements_holder.classList.add('active');

                const improvements = improvements_holder.querySelectorAll('.statistic-item');

                show_improvement(improvements[0])
                    .then(result => show_improvement(improvements[1]))
                    .then(result => show_improvement(improvements[2]))
                    .then(result => show_improvement(improvements[3]))
                    .then(result => show_improvement(improvements[4]));
            }
        });

        window.dispatchEvent(new CustomEvent('scroll'));
    }
}
