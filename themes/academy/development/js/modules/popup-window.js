import {fadeIn, fadeOut} from './helpers';

function hasSomeParentTheClass(element, classname) {
	if (element.classList && [...element.classList].includes(classname)) return element;
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

export default class Popup {
	constructor() {
		this.body = document.querySelector('body');
		this.html = document.querySelector('html');
	}



	/**
	 * Force Close All opened popup window
	 * and clear the traces of an opened popup window
	 */
	forceCloseAllPopup() {
		[...document.querySelectorAll('.popup')].forEach( (item) => {
			fadeOut( item );

			const MAIL_SENT_OK_BOX = item.querySelector('.wpcf7-mail-sent-ok');
			if ( MAIL_SENT_OK_BOX ) {
				MAIL_SENT_OK_BOX.style.display = 'none';
			}

		});

		this.body.classList.remove('popup-opened');
		this.html.classList.remove('popup-opened');
	}



	/**
	 * Open selected popup window
	 * @param popupSelector - css selector of popup that should be opened
	 * @param timeOut - ms
	 */
	openOnePopup(popupSelector = null, timeOut = 1000) {
		this.forceCloseAllPopup();

		setTimeout( () => {
			this.body.classList.add('popup-opened');
			this.html.classList.add('popup-opened');

			fadeIn(document.querySelector(popupSelector));
		}, timeOut);
	}



	/**
	 * Opening popup window
	 */
	openPopup() {

		this.body.addEventListener('click', (event) => {

			const el_with_class = hasSomeParentTheClass(event.target, 'js-open-popup-activator');

			if (!el_with_class) {
				return false;
			}

			event.preventDefault();

			let el_href = ( el_with_class.nodeName === 'A' )
								? el_with_class.getAttribute('href')
								: el_with_class.dataset.href;

			const POPUP_ELEMENT    = document.querySelector(el_href);
			//const POPUP_FORM_INPUT = POPUP_ELEMENT.querySelector('form input[type="text"]');

			this.body.classList.add('popup-opened');
			this.html.classList.add('popup-opened');

			fadeIn( POPUP_ELEMENT );

			//POPUP_FORM_INPUT && POPUP_FORM_INPUT.focus();
		});

	}



	/**
	 * Closing popup window
	 */
	closePopup() {
		this.body.addEventListener('click', (event) => {

			// Check if user click on close element
			if ( ![...event.target.classList].includes('js-popup-close') ) {
				return false;
			}

			event.preventDefault();
			this.forceCloseAllPopup();

		});


		// Checking ESC button for closing opened popup window
		document.addEventListener('keydown', (event) => {
			if( event.keyCode === 27 ) {
				this.forceCloseAllPopup();
			}
		});

	}


	init() {
		this.openPopup();
		this.closePopup();
	}
}
