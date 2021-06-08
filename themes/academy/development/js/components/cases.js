import {isInViewport} from '../modules/helpers.js';

export function cases($) {
    const $casesSection = $('.cases-section');
    const $filtersForm = $('.js-cases-filters');
    const $window = $(window);

    if ($casesSection[0]) {
        const $cardsContainer = $('.cases-cards');
        const $loader = $('.loader');
        const $checkedButton = $('[name^=\'cases_\']:checked');

        $filtersForm.on('click', 'input', (event) => {
            const $target = $(event.target);

            // ignore radio names
            $filtersForm.find('input').prop('checked', false);
            $target.prop('checked', true);

            // update list with ajax
            const $technonlogy = $filtersForm.find('[name="cases_technology"]:checked');
            const $industry = $filtersForm.find('[name="cases_industry"]:checked');
            const $service = $filtersForm.find('[name="cases_service"]:checked');

            const tech_values = $technonlogy.val();
            const ind_values  = $industry.val();
            const ser_values  = $service.val();

            const beforeSend = function() {
                ($loader[0]) && $loader[0].classList.remove('hidden');
                $cardsContainer.html('');
            };

            const success = function(response) {
                const html = (response.data.html)? response.data.html : response.data;

                $cardsContainer.html(html);
                ($loader[0]) && $loader[0].classList.add('hidden');

                // INFINITE SCROLL need this
                const noMorePosts = (response.data.no_more_posts !== undefined)? response.data.no_more_posts : false;
                $cardsContainer[0].dataset.noMorePosts = noMorePosts;

                $window.trigger( 'scroll' );
            };

            const posts_per_page  = ($('body').hasClass('page-template-portfolio-template'))? 4 : 6;

            $.ajax({
                url: var_from_php.ajax_url,
                type: 'post',
                data: {
                    action: 'filter_cases',
                    nonce: var_from_php.nonce,
                    posts_per_page,
                    offset: 0,
                    tech_values,
                    ind_values,
                    ser_values,
                },
                beforeSend,
                success,
            });
        });

        // click on ready on last checked button to filter right items
        if ($checkedButton.val() !== 'all' && $checkedButton.val() !== '') {
            $checkedButton.click();
        }

        let request_in_process = false;
        const infinite_scroll = !!$('.js-infinite-cases-scroll')[0];

        $window.on('scroll', () => {
            // show cards on scroll
            $('.cases-cards .cases-card-wrapper').each((i, element) => {
                if (isInViewport(element)) {
                    element.classList.add('was-in-viewport');
                }
            });

            // infinity scroll
            const no_more_posts = ($cardsContainer[0].dataset.noMorePosts === 'false')? false : $cardsContainer[0].dataset.noMorePosts;

            if (
                !no_more_posts &&
                !request_in_process &&
                infinite_scroll &&
                window.pageYOffset + window.innerHeight > $cardsContainer.offset().top + $cardsContainer.height()
            ) {
                request_in_process = true;

                const $technonlogy = $filtersForm.find('[name="cases_technology"]:checked');
                const $industry = $filtersForm.find('[name="cases_industry"]:checked');
                const $service = $filtersForm.find('[name="cases_service"]:checked');

                const tech_values = $technonlogy.val();
                const ind_values  = $industry.val();
                const ser_values  = $service.val();


                const success = (response) => {
                    if (response.data.no_more_posts) {
                        $cardsContainer[0].dataset.noMorePosts = true;
                    }

                    if (response.data.new_cases) {
                        const newCards = (response.data.html)? response.data.html : response.data;
                        const $newCards = $(newCards);

                        // prevent doble adding
                        $newCards.each((index, card) => {
                            const $newCard = $(card);
                            let addFlag = true;

                            $cardsContainer.find('.cases-card-wrapper').each((index, card) => {
                                if ($(card).find('.cases-card-title').html() === $newCard.find('.cases-card-title').html()) {
                                    addFlag = false;
                                }
                            });

                            if (addFlag) {
                                $cardsContainer.append($newCard);
                            }
                        });
                    }

                    ($loader[0]) && $loader[0].classList.add('hidden');

                    request_in_process = false;

                    $window.trigger( 'scroll' );
                };

                const beforeSend = function() {
                    ($loader[0]) && $loader[0].classList.remove('hidden');
                };

                $.ajax({
                    url: var_from_php.ajax_url,
                    type: 'post',
                    data: {
                        action: 'filter_cases',
                        nonce: var_from_php.nonce,
                        posts_per_page: 6,
                        offset: $cardsContainer.children().length,
                        tech_values,
                        ind_values,
                        ser_values,
                    },
                    beforeSend,
                    success,
                });
            }
        });

        $window.trigger( 'scroll' );
    }
}
