// import GestureBox from '../modules/GestureBox.js';
// import {
//     checkPageSection,
//     debounce,
//     isActive,
//     isInViewport,
// } from '../modules/helpers.js';


// function forceSetHeightCases() {
//     const OUR_CASES_BOX            = document.querySelector('#our-cases');
//     const OUR_CASES_CAROUSEL       = document.querySelector('.js-our-cases-carousel');
//     if (OUR_CASES_BOX) {
//         const heights = [];
//         [...(OUR_CASES_CAROUSEL.querySelectorAll('.cases-carousel .item'))].forEach( (item) => {
//             heights.push( item.offsetHeight );
//         });

//         const maxHeight = Math.max.apply(0, heights);

//         OUR_CASES_CAROUSEL.querySelector('.inner').setAttribute('style',`height:${maxHeight+140}px`);
//     }
// }

// // Get Next Onboarding Block that will be active
// function getNextCasesBlock(direction = null){
//     const activeItem   = document.querySelector('.js-our-cases-carousel .js-item.active');
//     const activeItemID = (activeItem) ? +activeItem.dataset.id : null;

//     if ( activeItemID>=0 ) {
//         const nextItemID = ( direction && direction === 'left' )
//             ? activeItemID+1
//             : ( direction && direction === 'right' )
//                 ? activeItemID-1
//                 : null;

//         const nextItem = document.querySelector(`.js-our-carousel-navi li[data-id="${nextItemID}"]`);

//         if ( nextItem ) {
//             nextItem.dispatchEvent(new Event('click'));
//         }
//     }
// }

// function casesLeftSwipeHandler() {
//     getNextCasesBlock('left');
// }
// function casesRightSwipeHandler() {
//     getNextCasesBlock('right');
// }


// export function ourCasesHomepage($) {
//     const OUR_CASES_CAROUSEL       = document.querySelector('.js-our-cases-carousel');
//     const VIDEO_PREVIEW   = document.querySelector('.js-video-preview');
//     const OUR_CASES_BOX            = document.querySelector('#our-cases');

//     let our_cases_carousel_items     = null;
//     let our_cases_carousel_navi      = null;
//     let our_cases_carousel_inner     = null;

//     if ( OUR_CASES_CAROUSEL ) {
//         our_cases_carousel_items = OUR_CASES_CAROUSEL.querySelectorAll('.item');
//         our_cases_carousel_navi  = document.querySelector('.js-our-carousel-navi');
//         our_cases_carousel_inner = OUR_CASES_CAROUSEL.querySelector('.js-inner');
//     }

//     // Our cases carousel functionality
//     (our_cases_carousel_items) && [...our_cases_carousel_items].forEach( (item, index) => {
//         let li = document.createElement('li');
//         li.innerHTML = `<span>${index}</span>`;

//         if (!index) {
//             li.classList.add('active');
//         }

//         li.setAttribute('data-id', index);

//         our_cases_carousel_navi.appendChild(li);
//     });


//     const OUR_CASES_CAROUSEL_NAVI_BTNS = document.querySelectorAll('.js-our-carousel-navi li');

//     (OUR_CASES_CAROUSEL_NAVI_BTNS)
//     && [...OUR_CASES_CAROUSEL_NAVI_BTNS].forEach( item => {
//         item.addEventListener( 'click', (event) => {

//             // Change "active" class in the carousel navi
//             [...our_cases_carousel_navi.querySelectorAll('li')]
//                 .forEach(item => item.classList.remove('active'));

//             event.target.classList.add('active');

//             const itemIndex  = +event.target.querySelector('span').innerText;
//             const activeItem = OUR_CASES_CAROUSEL.querySelector('.item.active');
//             const nextItem   = OUR_CASES_CAROUSEL.querySelector(`.item[data-id="${itemIndex}"]`);

//             const nextItemVideo = nextItem.dataset.video;

//             // Add animation to active slide and hide it after animation will finish
//             activeItem.classList.add('translated');
//             VIDEO_PREVIEW.classList.add('photo-changing');

//             setTimeout(() => {
//                 activeItem.classList.remove('translated', 'active', 'showed');
//                 nextItem.classList.add('active');
//             }, 700);

//             setTimeout(() => {
//                 nextItem.classList.add('active');

//                 if ( VIDEO_PREVIEW ) {
//                     VIDEO_PREVIEW.querySelector('img').setAttribute('src', nextItemVideo);
//                 }

//             }, 900);

//             setTimeout(() => {
//                 nextItem.classList.add('showed');
//                 //VIDEO_PREVIEW.classList.remove('photo-changing');
//             }, 1500);

//             setTimeout(() => {
//                 //nextItem.classList.add('showed');
//                 VIDEO_PREVIEW.classList.remove('photo-changing');
//             }, 2000);

//         });
//     });

//     /**
//      * Functionality for swipe effect for Cases Carousel blocks
//      */

//     if ( our_cases_carousel_inner ) {
//         // Run functionality for swipe effect for Cases Carousel blocks
//         const casesGestureBox = new GestureBox(
//             our_cases_carousel_inner,
//             casesLeftSwipeHandler,
//             casesRightSwipeHandler
//         );
//         casesGestureBox.init();

//     }

//     if (OUR_CASES_BOX) {
//         $(window).on('resize', function() {
// 			if ( document.body.clientWidth>1200 ) {
//                 // TODO: check this doubling
// 				OUR_CASES_CAROUSEL.querySelector('.inner').setAttribute('style', 'height:auto');
// 			} else {
// 				OUR_CASES_CAROUSEL.querySelector('.inner').setAttribute('style', 'height:auto');
// 				forceSetHeightCases();
// 			}
//         });

//         $(window).on('load', function() {
//             // force set height
// 			if ( document.body.clientWidth<1200 ) {
// 				forceSetHeightCases();
// 			}
//         });
//     }
// }

// export function termsPageNavigation($) {
//     const SITE_HEADER = document.querySelector('#site-header');
//     const TERMS_NAVIGATION = document.querySelector('.js-terms-page-navigation');
//     const TERMS_ANCHOR = (TERMS_NAVIGATION) && TERMS_NAVIGATION.querySelectorAll('li > a');
//     const TERMS_SECTIONS = document.querySelectorAll('.terms-content h4');
//     const TERMS_MENU_OPENER = document.querySelector('.js-terms-menu-opener');

//     // terms page sticky for mobile
//     // TODO: check, maybe useles after refactoring
//     function termsSticky() {
//         const navWrapper = TERMS_NAVIGATION.closest('.terms-navigation-wrapper');

//         if (window.matchMedia( '(min-width: 768px)' ).matches || window.scrollY < 24) {
//             navWrapper.removeAttribute('style');
//         } else  {
//             navWrapper.style.transform = `translateY(${window.scrollY - 24}px)`;
//         }
//     }

//     // terms set active menuitem
//     function termsActive() {
//         let menuMargin = SITE_HEADER.clientHeight + 70;

//         if (!window.matchMedia( '(min-width: 1200px)' ).matches) {
//             menuMargin -= 110;
//         }

//         [...TERMS_SECTIONS].forEach( section => {

//             const id = section.getAttribute('id');

//             const scrollToTop = section.offsetTop;

//             if ( scrollToTop < menuMargin + window.scrollY ) {

//                 [...TERMS_ANCHOR].forEach( btn => {
//                     btn.classList.remove('active');
//                 });

//                 TERMS_NAVIGATION.querySelector(`[href="#${id}"]`).classList.add('active');
//             }
//         });
//     }
    
//     // terms page check
//     if (TERMS_NAVIGATION) {
//         setTimeout(termsSticky, 0);
//         termsActive();

//         $(window).on('scroll', function() {
//             termsActive(); // TODO: is this function realy neede here?
//             termsSticky();
//         });

//         $(window).on('resize', function() {
//             setTimeout(termsSticky, 0);
//             setTimeout(termsActive, 0);
//         });
//     }


//     // ===========================================
//     // Terms page navigation

//     (TERMS_NAVIGATION) && [...TERMS_ANCHOR].forEach( btn => {
//         btn.addEventListener('click', (event) => {
//             event.preventDefault();

//             const id = event.target.getAttribute('href')
//             const section = document.querySelector(id);

//             let scrollToTop = section.offsetTop - SITE_HEADER.clientHeight;

//             if (window.matchMedia( '(min-width: 1651px)' ).matches && !SITE_HEADER.classList.contains('scrolled')) {
//                 scrollToTop += 20;
//             } else if (!window.matchMedia( '(min-width: 1200px)' ).matches) {
//                 scrollToTop += 50;
//             } else {
//                 scrollToTop -= 20;
//             }


//             (section) && window.scroll({
//                 'behavior': 'smooth',
//                 'left'    : 0,
//                 'top'     : scrollToTop,
//             });
//         });


//     });

//     // terms open menu for tablet
//     (TERMS_MENU_OPENER) && TERMS_MENU_OPENER.addEventListener('click', () => {
//         const mainSection = TERMS_MENU_OPENER.closest('.section');

//         if (mainSection.classList.contains('active')) {
//             mainSection.classList.remove('active');
//         } else {
//             mainSection.classList.add('active');
//         }
//     });
// }

// export function homepageNavigation($) {
//     const PAGE_ANCHOR     = document.querySelectorAll('.js-page-screen-navigation .js-page-anchor');
//     const MAIN_WRAPPER    = document.querySelector('#main-wrapper');
//     const PAGE_SECTIONs   = document.querySelectorAll('.page-section');
//     const SITE_HEADER = document.querySelector('#site-header');
//     const PAGE_SCREEN_NAVIGATION   = document.querySelector('.js-page-screen-navigation');
//     // Full Page scroll functionality
//     (MAIN_WRAPPER) && (PAGE_SECTIONs) && window.addEventListener('scroll', function(...args) {
//         debounce( () => {

//             // Check how far the user has scrolled
//             (PAGE_SECTIONs) && PAGE_SECTIONs.forEach( (item) => {

//                 item.classList.remove('loaded');

//                 const scrollPadding = -80 - (0.2 * window.innerHeight);

//                 if ( isActive(item, scrollPadding) ) {

//                     item.classList.add('loaded');

//                     checkPageSection(item, SITE_HEADER, PAGE_SCREEN_NAVIGATION);


//                     (PAGE_ANCHOR) && [...PAGE_ANCHOR].forEach( (element) => {
//                         if ( element.dataset.id === item.getAttribute('id') ) {
//                             element.classList.add('active');
//                             element.closest('.js-anchor-section').classList.add('active');
//                         } else {
//                             element.classList.remove('active');
//                             element.closest('.js-anchor-section').classList.remove('active');
//                         }
//                     });
//                 }

//             });

//         }, 500)(...args);

//         // left-side menu show logic
//         if ( [...document.body.classList].includes('home') ) {
//             debounce( () => {

//                 // Check how far the user has scrolled
//                 (PAGE_SECTIONs) && PAGE_SECTIONs.forEach( (item) => {

//                     // Hide/show navigation bar if scroll page almost to bottom
//                     PAGE_SCREEN_NAVIGATION.classList.remove('not-visible');

//                     if (item.getAttribute('id')==='site-footer' && isInViewport(item)) {
//                         // Hide/show navigation bar if scroll page almost to bottom
//                         PAGE_SCREEN_NAVIGATION.classList.add('not-visible');
//                     }


//                 });

//             }, 100)(...args);
//         }


//     });

//     if (PAGE_ANCHOR) {
//         $(PAGE_ANCHOR).click(function() {
//             const selector = $(this).data('href');
//             $('html, body').animate({
//                 scrollTop: $(selector).offset().top - $('#site-header').height(),
//             }, 2000);
//         });
//     }
// }

// // deprecated
// // export function csdSectionInit($) {
// //     const EXPERTISE_SECTION_INNER  = document.querySelector('.csd-section .inner');
// //     const EXPERTISE_ITEM_ITEMS     = document.querySelectorAll('.csd-section .js-expertise-item');

// //     $(window).on('load', () => {
// //             // Force set height of block
// //     ( EXPERTISE_SECTION_INNER )
// //     && EXPERTISE_SECTION_INNER
// //             .setAttribute('style',`min-height:${EXPERTISE_SECTION_INNER.clientHeight}px`);
// //     });


// //     ( EXPERTISE_ITEM_ITEMS ) && [...EXPERTISE_ITEM_ITEMS].forEach( item => {

// //         if ( document.body.clientWidth<768 ) {
// //             item.classList.remove('opened');
// //         }

// //         item.addEventListener('click', (event) => {
// //             event.preventDefault();

// //             // Force scroll to block beginning on mobile
// //             if ( document.body.clientWidth<768 ) {

// //                 [...EXPERTISE_ITEM_ITEMS].forEach( item => item.classList.remove('mobile-opened') );
// //                 event.target.closest('.js-expertise-item').classList.add('mobile-opened');

// //                 window.scroll({
// //                     'behavior': 'smooth',
// //                     'left'    : 0,
// //                     'top'     : item.closest('.wrap-expertise-items')
// //                                     .querySelector('.js-expertise-item.mobile-opened')
// //                                     .offsetTop - 70,
// //                 });

// //             } else {
// //                 [...EXPERTISE_ITEM_ITEMS].forEach( item => item.classList.remove('opened') );
// //                 event.target.closest('.js-expertise-item').classList.add('opened');
// //             }
// //         });
// //     });

// //     $(window).on('resize', () => {
// //         // Force set height of block
// //         if ( EXPERTISE_SECTION_INNER ) {
// //             EXPERTISE_SECTION_INNER.setAttribute('style','height:auto');
// //             EXPERTISE_SECTION_INNER
// //                 .setAttribute('style',`min-height:${EXPERTISE_SECTION_INNER.clientHeight}px`);
// //         }

// //         // csd section (build from scratch)
// //         ( EXPERTISE_ITEM_ITEMS ) && [...EXPERTISE_ITEM_ITEMS].forEach( item => {
// //             if ( document.body.clientWidth<768 ) {
// //                 if (item.classList.contains('opened')) {
// //                     item.classList.remove('opened');
// //                     item.classList.add('mobile-opened');
// //                 }
// //             } else {
// //                 if (item.classList.contains('mobile-opened')) {
// //                     item.classList.remove('mobile-opened');
// //                     item.classList.add('opened');
// //                 }
// //             }
// //         });
// //     })
// // }

// export function careersTabsInit($) {
//     const TAB_LINKS         = document.querySelectorAll('.tabs-link');
//     const TABS              = document.querySelectorAll('.tab');
//     // tabs
//     if (TAB_LINKS) {
//         [...TAB_LINKS].forEach((item) => {
//             item.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 const id = event.target.getAttribute('href');
//                 const TAB = event.target.closest('.tabs').querySelector(id);

//                 (TABS) && [...TABS].forEach((item2) => {
//                     item2.classList.remove('active');
//                 });
//                 TAB.classList.add('active');

//                 [...TAB_LINKS].forEach((item3) => {
//                     item3.classList.remove('active');
//                 });
//                 event.target.classList.add('active');

//                 return false;
//             });

//             // open tab by url hash
//             if (window.location.hash === item.getAttribute('href')) {
//                 item.click();
//                 setTimeout(() => {
//                     document.getElementById('job-openings').scrollIntoView();
//                 }, 0);
//             }
//         });
//     }
// }

// // Deprecated
// // export function sevicesTableInit($) {
// //     const SPECIAL_TABLE     = document.querySelector( '.js-special-table' );
// //     const TABLE_SLIDER      = document.querySelector( '.js-table-slider' );

// //     ( SPECIAL_TABLE )
// //     && ( document.body.clientWidth<768 )
// //     && [...SPECIAL_TABLE.querySelectorAll('tbody tr')].forEach( (item, index) => {

// //         const ITEM_HEIGHT = item.offsetHeight;
// //         const TABLE_SLIDER_ITEM1 = document.querySelector(`.js-table-slider .item .m:nth-child(${index+2})`);
// //         const TABLE_SLIDER_ITEM2 = document.querySelector(`.js-table-slider .item:nth-child(2) .m:nth-child(${index+2})`);
// //         const TABLE_SLIDER_ITEM3 = document.querySelector(`.js-table-slider .item:nth-child(3) .m:nth-child(${index+2})`);
// //         const TABLE_SLIDER_ITEM4 = document.querySelector(`.js-table-slider .item:nth-child(4) .m:nth-child(${index+2})`);


// //         if ( TABLE_SLIDER_ITEM1 ) {
// //             TABLE_SLIDER_ITEM1.style.height = ITEM_HEIGHT+'px';
// //         }
// //         if ( TABLE_SLIDER_ITEM2 ) {
// //             TABLE_SLIDER_ITEM2.style.height = ITEM_HEIGHT+'px';
// //         }
// //         if ( TABLE_SLIDER_ITEM3 ) {
// //             TABLE_SLIDER_ITEM3.style.height = ITEM_HEIGHT+'px';
// //         }
// //         if ( TABLE_SLIDER_ITEM4 ) {
// //             TABLE_SLIDER_ITEM4.style.height = ITEM_HEIGHT+'px';
// //         }



// //     });


// //     ( TABLE_SLIDER )
// //     && ( document.body.clientWidth<768 )
// //     && $(TABLE_SLIDER).slick({
// //         dots: true,
// //         infinite: false,
// //         autoplay: false,
// //         autoplaySpeed: 3000,
// //         arrows: false,
// //         speed: 300,
// //         slidesToShow: 1,
// //         responsive: [
// //             {
// //                 breakpoint: 767,
// //                 settings: {
// //                     slidesToShow: 2,
// //                     slidesToScroll: 2,
// //                     dots: true,
// //                     infinite: false,
// //                 },
// //             },
// //             {
// //                 breakpoint: 480,
// //                 settings: {
// //                     slidesToShow: 1,
// //                     slidesToScroll: 1,
// //                     dots: true,
// //                     infinite: false,
// //                 },
// //             },
// //         ],
// //     });
// // }


// export function testimonialsInfinityScrollInit($) {
//     // TODO: clean cases behavior, not used form here now
//     const INFINITE_SCROLL            = document.querySelector('.js-infinite-scroll');
//     const PRELOADER_NODE             = document.querySelector('.loader');

//     function insertCases(success, beforeSend, posts_per_page = 6, offset = 0, action = 'filter_cases') {
//         const CASES_TECHNOLOGY        = $('.js-cases-filter select[name="cases_technology"]');
//         const CASES_CATEGORY          = $('.js-cases-filter select[name="cases_category"]');

//         const tech_values = CASES_TECHNOLOGY.val();
//         const cat_values  = CASES_CATEGORY.val();

//         $.ajax({
//             url: var_from_php.ajax_url,
//             type: 'post',
//             data: {
//                 action,
//                 nonce: var_from_php.nonce,
//                 posts_per_page,
//                 offset,
//                 tech_values,
//                 cat_values,
//             },
//             beforeSend,
//             success,
//         });
//     }

//     // INFINITE SCROLL
//     // used on testimonials page
//     if (INFINITE_SCROLL) {
//         const action = INFINITE_SCROLL.dataset.infiniteScroll;
//         const $scrollElement = $(INFINITE_SCROLL);
//         let request_in_process = false;

//         if (action) {
//             document.addEventListener('scroll', function() {
//                 const no_more_posts = (INFINITE_SCROLL.dataset.noMorePosts === 'false')? false : INFINITE_SCROLL.dataset.noMorePosts;

//                 if (
//                     !no_more_posts &&
//                     !request_in_process &&
//                     window.pageYOffset + window.innerHeight > $scrollElement.offset().top + $scrollElement.height()
//                 ) {
//                     request_in_process = true;

//                     if (action === 'filter_cases' || action === 'get_testimonials') {
//                         const success = (response) => {
//                             if (response.data.no_more_posts) {
//                                 INFINITE_SCROLL.dataset.noMorePosts = true;
//                             }

//                             if (response.data.new_cases) {
//                                 const html = (response.data.html)? response.data.html : response.data;
//                                 $scrollElement.append(html);
//                             }

//                             (PRELOADER_NODE) && PRELOADER_NODE.classList.add('hidden');

//                             request_in_process = false;
//                         };

//                         const beforeSend = function() {
//                             (PRELOADER_NODE) && PRELOADER_NODE.classList.remove('hidden');
//                         }

//                         const posts_per_page = (action === 'get_testimonials')? 8 : 6;

//                         insertCases(success, beforeSend, posts_per_page, $scrollElement.children().length, action);
//                     }
//                 }
//             });
//         }
//     }
// }

// export function blogInfinityScrollInit($) {

//     const INFINITE_SCROLL            = document.querySelector('.js-blog-infinite-scroll');
//     const PRELOADER_NODE             = document.querySelector('.loader');

//     function insertCases(success, beforeSend, offset = 0, action = 'filter_cases') {
//         $.ajax({
//             url: var_from_php.ajax_url,
//             type: 'post',
//             data: {
//                 action,
//                 nonce: var_from_php.nonce,
//                 offset,
//             },
//             beforeSend,
//             success,
//         });
//     }

//     // INFINITE SCROLL
//     // used on posts page
//     if (INFINITE_SCROLL) {
//         const action = INFINITE_SCROLL.dataset.infiniteScroll;
//         const $scrollElement = $(INFINITE_SCROLL);
//         let request_in_process = false;

//         if (action && action === 'get_blog_posts') {
//             document.addEventListener('scroll', function() {
//                 const no_more_posts = (INFINITE_SCROLL.dataset.noMorePosts === 'false')? false : INFINITE_SCROLL.dataset.noMorePosts;

//                 if (
//                     !no_more_posts &&
//                     !request_in_process &&
//                     window.pageYOffset + window.innerHeight > $scrollElement.offset().top + $scrollElement.height()
//                 ) {
//                     request_in_process = true;

//                     const success = (response) => {
//                         console.log('success');
//                         if (response.data.no_more_posts) {
//                             INFINITE_SCROLL.dataset.noMorePosts = true;
//                         }

//                         if (response.data.new_posts) {
//                             const html = (response.data.html)? response.data.html : response.data;
//                             $scrollElement.append(html);
//                         }

//                         (PRELOADER_NODE) && PRELOADER_NODE.classList.add('hidden');

//                         request_in_process = false;
//                     };

//                     const beforeSend = function() {
//                         console.log('beforeSend');
//                         (PRELOADER_NODE) && PRELOADER_NODE.classList.remove('hidden');
//                     }

//                     insertCases(success, beforeSend, $scrollElement.children().length, action);
//                 }
//             });
//         }
//     }
// }

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

// export function quizForm($) {
//     $('.js-quiz-button').on('click', function() {
//         const $section = $(this).closest('.quiz-section')
//         const $form = $(this).closest('form');
//         const fields_quantity = $form.find('.quiz-group').length;
//         const fields_names = $form.serializeArray().map((field) => {
//             return field.name;
//         });
//         const fields_values = $form.serializeArray().map((field) => {
//             return field.value;
//         });

//         if (fields_names.length < fields_quantity) {
//             // validation
//             let i = -1;
//             while(i++ < fields_quantity - 1) {
//                 const $field = $form.find(`[name=quiz_${i}]`);
//                 const $tip = $field.closest('.quiz-group').find('.wpcf7-not-valid-tip');
//                 if (fields_names.indexOf('quiz_'+i) < 0) {
//                     $tip.show();
//                 } else {
//                     $tip.hide();
//                 }
//             }
//         } else {
//             // yes count
//             const count_yes = fields_values.filter(x => x=='Yes').length;
//             // 0 and 1 shows same section
//             const index = (count_yes === 0)? count_yes: count_yes - 1;
//             $section.find('.quiz-quizes').hide();
//             $section.find(`.quiz-answer-${index}`).show();

//             //scroll up
//             const SITE_HEADER = document.querySelector('#site-header');
//             const scrollToTop = $section[0].offsetTop - SITE_HEADER.clientHeight;
//             $( 'html, body' ).stop().animate({scrollTop: scrollToTop}, 500, 'linear');
//         }
//     });
// }

// export function expertiseHover($) {
//     $('.expertise-link').hover(function() {
//         const hoveredEl  = $(this).parent()[0];
//         const $wrapper = $(this).closest('.expertise-circles-wrapper');
//         const $circlesToMove = $wrapper.find('.expertise-link-block, .expertise-circle').not(hoveredEl);

//         const circles = [];

//         $wrapper.addClass('hovered');

//         $(hoveredEl).attr('style', '');

//         const radiusHovered = Math.ceil(Math.ceil(hoveredEl.getBoundingClientRect().width) / 2);
//         const $circle = $(hoveredEl);
//         const top = parseInt($circle.css('top'));
//         const left = parseInt($circle.css('left'));
//         circles.push({
//             top: top,
//             left: left,
//             $element: $circle,
//             x: top,
//             y: left,
//             radius: radiusHovered * 1.1,
//         });

//         moveCircles($circlesToMove, circles);

//     }, function() {
//         const $wrapper = $(this).closest('.expertise-circles-wrapper');
//         const $circlesToMove = $wrapper.find('.expertise-link-block, .expertise-circle').not(this);

//         $wrapper.removeClass('hovered');
//         $circlesToMove.each(function() {
//             $(this).attr('style', '');
//         });
//     });
// }

// function moveCircles($circlesToMove, circles) {
//     const newCircles = [circles[0]];

//     $circlesToMove.each(function() {
//         $(this).attr('style', '');

//         const radius = Math.ceil(Math.ceil(this.offsetWidth) / 2);
//         const $circle = $(this);
//         const top = parseInt($circle.css('top'));
//         const left = parseInt($circle.css('left'));

//         const moveCoef = ($circle.hasClass('expertise-circle'))? 0.3: 0.1;
//         let i = 0; // prevent infinity loop
//         let topRand = 0;
//         let leftRand = 0;
//         while (++i < 100) {
//             topRand = randCoordinate(top, moveCoef + i/100);
//             leftRand = randCoordinate(left, moveCoef + i/100);

//             const collided = isCollidedCircles({
//                 top: topRand,
//                 left: leftRand,
//                 $element: $circle,
//                 x: topRand,
//                 y: leftRand,
//                 radius: radius,
//             }, newCircles);

//             if (!collided) {
//                 break;
//             }
//         }

//         newCircles.push({
//             top: topRand,
//             left: leftRand,
//             $element: $circle,
//             x: topRand,
//             y: leftRand,
//             radius: radius,
//         });
//     });

//     // Draw
//     newCircles.forEach((circle) => {
//         const newTop = ''+circle.top+'px';
//         const newLeft = ''+circle.left+'px';
//         circle.$element.css('top', newTop).css('left', newLeft);
//     });
// }

// function isCollidedCircles(circle0, circles) {

//     let collided = false;

//     circles.forEach((circle) => {
//         if (isCollided(circle, circle0)) {
//             collided = true;
//         }
//     });

//     return collided;
// }

// function isCollided(circle0, circle1) {
//       let maxDistanceSquared = circle0.radius + circle1.radius;
//       maxDistanceSquared *= maxDistanceSquared;
      
//       const dx = circle0.x - circle1.x;
//       const dy = circle0.y - circle1.y;
      
//       const currentDistanceSquared = dx * dx + dy * dy;
      
//       return currentDistanceSquared < maxDistanceSquared;
// }

// function randCoordinate(top, coef = 0.1) {
//     return (top + (Math.random() < 0.5 ? -1 : 1) * (Math.random() * coef * top));
// }
