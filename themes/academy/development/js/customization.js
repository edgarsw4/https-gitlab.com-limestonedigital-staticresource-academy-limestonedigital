import {
	menuClassHandle,
	burger,
	inViewportChecking,
	scrollToURLHash,
	clickOnHash,
	initPopups,
	cookieReminderInit,
	parallax,
	ideaAnimations,
	inputTel,
	wpcf7Listeners,
} from './components/general.js';

import {
	ticksListAccordion,
	termsPageNavigation,
} from './components/sections.js';

(function($){

	$(function() {
		menuClassHandle();
		burger($);
		inViewportChecking($);
		ticksListAccordion($);
		scrollToURLHash($);
		clickOnHash($);
		initPopups();
		termsPageNavigation($);
		cookieReminderInit();
		parallax($);
		ideaAnimations($);
		inputTel($);
		wpcf7Listeners($);
	});

})(jQuery);
