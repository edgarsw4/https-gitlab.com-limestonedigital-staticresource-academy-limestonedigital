export function carouselsInit($) {
    const $window =  $(window);
    // const LATEST_CASES_BOX          = document.querySelector('.js-latest-cases'); // DEPRECATED
    const TESTIMONIALS_HOLDER       = document.querySelector('.js-testimonials-holder');
    const WE_DELIVER_CAROUSEL		= document.querySelector('.js-we-deliver-carousel');
    const TALENTS					= document.querySelector('.js-talents-carousel');
    const RECENT					= document.querySelector('.js-recent-carousel');
    const BUSINESS_ITEMS            = document.querySelector('.js-business-items');
    const EXPERIENCE_DIFFERENCE     = document.querySelector('.js-experience-difference-carousel');
    // const RECENT_2					= document.querySelector('.js-recent-2-carousel'); DEPRECATED
    const REVEAL					= document.querySelector('.reveal-section .holder-slider');
    const IMPROVEMENTS      		= document.querySelector('.improvements-section .holder');
    const TECHNOLOGIES      		= document.querySelector('.technologies-slider-section .technologies-slider');
    const SPEAKERS            		= document.querySelector('.speakers-slider-section .speakers-slider');

    // DEPRECATED
    // if (LATEST_CASES_BOX) {
    //     $window.on('load', initLatestCases);

    //     $('.js-latest-cases').closest('[class$="section"]').on('images_loaded', () => {
    //         $window.off('load', initLatestCases);
    //         initLatestCases();
            
    //     });
    // }

    if (TESTIMONIALS_HOLDER) {
        $window.on('load', initTestimonials);

        $(TESTIMONIALS_HOLDER).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initTestimonials);
            initTestimonials();
            
        });
    }

    if (WE_DELIVER_CAROUSEL) {
        initWeDeliver();
    }

    if (TALENTS) {
        $window.on('load', initTalents);

        $(TALENTS).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initTalents);
            initTalents();
            
        });
    }

    if (RECENT) {
        $window.on('load', initRecent);

        $(RECENT).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initRecent);
            initRecent();
            
        });
    }

    if (BUSINESS_ITEMS) {
        $window.on('load', initBusinessItems);

        $(BUSINESS_ITEMS).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initBusinessItems);
            initBusinessItems();
        });
    }

    if (EXPERIENCE_DIFFERENCE) {
        $window.on('load', initExperienceDifference);

        $(EXPERIENCE_DIFFERENCE).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initExperienceDifference);
            initExperienceDifference();
        });
    }

    // DEPRECATED
    // if (RECENT_2) {
    //     $window.on('load', initRecent2);

    //     $(RECENT_2).closest('[class$="section"]').on('images_loaded', () => {
    //         $window.off('load', initRecent2);
    //         initRecent2();
            
    //     });
    // }



    if (IMPROVEMENTS) {
        $window.on('load', initImprovements);

        $(IMPROVEMENTS).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initImprovements);
            initImprovements();
        });
    }



    if (TECHNOLOGIES) {
        $window.on('load', initTechnologies);

        $(TECHNOLOGIES).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initTechnologies);
            initTechnologies();
        });
    }


    if (SPEAKERS) {
        $window.on('load', initSpeakers);

        $(SPEAKERS).closest('[class$="section"]').on('images_loaded', () => {
            $window.off('load', initSpeakers);
            initSpeakers();
        });
    }


    function initSpeakers() {
        $(SPEAKERS).slick({
            dots: true,
            infinite: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    function initTechnologies() {
        $(TECHNOLOGIES).slick({
            dots: true,
            infinite: false,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        adaptiveHeight: true,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
            ],
        });
    }

    function initImprovements() {
        $(IMPROVEMENTS).slick({
            dots: false,
            infinite: false,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                        
                        adaptiveHeight: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        infinite: false,
                    },
                },
            ],
        });
    }

    function initReveal() {
        $(REVEAL).slick({
            dots: false,
            infinite: false,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            // adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,

                    },
                },
            ],
        });
    }

    // DEPRECATED
    // function initRecent2() {
    //     $(RECENT_2).slick({
    //         dots: true,
    //         infinite: false,
    //         autoplaySpeed: 3000,
    //         arrows: false,
    //         speed: 300,
    //         slidesToShow: 2,
    //         responsive: [
    //             {
    //                 breakpoint: 768,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1,
    //                     dots: true,
    //                     adaptiveHeight: true,
    //                     // infinite: true,
    //                 },
    //             },
    //         ],
    //     });
    // }

    function initExperienceDifference() {
        const quantity = $(EXPERIENCE_DIFFERENCE).find('.item').length;
        const slidesToShow = (quantity > 3)? 4 : quantity;

        $(EXPERIENCE_DIFFERENCE).slick({
            dots: false,
            infinite: false,
            arrows: false,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        adaptiveHeight: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        adaptiveHeight: true,
                        infinite: false,
                    },
                },
            ],
        });
    }
    

    function initBusinessItems() {
        $(BUSINESS_ITEMS).slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            //variableWidth: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: true,
                    },
                },
                {
                    breakpoint: 767,
                    settings: 'unslick',
                },
            ],
        });
    }

    function initRecent() {
        $(RECENT).slick({
            dots: true,
            infinite: false,
            autoplaySpeed: 3000,
            arrows: false,
            speed: 300,
            slidesToShow: 2,
            responsive: [
            	{
            		breakpoint: 1199,
            		settings: {
            			slidesToShow: 1,
            			slidesToScroll: 1,
            		},
            	},
            ],
        });
    }

    function initTalents() {
        $(TALENTS).slick({
            dots: true,
            infinite: false,
            autoplaySpeed: 3000,
            arrows: false,
            speed: 300,
            slidesToShow: 2,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        adaptiveHeight: true,
                        // infinite: true,
                    },
                },
            ],
        });
    }

    function initWeDeliver() {
        $(WE_DELIVER_CAROUSEL).slick({
            dots: true,
            infinite: false,
            autoplaySpeed: 3000,
            arrows: false,
            speed: 300,
            slidesToShow: 2,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                    },
                },
            ],
        });
    }

    function initTestimonials() {
        $(TESTIMONIALS_HOLDER).slick({
            dots: true,
            infinite: false,
            autoplaySpeed: 3000,
            arrows: false,
            speed: 300,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        adaptiveHeight: true,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 850, // 8cv6up bugfix
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        adaptiveHeight: true,
                        infinite: false,
                    },
                },
            ],
        });
    }

    // DEPRECATED
    // function initLatestCases() {
    //     $(LATEST_CASES_BOX).slick({
    //         dots: true,
    //         infinite: false,
    //         autoplaySpeed: 3000,
    //         arrows: false,
    //         speed: 300,
    //         slidesToShow: 3,
    //         responsive: [
    //             {
    //                 breakpoint: 1200,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1,
    //                     dots: true,
    //                     adaptiveHeight: true,
    //                     infinite: false,
    //                 },
    //             },
    //             {
    //                 breakpoint: 768,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1,
    //                     dots: true,
    //                     adaptiveHeight: true,
    //                     infinite: false,
    //                 },
    //             },
    //         ],
    //     });
    // }
}