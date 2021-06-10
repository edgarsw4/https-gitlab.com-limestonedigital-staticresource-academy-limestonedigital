import {
	menuClassHandle,
	burger,
	inViewportChecking,
} from './components/general.js';

import {
	ticksListAccordion,
} from './components/sections.js';

(function($){

	$(function() {
		menuClassHandle();
		burger();
		inViewportChecking($);
		ticksListAccordion($);
	});

})(jQuery);
