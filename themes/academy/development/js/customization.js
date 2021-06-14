import {
	menuClassHandle,
	burger,
	inViewportChecking,
	scrollToURLHash,
	clickOnHash,
	initPopups,
	cookieReminderInit,
	parallax,
} from './components/general.js';

import {
	ticksListAccordion,
	termsPageNavigation,
} from './components/sections.js';

(function($){

	$(function() {
		menuClassHandle();
		burger();
		inViewportChecking($);
		ticksListAccordion($);
		scrollToURLHash($);
		clickOnHash($);
		initPopups();
		termsPageNavigation($);
		cookieReminderInit();
		parallax($);
	});

})(jQuery);
