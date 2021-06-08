/**
 * Fade Out method
 * @param el
 */
export function fadeOut(el){
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = 'none';
		} else {
			requestAnimationFrame(fade);
		}
	})();
}



/**
 * Fade In method
 * @param el
 * @param display
 */
export function fadeIn(el, display){
	if (el) {
		el.style.opacity = 0;
		el.style.display = display || 'block';
	
		(function fade() {
			let val = parseFloat(el.style.opacity);
			if (!((val += .1) > 1)) {
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}
}



/**
 *  Set equal height to selected elements calculated as bigger height
 * @param elementsSelector    - selector for searching elements
 * @returns elementsSelector
 */
export function equalHeights(elementsSelector) {

	let heights = [];
	let elementsSelectorArr = ( Array.isArray(elementsSelector) )
									? elementsSelector
									: [...document.querySelectorAll(elementsSelector)];

	elementsSelectorArr.forEach( (item) => {
		heights.push( item.offsetHeight );
	});

	let maxHeight = Math.max.apply(0, heights);

	elementsSelectorArr.forEach( (item) => {
		item.style.height = maxHeight+'px';
	});

	return elementsSelector;

}


/**
 * Set equal height to selected elements in row calculated as bigger height
 * @param elementsSelector - selector for searching elements
 * @param numItem_inrow    - Items amount that will be used for each equal height iteration
 * @returns elementsSelector
 */
export function equalHeights_inrow(elementsSelector, numItem_inrow) {

	const ELEMENTS_ARR = [...document.querySelectorAll(elementsSelector)];
	const EL_LENGTH    = ELEMENTS_ARR.length;

	for (let i = 0; i <= EL_LENGTH / numItem_inrow; i++) {
		let temp = ELEMENTS_ARR.slice(i * numItem_inrow, i * numItem_inrow + numItem_inrow);
		equalHeights(temp);
	}

	return elementsSelector;
}


/**
 * Get cookie value by it's name
 * @param cookieName
 * @returns {*}
 */
export function getCookieByName(cookieName) {
	let name          = cookieName + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca            = decodedCookie.split(';');

	for ( let i = 0; i <ca.length; i++ ) {
		let c = ca[i];

		while ( c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if ( c.indexOf(name) === 0 ) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}



/**
 * Trim all paragraph from unneeded space symbol
 */
export function trimParagraph(){
	[...document.querySelectorAll('p')].forEach( item => {
		item.innerHTML = item.innerHTML.trim();
	});
}


/**
 * Check if element in viewport
 * @param el
 * @param offset - Adjustable offset value when element becomes visible
 * @returns {boolean}
 */
export function isInViewport(el, offset = 100) {

	if ( !el ) return false;

	const scroll    = window.scrollY || window.pageYOffset;
	const boundsTop = el.getBoundingClientRect().top + offset + scroll;

	const viewport = {
		top   : scroll,
		bottom: scroll + window.innerHeight,
	};

	const bounds = {
		top   : boundsTop,
		bottom: boundsTop + el.clientHeight,
	};

	return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
		|| ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );

}


/**
 * Check if element in viewport
 * @param el
 * @param offset - Adjustable offset value when element becomes visible
 * @returns {boolean}
 */
export function isActive(el, offset = 100) {

	if ( !el ) return false;

	const scroll    = window.scrollY || window.pageYOffset;
	const boundsTop = el.getBoundingClientRect().top + offset + scroll;

	const viewport = {
		top   : scroll,
		bottom: scroll + window.innerHeight,
	};

	const bounds = {
		top   : boundsTop,
		bottom: boundsTop + el.clientHeight,
	};

	return (bounds.top <= viewport.top && bounds.bottom >= viewport.top);

}

/**
 * Check if element has reached top of page and make element fixed
 * @param el           - parent which contain future fixed element
 * @param innerElement - child which should be fixed
 * @param offset       - Adjustable offset value when element becomes visible
 * @returns {boolean}
 */
export function isBoxReachedTopOfPage(el, innerElement, offset = 0) {

	if ( !el ) return false;

	const scroll                = window.scrollY || window.pageYOffset;
	const INITIAL_BOTTOM_OFFSET = innerElement.clientHeight + el.getBoundingClientRect().top + 2*offset + scroll;
	innerElement.dataset.bottom_offset = INITIAL_BOTTOM_OFFSET;

	const bounds = {
		top   : el.getBoundingClientRect().top + offset + scroll,
		bottom: ( innerElement.dataset.bottom_offset )
					? innerElement.dataset.bottom_offset
					: INITIAL_BOTTOM_OFFSET,
		left  : el.getBoundingClientRect().left,
	};

	if ( scroll >= bounds.top ) {
		innerElement.style.left = `${innerElement.dataset.left}px`;
		el.classList.add('fixed');

		if ( scroll >= bounds.bottom ) {
			el.classList.add('fixed-to-bottom');
		} else {
			el.classList.remove('fixed-to-bottom');
		}

		return true;
	} else {
		innerElement.dataset.left = bounds.left;
		el.classList.remove('fixed');
		return false;
	}
}



/**
 * Lazy load init
 */
export function lazyLoadInit(selector){
	return new LazyLoad({
		elements_selector: selector,
		// ... more custom settings?
	});
}



/**
 * Check type of page section and add according class to header and page section navigation
 * @param pageSection  DOM element - section that need test
 * @param headerEl     DOM element - header element
 * @param pageScreenNavigation DOM element
 */
export function checkPageSection(pageSection, headerEl, pageScreenNavigation) {

	// Fix to define home section
 	if ( pageSection.getAttribute('id') === 'home' ) {
	    (pageScreenNavigation) && pageScreenNavigation.classList.add('home-box');
    } else {
	    (pageScreenNavigation) && pageScreenNavigation.classList.remove('home-box');
    }


	if ( (pageSection) && [...pageSection.classList].includes('light-box') ) {
		//(headerEl) && headerEl.classList.add('light-layout');
		(pageScreenNavigation) && pageScreenNavigation.classList.add('light-layout');
	} else {
		//(headerEl) && headerEl.classList.remove('light-layout');
		(pageScreenNavigation) && pageScreenNavigation.classList.remove('light-layout');
	}
}




/**
 * Debounce function
 * @param fn     - function that should be executed
 * @param time   - time delay
 * @returns {Function}
 */
export const debounce = (fn, time) => {
	let timeout;

	return function() {
		const functionCall = () => fn.apply(this, arguments);

		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	}
};


/**
 * Copy to clipboard
 * @param element -  element that  contain value to copy
 */
export const copyToClipboard = (parent,  element) => {
	const el = document.createElement('textarea');
	el.value = element.value;
	document.body.appendChild(el);
	el.select();

	try {
		const successful = document.execCommand('copy');

		if ( successful ) {
			parent.classList.add('copied');

			setTimeout( () => {
				parent.classList.remove('copied');
			}, 3000 );
		}
	} catch(err) {
		console.log('Oops, unable to copy');
	}

	document.body.removeChild(el);
};


/**
 * Test value with regex
 * @param {(name|email|phone|postal)} fieldType  - The allowed type of the fields
 * @param value
 * @return {boolean}
 */
export const validateField = (fieldType = null, value = null) => {

	if ( !fieldType || !value ) return false;

	const phoneREGEX  = /^[0-9\+]{6,13}$/;
	const nameREGEX   = /^[a-zA-Zа-яА-Я\s]+$/;
	const postalREGEX = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
	const emailREGEX  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,99})+$/;


	let checkResult   = false;

	switch (fieldType) {
		case 'name':
			checkResult = nameREGEX.test(value);
			break;
		case 'phone':
			checkResult = phoneREGEX.test(value);
			break;
		case 'postal':
			checkResult = postalREGEX.test(value);
			break;
		case 'email':
			checkResult = emailREGEX.test(value);
			break;
	}

	return checkResult;

};

/**
 * Test email by domains
 * @param value
 * @return {boolean}
 */
export const validateBusinessEmail = (value = null) => {

	if ( !value ) return false;

	const restrictedEmails = [
		'@live.',
		'@ymail.',
		'@gmail.',
		'@zoho.',
		'@hotmail.',
		'@protonmail.',
		'@outlook.',
		'@tutanota.',
		'@yahoo.',
		'@aol.',
		'@yandex.',
		'@mail.',
		'@email.',
		'@icloud.',
		'@test.',
	];

	let domain = value.substr(value.indexOf('@'));
	domain = domain.substr(0, domain.indexOf('.') + 1).toLowerCase();

	if (restrictedEmails.indexOf(domain) !== -1) {
		return false;
	}

	return true;
};

/**
 * Test email by domains
 * @param value
 * @return {boolean}
 */
export const validateBusinessEmailName = (value = null) => {

	if ( !value ) return false;

	const restrictedNames = [
		'hi',
		'hello',
		'sales',
		'info',
		'marketing',
		'contact',
		'contacts',
		'support',
		'admin',
	];

	const name = value.substr(0, value.indexOf('@')).toLowerCase();
	const domainPart = value.substr(value.indexOf('@'));

	if (restrictedNames.indexOf(name) !== -1) {
		return false;
	}

	if (domainPart.includes('.edu')) {
		return false;
	}

	return true;
};

/**
 * Polyfill for closest method
 */
export function closest_polyfill() {
	if (window.Element && !Element.prototype.closest) {
		Element.prototype.closest =
			function(s) {
				let matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i,
					el = this;
				do {
					i = matches.length;
					while (--i >= 0 && matches.item(i) !== el) {}
				} while ((i < 0) && (el = el.parentElement));
				return el;
			};
	}
}
