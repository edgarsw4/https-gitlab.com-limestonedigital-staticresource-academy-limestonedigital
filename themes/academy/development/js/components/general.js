import Popup from '../modules/popup-window.js';
import {
    isInViewport,
    copyToClipboard,
} from '../modules/helpers.js';

export function setBodyClasses(md, $) {
    const body = document.querySelector('body');

    if (md.mobile()) {
        body.classList.add('mobile');
        body.classList.add('mobile-menu');
    }

    $(window).on('load', () => {
        body.classList.add('loaded');
    })
}

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
        console.log(window.scrollY);
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

export function preloadLazyImages($, md) {
    $(window).on('load', () => {
        $('noscript').each((i, element) => {
            const $img = $(element.innerText);

            // load images in after document load;
            if ($img.is('img')) {
                const loadImage = new Image();
                loadImage.src = $img.attr('src');
                loadImage.onload = function () {
                    loadImage.remove();
                }
            }
        });
    });
}

function isImageLoaded(img) {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
        return false;
    }

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
    if (img.naturalWidth === 0) {
        return false;
    }

    // special autooptimaze lazyload case
    if (img.naturalWidth === 225 && img.naturalHeight === 150) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
}

function onLoad($, img) {
    return new Promise((resolve, reject) => {
        if (isImageLoaded(img)) {
            resolve(img);
        } else {
            $(img).on('load', () => {
                resolve(img);
            });
        }
    });
}

async function checkImagesLoading($, section) {
    const promises = [];

    $(section).find('img').each((index, img) => {
        promises.push(onLoad($, img));
    });

    await Promise.all(promises);
    $(section).trigger('images_loaded');
}

export function imagesLoaded($) {
	// add class "loaded" to section on all images load event
	$('.first-section, .section, .page-section, .top-box').each((index, section) => {
		$(section).on('images_loaded', (event) => {
			$(section).addClass('images-loaded');
		});
		checkImagesLoading($, section);
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

/**
 * When the openFullscreen()
 * function is executed, open the video in fullscreen.
 * Note that we must include prefixes for different browsers,
 * as they don't support the requestFullscreen property yet
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}


export function showVideo($) {
    const START_VIDEO_BTN          = document.querySelectorAll('.js-start-video');
    const OUR_CASES_BOX            = document.querySelector('#our-cases');
    const FIXED_VIDEO_HOLDER       = document.querySelector('#fixed-video-holder');
    const CLOSE_VIDEO_BTN          = document.querySelector('.js-close-video');

    // Open "our cases" video
    (START_VIDEO_BTN) && [...START_VIDEO_BTN].forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const VIDEO_URL = event.target.dataset.video;
            const VIDEO_TYPE = event.target.dataset.videoType;

            (OUR_CASES_BOX) && OUR_CASES_BOX.classList.add('loading-video');
            (FIXED_VIDEO_HOLDER) && FIXED_VIDEO_HOLDER.classList.add('loading-video');

            setTimeout( () => {
                if (FIXED_VIDEO_HOLDER) {
                    if (VIDEO_TYPE && VIDEO_TYPE === 'youtube') {
                        FIXED_VIDEO_HOLDER.querySelector('.inner').innerHTML = `<iframe class="youtube-video"
                            src="${VIDEO_URL}?rel=0&autoplay=1" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>`;
                    } else {
                        FIXED_VIDEO_HOLDER.querySelector('.inner').innerHTML = `<video controls autoplay><source src="${VIDEO_URL}" type="video/mp4"></video>`;

                        let video = FIXED_VIDEO_HOLDER.querySelector('.inner').childNodes[0];

                        // Enter fullscreen mode
                        openFullscreen(video);

                        FIXED_VIDEO_HOLDER.querySelector('video').webkitEnterFullScreen();
                    }
                }

            }, 1300);
        });
    });



    // Close "our cases" video
    (CLOSE_VIDEO_BTN) && CLOSE_VIDEO_BTN.addEventListener('click', (event) => {
        event.preventDefault();

        (OUR_CASES_BOX) && OUR_CASES_BOX.classList.remove('loading-video');
        (FIXED_VIDEO_HOLDER) && FIXED_VIDEO_HOLDER.classList.remove('loading-video');

        setTimeout( () => {
            if ( FIXED_VIDEO_HOLDER ) {
                FIXED_VIDEO_HOLDER.querySelector('.inner').innerHTML = '';
            }
        }, 1300);
    });
}

export function initPopups() {
    // Init popups Windows
    const popup_windows = new Popup();
    popup_windows.init();
    window.popup_windows = popup_windows;
}

export function scrollToButton($) {
    const SCROLL_TO_ELEMENT_BTN = document.querySelectorAll('.js-anchor-section');
    const SITE_HEADER = document.querySelector('#site-header');

    ( SCROLL_TO_ELEMENT_BTN ) && [...SCROLL_TO_ELEMENT_BTN].forEach( (item) => {

        item.addEventListener('click', function(event) {

            let href = this.getAttribute('href');
            const dataHref = this.dataset.href;

            // Getting a value from either "href" or "data-href" attribute
            // according what "event.target" is the instance(button or link)
            href = ( href ) ? href : dataHref;

            // Check if it's a anchor link
            if ( href && href.length > 1 && href[0] === '#' ) {
                event.preventDefault();

                // header menu height
                let minusScroll = (SITE_HEADER)? SITE_HEADER.clientHeight: 0;

                if ($('body').hasClass('no-menu')) {
                    minusScroll = 0;
                }

                let scroll_offset = (this.dataset.offset)
                                            ? +this.dataset.offset
                                            : 0;

                if ( [...document.body.classList].includes('home') ) {
                    scroll_offset = 0;
                }

                if (document.querySelector(href)) {
                    const scrollTo = document.querySelector(href).offsetTop - scroll_offset - minusScroll;

                    $( 'html, body' ).stop().animate({scrollTop: scrollTo}, 500, 'linear');
                }


                // correction scroll position, because header height may change
                // header transition 400ms
                setTimeout(() => {
                    let minusScroll = SITE_HEADER.clientHeight;
    
                    if ($('body').hasClass('no-menu')) {
                        minusScroll = 0;
                    }

                    let scroll_offset = (this.dataset.offset)
                                                ? +this.dataset.offset
                                                : 0;
                    
                    if ( [...document.body.classList].includes('home') ) {
                        scroll_offset = 0;
                    }

                    if (document.querySelector(href)) {
                        const scrollTo = document.querySelector(href).offsetTop - scroll_offset - minusScroll;
    
                        $( 'html, body' ).stop().animate({scrollTop: scrollTo}, 100, 'linear');
                    }
                }, 440);
            }
        });
    });
}

function getNextSiblings(elem, filter) {
    const sibs = [];
    while (elem = elem.nextSibling) {
        if (elem.nodeType === 3) continue; // text node
        if (!filter || filter(elem)) sibs.push(elem);
    }
    return sibs;
}

export function scrollToSecondSection($) {
    const GO_TO_NEXT_SECTION_BTN   = document.querySelectorAll('.js-go-to-next-section');
    const SITE_HEADER = document.querySelector('#site-header');

    (GO_TO_NEXT_SECTION_BTN) && [...GO_TO_NEXT_SECTION_BTN].forEach( btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            if ( [...document.body.classList].includes('home') ) {
                console.log('test3');
                const WE_DELIVER_ELEMENT = document.querySelector('.page-anchor[data-id="we-deliver-section"]');
                $(WE_DELIVER_ELEMENT).click();
            } else {
                const firstSection = btn.closest('.section');
                const order = getComputedStyle(firstSection).order;
                let nextSectionParent;

                if (order == '1') {
                    getNextSiblings(firstSection).forEach((section) => {
                        if (getComputedStyle(section).order == '2') {
                            nextSectionParent = section;
                        }
                    });
                } else {
                    nextSectionParent = firstSection.nextElementSibling;
                }


                let scrollToTop = nextSectionParent.offsetTop - SITE_HEADER.clientHeight;
                
                if (nextSectionParent) {
                    $( 'html, body' ).stop().animate({scrollTop: scrollToTop}, 500, 'linear');
                }

                // correction scroll position, because header height may change
                // header transition 400ms
                setTimeout(() => {
                    let scrollToTop = nextSectionParent.offsetTop - SITE_HEADER.clientHeight;

                    if (nextSectionParent) {
                        $( 'html, body' ).stop().animate({scrollTop: scrollToTop}, 100, 'linear');
                    }
                }, 440);
            }
        });
    });
}

export function afterloadLoad($) {
    $(window).on('load', () => {
        // deffer load gif on homepage
        $('[data-afterload]').each((i, img) => {
            const loadImage = new Image();
            loadImage.src = $(img).data('afterload');
            loadImage.onload = function () {
                img.src = loadImage.src;
            }
        });
    });
}


export function fixedMenu() {
    const HTML        = document.querySelector('html');
    const FIXED_MENU  = document.querySelector('#fixed-menu');
    const CLOSE_FIXED_MENU_BTN     = document.querySelector('.js-close-fixed-menu');
    const OPEN_FIXED_MENU_BTN      = document.querySelector('.js-open-fixed-menu');
    const SPECIAL_SUB_MENU           = document.querySelectorAll('.js-special-sub-menu');
    // Special menu
    const SPECIAL_SUB_MENU_ACTIVATORS = document.querySelectorAll('.js-special-sub-menu-holder > a, .js-special-sub-menu-holder > .like-link');
    const CLOSE_SPECIAL_SUB_MENU     = document.querySelectorAll('.js-prev-menu');

    // Open fixed menu functionality
    (OPEN_FIXED_MENU_BTN) && OPEN_FIXED_MENU_BTN.addEventListener('click', (event) => {
        event.preventDefault();
        window.popup_windows.forceCloseAllPopup();
        (FIXED_MENU) && FIXED_MENU.classList.add('activated');
        HTML.classList.add('overflow-hidden');
        return false;
    });

    // Close fixed menu functionality
    (CLOSE_FIXED_MENU_BTN) && CLOSE_FIXED_MENU_BTN.addEventListener('click', (event) => {
        event.preventDefault();
        (FIXED_MENU) && FIXED_MENU.classList.remove('activated');
        (SPECIAL_SUB_MENU) && [...SPECIAL_SUB_MENU].forEach( item => item.classList.remove('activated'));
        HTML.classList.remove('overflow-hidden');
        return false;
    });

    //Closing Opened menu
    document.addEventListener('click', function(event) {

        if ( ![...FIXED_MENU.classList].includes('activated') ) return;

        const isClickInside = FIXED_MENU.contains(event.target);
        const isClickInside2 = (event.target === OPEN_FIXED_MENU_BTN);

        if ( !isClickInside && !isClickInside2 ) {
            // the click was outside the specifiedElement, do something
            CLOSE_FIXED_MENU_BTN.dispatchEvent( new Event('click') );
        }

    });

    // ============================================================
    // ============================================================

    // Open special mobile/tablet fixed sub menu
    [...SPECIAL_SUB_MENU_ACTIVATORS].forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.nextElementSibling.classList.add('activated');
        });
    });

    // Close special mobile/tablet fixed sub menu
    [...CLOSE_SPECIAL_SUB_MENU].forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.closest('.js-special-sub-menu').classList.remove('activated');
        });
    });
}

export function headerMenu() {
    // ========================================================
    // ========================================================
    // immidiatly hidding (dgzzv8)

    const MENU_ITEMS = document.querySelectorAll('.header-menu-wrapper .menu-item');
    const CURRENT_MENU_ITEM = document.querySelector('.header-menu-wrapper .current-menu-item');

    [...MENU_ITEMS].forEach( (item) => {
        if (CURRENT_MENU_ITEM !== item) {
            item.addEventListener('mouseenter', function() {
                (CURRENT_MENU_ITEM) && CURRENT_MENU_ITEM.classList.add('not-underlined');

                setTimeout(() => {
                    $(item).closest('.header-custom-menu').addClass('no-submenu-animation');
                }, 300);
            }, false);
        }
    });

    [...MENU_ITEMS].forEach( (item) => {
        item.addEventListener('mouseleave', function() {
            (CURRENT_MENU_ITEM) && CURRENT_MENU_ITEM.classList.remove('not-underlined');

            setTimeout(() => {
                $(item).closest('.header-custom-menu').removeClass('no-submenu-animation');
            }, 299);
        }, false);
    });
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


export function initCopyToClipboard() {
    const COPY_BOX_FORM   = document.querySelectorAll('.js-copy-box-form');
    // Copy Vacancy page url functionality
    (COPY_BOX_FORM) && [...COPY_BOX_FORM].forEach( form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            copyToClipboard( form, form.querySelector('.js-value-to-copy') );
        });
    });
}

export function reportPopupInit($) {
    // report popups showing
    const reportPopupExist = !!$('#report-popup-v1')[0];

    if (
        reportPopupExist
        && ($('body').hasClass('page-template-page-report')
        || $('body').hasClass('page-template-page-report-thank-you'))
    ) {
        Cookies.set('lime-report-ab_status', 'viewed', {expires: 700});
    } else if (
        reportPopupExist
        && $('.js-show-report-popup')[0]
    ) {
        const lime_report_ab_status = Cookies.get('lime-report-ab_status');

        if (lime_report_ab_status !== 'viewed') {
            let count = parseInt(lime_report_ab_status);

            if (lime_report_ab_status === undefined) {
                count = 0;
            }

            const interval = setInterval(function(){
                count++;

                // 1 minute before show
                if (count >= 6) {
                    Cookies.set('lime-report-ab_status', 'viewed', {expires: 700});

                    clearInterval(interval);
                    window.popup_windows.openOnePopup('#report-popup-v1', 300);
                } else {
                    Cookies.set('lime-report-ab_status', `${count}`, {expires: 700});
                }
            }, 1000);
        }
    }
}

export function cookieReminderInit($) {
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

function updateCountdown($countdown, time) {
    const days = Math.floor(time/86400);
    time -= 86400 * days;
    const hours = Math.floor(time/3600);
    time -= 3600 * hours;
    const minutes = Math.floor(time/60);
    const seconds = time - 60 * minutes;

    $countdown.find('.countdown-days .countdown-value').html(days.toString().padStart(2, '0'));
    $countdown.find('.countdown-hours .countdown-value').html(hours.toString().padStart(2, '0'));
    $countdown.find('.countdown-minutes .countdown-value').html(minutes.toString().padStart(2, '0'));
    $countdown.find('.countdown-seconds .countdown-value').html(seconds.toString().padStart(2, '0'));
}

export function countdown($) {
    const $countdown = $('[data-countdown]');

    if ($countdown[0]) {
        const countdown = $countdown.data('countdown');
        let time = Math.round((Date.parse(countdown) - Date.now()) / 1000);

        updateCountdown($countdown, time);

        const interval = setInterval(()=> {
            time--;
            if (time >= 0) {
                updateCountdown($countdown, time);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
}
