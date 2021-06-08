import {isInViewport} from '../modules/helpers.js';
import {CountUp} from '../countUp.js';

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
    const value_el = item.querySelector('.js-value');
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
    }

    const countUp = new CountUp(number_el, parseFloat(number), options);
    if (!countUp.error) {
        countUp.start();
    } else {
        console.error(countUp.error);
    }
}

function set_value(item) {
    const value_el = item.querySelector('.js-value');
    value_el.innerHTML = item.dataset.value;
}

function show_improvement(improvement_el) {
    return new Promise((resolve, reject) => {
        improvement_el.classList.add('active');
        const item = improvement_el.querySelector('.improvement .value-with-bar');

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
    const animated_elements = document.querySelectorAll('.proud-statement, .improvement-case .text, .improvement, .happen');
    const proud_animated_once_values = document.querySelectorAll('.proud-statement .value-with-bar');
    const improvements_holder = document.querySelector('.improvements-section .holder');

    if (animated_elements || proud_animated_once_values) {

        window.addEventListener('scroll', () => {
            if ( isInViewport(improvements_holder, 0)  && !improvements_holder.classList.contains('active')) {
                improvements_holder.classList.add('active');

                const improvements = improvements_holder.querySelectorAll('.improvement');

                show_improvement(improvements[0])
                    .then(result => show_improvement(improvements[1]))
                    .then(result => show_improvement(improvements[2]));
            }

            animated_elements.forEach( (item) => {
                if ( isInViewport(item, 0) ) {
                    item.classList.add('in-viewport');
                } else {
                    item.classList.remove('in-viewport');
                }
            });

            proud_animated_once_values.forEach( (item) => {
                if (window.matchMedia( '(min-width: 768px)' ).matches) {
                    if ( isInViewport(item, 0) && !item.classList.contains('active') ) {
                        animate_value(item);

                        item.classList.add('active');
                    }
                } else {
                    set_value(item);

                    item.classList.add('active');
                }
            });
        });

        window.dispatchEvent(new CustomEvent('scroll'));
    }
}
