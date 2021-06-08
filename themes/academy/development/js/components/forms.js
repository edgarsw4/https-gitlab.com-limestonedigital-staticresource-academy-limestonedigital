import {
    validateField,
    validateBusinessEmail,
    validateBusinessEmailName,
} from '../modules/helpers.js';

/**
 * truncate to long string and add ellipsis
 */
function truncate(string, n){
    return (string.length > n) ? string.substr(0, n-1) + '&hellip;' : string;
}

/**
 *
 * @param newNode
 * @param referenceNode
 */
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 *
 * @param input
 * @param text
 */
function addAlert(input, text) {
    let alert = input.nextSibling;

    if (alert != null && !alert.classList.contains('wpcf7-not-valid-tip')) {
        addAlert(alert, text);
    }

    if (alert == null) {
        alert = document.createElement('SPAN');
        alert.classList.add('wpcf7-not-valid-tip');
        alert.setAttribute('role', 'alert');
        insertAfter(alert, input);
    }

    alert.innerHTML = text;
}

/**
 *
 * @param input
 */
function removeAlert(input) {
    let alert = input.nextSibling;

    if (alert != null) {
        if (!alert.classList.contains('wpcf7-not-valid-tip')) {
            removeAlert(alert)
        } else {
            alert.parentNode.removeChild(alert);
        }
    }
}

function validateName(element) {
    element.classList.remove('wpcf7-not-valid');
    removeAlert(element);

    if (!/^[a-zA-ZäöüßÄÖÜæøåÆØÅ\-\`\"\s\\\']*$/.test(element.value)) {
        element.classList.add('wpcf7-not-valid');

        addAlert(element, 'Must be a valid name');
    } else if (element.value.length > 50) {
        element.classList.add('wpcf7-not-valid');

        addAlert(element, 'This field is too long');
    } else if (/(.)\1{2}/.test(element.value.toLowerCase())) {
        element.classList.add('wpcf7-not-valid');

        addAlert(element, 'Must be a valid name');
    } else if (element.value.length === 1) {
        element.classList.add('wpcf7-not-valid');

        addAlert(element, 'The field is too short');
    }
}

async function validateEmail(element, $) {
    const START_FORM_BLOCK = document.querySelector('.js-start-form-block');

    if ( validateField('email', element.value) ) {
        element.classList.remove('wpcf7-not-valid');

        removeAlert(element);
    } else {
        element.classList.add('wpcf7-not-valid');

        if (element.classList.contains('js-email-field')) {
            addAlert(element, 'Must be a valid business e-mail');
        } else {
            addAlert(element, 'Must be a valid e-mail');
        }
    }

    if (element.classList.contains('js-email-field')) {
        const notBusinessClass = 'js-not-business';
        const isBusiness = validateBusinessEmail(element.value);
        const isBusinessName = validateBusinessEmailName(element.value);

        if (element.classList.contains('wpcf7-not-valid')) {
            if (!isBusinessName) {
                element.classList.add(notBusinessClass);
                addAlert(element, 'Must be a personal business e-mail');
            } else if (!isBusiness) {
                element.classList.add(notBusinessClass);
                addAlert(element, 'Must be a valid business e-mail');
            } else if (element.classList.contains(notBusinessClass)) {
                element.classList.remove(notBusinessClass);
                element.classList.remove('wpcf7-not-valid');
                removeAlert(element);
                element.dispatchEvent(new Event('keyup'));
            }
        } else {
            if (!isBusinessName) {
                element.classList.add(notBusinessClass);
                addAlert(element, 'Must be a personal business e-mail');
            } else if (!isBusiness) {
                element.classList.add('wpcf7-not-valid');
                element.classList.add(notBusinessClass);
                addAlert(element, 'Must be a valid business e-mail');
            } else {
                element.classList.remove(notBusinessClass);
                element.classList.remove('wpcf7-not-valid');
                removeAlert(element);
            }
        }

        if (!element.classList.contains('wpcf7-not-valid')) {
            await isEmailDomainValid(element.value, $).then(function(data) {
                if (!data.result && element.value == data.email) {
                    element.classList.add('wpcf7-not-valid');
                    addAlert(element, 'Email domain is invalid');
                }

                if (START_FORM_BLOCK && !element.classList.contains('wpcf7-not-valid')) {
                    const form = START_FORM_BLOCK.closest('form');
                    getAC('valid email', form).then().catch(err => {});
                }
            });
        }
    }
}

function isEmailDomainValid(email) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: var_from_php.ajax_url,
            data: {
                'nonce' : var_from_php.nonce,
                'action': 'ajax_email_domain_validation',
                'email' : email,
            },
            success: resolve,
            error: reject,
        });
    });
}

let lastACData = '';

function getAC(step, form) {
    // return new Promise(function(resolve, reject) {
    // 	resolve();
    // });
    const data = $(form).serialize();
    // const agreed = (AGREE_CHECKBOX)? AGREE_CHECKBOX.checked : false;

    if (lastACData === data) {// || !agreed) {
        return new Promise(function(resolve, reject) {
            resolve();
        });
    }

    lastACData = data;
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'post',
            url: var_from_php.ajax_url,
            data: lastACData + `&action=ajax_a_c&step=${step}&nonce=${var_from_php.nonce}`,
            success: resolve,
            error: reject,
        });
    });
}

export function phone() {
    const PHONE_FIELDS    = document.querySelectorAll('.js-phone-field');

    // Validate input phone fields
    ( PHONE_FIELDS ) && [...PHONE_FIELDS].forEach( (item) => {
        item.addEventListener( 'keyup', (event) => {
            if ( validateField('phone', event.target.value) ) {
                item.classList.remove('wpcf7-not-valid');
            } else {
                item.classList.add('wpcf7-not-valid');
            }
        });
    });
}

export function countryPhone($) {
    const START_FORM_BLOCK = document.querySelector('.js-start-form-block');
    const INPUT_PHONE     = document.querySelector('.js-phone-input');
    const INPUT_PHONE_msg = ( INPUT_PHONE )
                              ? INPUT_PHONE.closest('.input-holder')
                                           .querySelector('.validation-input-msg')
                              : null;

    // set coundry Code
    function setCountryCode() {
        if (INPUT_PHONE) {
            itiInitializeCheck(INPUT_PHONE).then((iti) => {
                const countryData = iti.getSelectedCountryData();
                const dialCode = '+' + countryData.dialCode;

                if (countryData.dialCode && INPUT_PHONE.value !== '+') {
                    INPUT_PHONE.value = dialCode;
                    const input = INPUT_PHONE.closest('form').querySelector('[name=country_dial_code]');

                    if (input) {
                        input.value = dialCode;
                    }
                }

            }).catch(console.error);
        }
    }

    if (INPUT_PHONE) {
        window.intlTelInput(INPUT_PHONE, {
            nationalMode: false,
            formatOnDisplay: true,
            utilsScript: var_from_php.theme_path+'/build/js/utils.min.js',
            initialCountry: 'auto',
            geoIpLookup: function(success) {
                $.get('https://ipinfo.io', function() {}, 'jsonp').always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : 'us';
                    success(countryCode);
                });
            },

        } );
    }

    (INPUT_PHONE) && setCountryCode();

    // setCountryCodeByIP
    function itiInitializeCheck(input) {
        return new Promise((resolve, reject) => {
            let i = 0;

            if (input) {
                // set interval needed after intl plugin initialization hack
                // 4ms, it should start pretty fast after calling
                // should work once per call
                const intervalId = setInterval(() => {
                    const iti = window.intlTelInputGlobals.getInstance(INPUT_PHONE);

                    if (iti) {
                        clearInterval(intervalId);

                        resolve(iti)
                    }

                    if (i++ >= 1000) {
                        clearInterval(intervalId);

                        reject('iti INPUT_PHONE instance not found');
                    }
                }, 4);
            } else {
                reject('INPUT_PHONE not found');
            }
        });
    }

    // Handler for valid/invalid states
    const resetPhoneMessages = function() {
        INPUT_PHONE_msg.innerHTML = '';
        INPUT_PHONE_msg.classList.add('hide');
        INPUT_PHONE_msg.classList.remove('success');
    };

    // on blur: validate
    (INPUT_PHONE) && INPUT_PHONE.addEventListener('input', function(event) {
        resetPhoneMessages();

        let input_value = INPUT_PHONE.value;

        const submitBtn = INPUT_PHONE.closest('.wpcf7-form').querySelector('input[type="submit"]');

        const required = INPUT_PHONE.getAttribute('aria-required');

        const iti = window.intlTelInputGlobals.getInstance(INPUT_PHONE);

        if ( input_value ) {
            // fix bug with number erasing after autocomplite fill
            setTimeout(()=> {
                
                iti.setNumber(input_value); // formating
            }, 40);

            const notValidTip_message = INPUT_PHONE.closest('.country_phone')
                                                  .querySelector('.wpcf7-not-valid-tip');

            (notValidTip_message) && notValidTip_message.remove();

            const isValid = () => {
                return (document.readyState === 'complete' && iti.isValidNumber()) // works only when complite looks like iti bug
                || ((!required || required  == 'false') && input_value.length <= 4 && /^[+\-*#()0-9 ]*$/.test(input_value) // only countrycode case
                // like old validation before page state is complite
                || (document.readyState !== 'complete' 
                    && /^[+\-*#()0-9 ]*$/ig.test(input_value) 
                    && input_value.replace(/[\D]*/ig, '').length >= 8 
                    && input_value.replace(/[\D]*/ig, '').length <= 13
                ));
            }


            if (INPUT_PHONE_msg) {
                if ( isValid() ) {
                    INPUT_PHONE_msg.classList.remove('hide');
                    INPUT_PHONE_msg.classList.add('success');
                    submitBtn.classList.remove('disabled');
                    INPUT_PHONE.classList.remove('wpcf7-not-valid');
                } else {
                    INPUT_PHONE_msg.innerHTML = 'Must be a valid phone number';
                    INPUT_PHONE_msg.classList.remove('hide', 'success');
                    submitBtn.classList.add('disabled');
                    INPUT_PHONE.classList.add('wpcf7-not-valid');

                    // remove server-side msg
                    let alert = INPUT_PHONE.parentNode.nextSibling;
                    if (alert != null) {
                        alert.parentNode.removeChild(alert);
                    }
                }
            }
        
        } else if (required && required == 'true') {
            removeAlert(INPUT_PHONE);
            INPUT_PHONE_msg.innerHTML = 'Please add phone number';
            INPUT_PHONE_msg.classList.remove('hide', 'success');
            submitBtn.classList.add('disabled');
            INPUT_PHONE.classList.add('wpcf7-not-valid');
        } else {
            INPUT_PHONE.classList.remove('wpcf7-not-valid');
        }

        if (START_FORM_BLOCK && INPUT_PHONE_msg.classList.contains('success')) {
            const form = START_FORM_BLOCK.closest('form');
            getAC('valid phone', form).then().catch(err => {});
        }
    });

    // on country change
    (INPUT_PHONE) && INPUT_PHONE.addEventListener('countrychange', setCountryCode);
}

export function datepicker() {
    // .form-date - selector for datepicker field
    // show datepicker only from today for start project form
    // feature/4ejhct feature/4ygpc4
    if (document.querySelector('.js-start-form-block') &&
        jQuery &&
        jQuery.datepicker &&
        jQuery.datepicker._defaults
    ) {
        jQuery.datepicker._defaults.minDate = 0;

        if (jQuery.datepicker && !jQuery.datepicker.initialized) {
            $('.form-date').each(function(){
                $( this ).datepicker( {
                    dateFormat: 'yy-mm-dd',
                    minDate: new Date( $( this ).attr( 'min' ) ),
                    maxDate: new Date( $( this ).attr( 'max' ) ),
                } );
            });
        }
    }
}

export function name() {
    const NAME_FIELDS    = document.querySelectorAll('.js-name-field');

    ( NAME_FIELDS ) && [...NAME_FIELDS].forEach( (item) => {
        item.addEventListener( 'keyup', (event) => {
            validateName(event.target);
        });
    });
}

export function startProject($) {
    // start your project
    const START_FORM_BLOCK = document.querySelector('.js-start-form-block');

    if (START_FORM_BLOCK) {
        const progressLine = START_FORM_BLOCK.querySelector('.progress-bar-line');
        const progress = START_FORM_BLOCK.querySelectorAll('.progress');
        const steps = START_FORM_BLOCK.querySelectorAll('.js-step, .js-step-back');
        const groups = START_FORM_BLOCK.querySelectorAll('.wrap-group');
        const email = START_FORM_BLOCK.querySelector('.js-email-field');
        const phone = START_FORM_BLOCK.querySelector('.js-phone-input');
        const firstName = START_FORM_BLOCK.querySelector('.js-name-field[name=first_name]');
        const lastName = START_FORM_BLOCK.querySelector('.js-name-field[name=last_name]');
        const required = [...START_FORM_BLOCK.querySelectorAll('input')].filter(el => {
            return el.getAttribute('aria-required') === 'true';
        });
        let currentStep = 0;

        // (AGREE_CHECKBOX) && AGREE_CHECKBOX.addEventListener('change', () => {
        // 	const form = START_FORM_BLOCK.closest('form');
        // 	getAC('agreed checkbox', form).then().catch(err => {});
        // });

        async function validationRequired(target) {
            let allFilled = true;

            [...required].forEach((input) => {
                let alert = input.nextSibling;
                if (input.value === '') {
                    input.classList.add('wpcf7-not-valid');

                    addAlert(input, 'This field is required.');

                    allFilled = false;
                } else {
                    input.classList.remove('wpcf7-not-valid');
                    removeAlert(input);
                }
            });

            // validate phone
            phone.dispatchEvent((new Event('input')));

            if (email.value !== '') {
                await validateEmail(email);
            }

            // TODO: change start project validation logic
            if (firstName.value !== '') {
                validateName(firstName);
            }

            if (lastName.value !== '') {
                validateName(lastName);
            }

            if (!allFilled ||
                email.classList.contains('wpcf7-not-valid') ||
                phone.classList.contains('wpcf7-not-valid') ||
                firstName.classList.contains('wpcf7-not-valid') ||
                lastName.classList.contains('wpcf7-not-valid')
            ) {
                return false;
            }

            return true;
        }

        function fillPreview() {
            const budgetInput = START_FORM_BLOCK.querySelector('.checkbox-159 input:checked');
            const budget = (budgetInput)? budgetInput.value : '';
            document.querySelector('.js-preview-budget').innerHTML = (budget)? budget : '';

            const parsingPlaces = START_FORM_BLOCK.querySelectorAll('[data-name]');
            [...parsingPlaces].forEach((el) => {
                const name = el.getAttribute('data-name');
                const input = START_FORM_BLOCK.querySelector(`[name=${name}]`);
                const value = (input)? input.value : '';
                el.innerHTML = (value)? value : '';
            });

            const files = START_FORM_BLOCK.querySelectorAll('input[type=file]');
            let filesHTML = '';
            [...files].forEach(el => {
                if (el.value) {
                    filesHTML += `<p class="field-file">${el.value.replace(/^.*[\\\/]/, '')}</p>`;
                }
            });
            if (filesHTML) {
                START_FORM_BLOCK.querySelector('.field-files').innerHTML = filesHTML;
            }
        }

        function validationFiles(target) {
            const files = START_FORM_BLOCK.querySelectorAll('input[type=file]');
            let valid = true;

            [...files].forEach((file) => {
                removeAlert(file);

                if (file && file.files && file.files[0]) {
                    if(file.files[0].size > 2097152) {
                        valid = false;
                        addAlert(file, 'The file is too big.');
                    }
                }
            });

            return valid;
        }

        async function step(event) {
            event.preventDefault();
            const id = parseInt(event.target.getAttribute('href').replace('#', '')) - 1;
            let valid = true;

            const form = START_FORM_BLOCK.closest('form');
            getAC(currentStep + 1, form).then().catch(err => {});

            if (event.target.classList.contains('js-step-back') && currentStep < id) {
                // ignore step forward
                return false;
            }

            if (id === 3) {
                fillPreview();
            }

            if (event.target.classList.contains('js-validation')) {
                if (id === 3) {
                    const output = START_FORM_BLOCK.closest('form').querySelector('.wpcf7-response-output');
                    valid = await validationRequired(event.target);
                    if (valid && output) {
                        // hide error message
                        output.setAttribute('style','');
                    }
                } else if (id === 2) {
                    valid = validationFiles(event.target);
                }
            }

            if (valid) {

                [...groups].forEach((group) => {
                    group.classList.remove('active');
                });

                groups[id].classList.add('active');

                if (id === 0) {
                    progressLine.style.width = '0';
                } else if (id === 1) {
                    progressLine.style.width = '33.33%';
                } else if (id === 2) {
                    progressLine.style.width = '66.67%';
                } else if (id === 3) {
                    progressLine.style.width = '100%';
                }

                function clean(element, time = 0) {
                    setTimeout(() => {
                        element.classList.remove('ready');
                        element.classList.remove('active');
                    }, time);
                }

                [...progress].forEach((line, index) => {
                    if (index < id) {
                        line.classList.remove('active');
                        line.classList.add('ready');
                    } else if (index === id) {
                        setTimeout(() => {
                            if (currentStep <= id) {
                                line.classList.remove('ready');
                                line.classList.add('active');
                            }
                        }, 1000);
                    } else {
                        if (currentStep - id <= 1) {
                            clean(line);
                        } else if (currentStep - id === 2) {
                            if (index === 3) {
                                clean(line);
                            } else if (index === 2 && id === 1) {
                                clean(line, 500);
                            } else if (index === 2 && id === 0) {
                                clean(line);
                            } else if (index === 1) {
                                clean(line, 500);
                            }
                        } else if (currentStep - id === 3) {
                            if (index === 3) {
                                clean(line);
                            } else if (index === 2) {
                                clean(line, 333);
                            } else if (index === 1) {
                                clean(line, 667);
                            }
                        }
                    }
                });

                currentStep = id;
            }
        }

        [...steps].forEach((el) => {
            el.addEventListener('click', step, false );
        });

        // Catch Invalid form submit event
        document.addEventListener( 'wpcf7invalid', function( event ) {
            const groups = START_FORM_BLOCK.querySelectorAll('.wrap-group');
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].querySelectorAll('.wpcf7-not-valid').length > 0) {
                    const el = START_FORM_BLOCK.querySelector(`.progress .js-step-back[href="#${i+1}"]`);
                    el.dispatchEvent(new Event('click'));
                    break;
                }
            }
        }, false );
    }
    
    // Get user location and put in new Estimate form
    // if ( [...BODY.classList].includes('page-template-page-get-a-quote') ) {
    //
    // 	const USER_LOCATION_FIELD = document.querySelector('.js-user-location');
    // 	const USER_LOCATION_LINK_FIELD = document.querySelector('.js-user-location-link');
    //
    // 	if ( USER_LOCATION_FIELD && navigator.geolocation ) {
    // 		navigator.geolocation.getCurrentPosition( (position) => {
    // 			const query = `${position.coords.latitude},${position.coords.longitude}`;
    // 			USER_LOCATION_FIELD.value = `Latitude : ${position.coords.latitude} Longitude: ${position.coords.longitude}`;
    // 			USER_LOCATION_LINK_FIELD.value = query;
    // 		});
    //
    // 	}
    //
    // }
}

export function email($) {
    const EMAIL_FIELDS    = document.querySelectorAll('.js-email-field');

    ( EMAIL_FIELDS ) && [...EMAIL_FIELDS].forEach( (item) => {
        item.addEventListener( 'keyup', (event) => {
            validateEmail(event.target, $);
        });
    });
}

export function file() {
    const WPCF7_FILE_FIELDS = document.querySelectorAll( '.wpcf7-file' );

    // Animate choosing file in input type "file"
    ( WPCF7_FILE_FIELDS ) && [...WPCF7_FILE_FIELDS].forEach( (item) => {
        item.addEventListener('change', (event) => {
            const FILE_INPUT_WRAPPER = event.target.closest('.wrap-file');
            const FORM_CONTROL_WRAP = event.target.closest('.wpcf7-form-control-wrap');
            const LABEL = FILE_INPUT_WRAPPER.querySelector('.label2');
            let label_text = LABEL.dataset.label;

            if (!label_text) {
                label_text = LABEL.dataset.label = LABEL.innerHTML;
            }

            if ( event.target.value ) {
                FILE_INPUT_WRAPPER.classList.add('file-selected');
                const RESET_BTN = document.createElement('button');
                RESET_BTN.classList.add('js-reset-selected-file', 'reset-selected-file');
                FORM_CONTROL_WRAP.appendChild(RESET_BTN);
                const FILENAME = event.target.value.replace(/^.*[\\\/]/, '');
                LABEL.innerHTML = truncate(FILENAME, 10);
            } else {
                FILE_INPUT_WRAPPER.classList.remove('file-selected');
                FORM_CONTROL_WRAP.querySelector('.js-reset-selected-file').remove();
            }
        });
    });


    // Remove selected file form input
    [...document.querySelectorAll('.wrap-file')].forEach( item => {
        item.addEventListener('click', (event) => {
            if ( [...event.target.classList].includes('js-reset-selected-file') ) {
                event.preventDefault();
                const FILE_INPUT_WRAPPER = event.target.closest('.wrap-file');
                const FORM_CONTROL_WRAP  = event.target.closest('.wpcf7-form-control-wrap');
                const LABEL = FILE_INPUT_WRAPPER.querySelector('.label2');
                let label_text = LABEL.dataset.label || 'File';

                FORM_CONTROL_WRAP.querySelector('.wpcf7-file').value = '';
                FILE_INPUT_WRAPPER.classList.remove('file-selected');
                event.target.remove();
                LABEL.innerHTML = label_text;
            }
        });
    });
}

export function wpcf7Listeners() {
    // document.addEventListener( 'wpcf7submit', function( event, sec, three ) {
    //     [...event.target.querySelectorAll('.validation-input-msg')].forEach( (item) => {
    //         item.innerHTML = '';
    //     });
    // }, false );

    // Catch Successful form submit event and open Thanks popup
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        const FORM_ELEMENT = event.target.querySelector('form');

        if ( [...FORM_ELEMENT.classList].includes('cv-popup-form') ) {
            popup_windows.openOnePopup('#thanks-cv-popup', 1000);
        }

        if ( 'vacancy-apply-form' === FORM_ELEMENT.getAttribute('id') ) {
            popup_windows.openOnePopup('#apply-now-success-popup', 300);

            [...FORM_ELEMENT.querySelectorAll('.wrap-file')].forEach( item => {
                item.classList.remove('file-selected');
            });
        }

        if ( 'estimate-form' === FORM_ELEMENT.getAttribute('id') ) {
            const email = document.querySelector('.wpcf7 [name=email-8]').value;
            const first_name = document.querySelector('.wpcf7 [name=first_name]').value;
            const last_name = document.querySelector('.wpcf7 [name=last_name]').value;
            const full_name = first_name+' '+last_name;
            // TODO: move this link to theme settings
            const start_project_link = '/booking-calendar';
            // save data to cookie
            createCookie('start_project_full_name', full_name);
            createCookie('start_project_email', email);

            window.location.href = start_project_link;
        }

        if ( [...FORM_ELEMENT.classList].includes('report-form') ) {
            const id = document.querySelector('form').id;
            const link = (id)? `/${id}/`: '/booking-calendar/';

            window.location.href = link;
        }
    }, false );
}

function createCookie(name,value,days) {
    let expires = '';

    if (days) {
        const date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = `; expires="${date.toGMTString()}`;
    }

    document.cookie = name+'='+value+expires+'; path=/';
}

export function findJobForm() {
    const FIND_JOB_FORM     = document.querySelector( '.find-job-form' );

    if (FIND_JOB_FORM) {
        const FIND_JOB_FORM_WPCF7 = document.querySelector( '.find-job-form' ).closest('.wpcf7');

        const CANT         = document.querySelector( '.cant-find-job-figure' );
        const THANKS       = document.querySelector( '.thanks-find-job-figure' );
        const FORM_BLOCK   = document.querySelector( '.find-job-form-block' );
        const THANKS_BLOCK = document.querySelector( '.find-job-thanks-block' );

        FIND_JOB_FORM_WPCF7.addEventListener( 'wpcf7mailsent', function( event ) {
            CANT.classList.add('hide');
            THANKS.classList.add('show');
            FORM_BLOCK.classList.add('hide');
            THANKS_BLOCK.classList.add('show');
        }, false );
    }
}

export function autofill() {
    const POST_TITLE_HIDDEN_INPUT    = document.querySelector('.js-post-title');
    const VACANCY_ID                 = document.querySelector('.js-vacancy-id');
    const CV_POSITIONS               = document.querySelectorAll('.js-cv-position');

    // add vacancy name to hidden inout in Apply form
    if ( POST_TITLE_HIDDEN_INPUT ) {
        POST_TITLE_HIDDEN_INPUT.value = document.querySelector('#heading-block.vacancy-heading h1').innerText+' vacancy';
    }

    if ( VACANCY_ID && document.querySelector('#heading-block.vacancy-heading .id')) {
        VACANCY_ID.value = document.querySelector('#heading-block.vacancy-heading .id').innerText.replace('#', '');
    }

    if (CV_POSITIONS) {
        [...CV_POSITIONS].forEach((cv_position) => {
            const cv_id = cv_position.closest('.popup').id;
            const button = document.querySelector(`[data-href="#${cv_id}"]`);
            const position = button.closest('.box').querySelector('.caption').innerText;
            cv_position.value = position;
        });
    }
}
