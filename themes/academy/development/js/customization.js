// import smoothscroll from 'smoothscroll-polyfill'; // TODO: check, looks like unused now
// import {
// 		closest_polyfill,
// } from './modules/helpers.js';

// import {cases} from './components/cases.js';
// import {ideaAnimations} from './components/idea.js';
import {
	// setBodyClasses,
	menuClassHandle,
	burger,
	// preloadLazyImages,
	// imagesLoaded,
	// scrollToURLHash,
	// showVideo,
	// initPopups,
	// scrollToButton,
	// scrollToSecondSection,
	// afterloadLoad,
	// fixedMenu,
	// headerMenu,
	inViewportChecking,
	// initCopyToClipboard,
	// reportPopupInit,
	// cookieReminderInit,
	// countdown,
} from './components/general.js';
import {
// 	phone,
// 	countryPhone,
// 	datepicker,
// 	name,
// 	startProject,
// 	email,
// 	file,
// 	wpcf7Listeners,
// 	findJobForm,
// 	autofill,
// } from './components/forms.js';
// import {formAutofill} from './components/form-autofill.js';
// import {
// 	ourCasesHomepage,
// 	termsPageNavigation,
// 	homepageNavigation,
// 	careersTabsInit,
// 	testimonialsInfinityScrollInit,
// 	blogInfinityScrollInit,
	ticksListAccordion,
// 	quizForm,
// 	expertiseHover,
} from './components/sections.js';
// import {carouselsInit} from './components/carousels.js';

// // Init Closest polyfill method
// closest_polyfill();
// // kick off the polyfill!
// smoothscroll.polyfill();

// // actualy, this should be placed in form
// const autofill_with_google_fields = {
// 	'first_name': 'getGivenName',
// 	'last_name': 'getFamilyName',
// 	'get_report_email': 'getEmail',
// };

(function($){
	//////////////
	// New js part
	//////////////
	$(function() {
		// asap
		// setBodyClasses(md, $); // second call, after document ready
		// imagesLoaded($);
		menuClassHandle();
		burger();
		// datepicker();
		// autofill();
		// formAutofill(autofill_with_google_fields);
		// scrollToURLHash($);
		// scrollToButton($);
		// // modules
		// phone();
		// countryPhone($);
		// name();
		// email($);
		// file();
		// wpcf7Listeners();
		// showVideo($);
		// initPopups();
		// scrollToSecondSection($);
		// afterloadLoad($);
		// fixedMenu();
		// headerMenu();
		inViewportChecking($);
		// initCopyToClipboard();
		// reportPopupInit($);
		// cookieReminderInit($);
		// // pages, sections specific
		// startProject($);
		// findJobForm();
		// cases($);
		// ideaAnimations($);
		// ourCasesHomepage($);
		// termsPageNavigation($);
		// homepageNavigation($);
		// carouselsInit($);
		// careersTabsInit($);
		// testimonialsInfinityScrollInit($);
		// blogInfinityScrollInit($);
		ticksListAccordion($);
		// quizForm($);
		// expertiseHover($);
		// countdown($);

		// preloadLazyImages($, md);
	});

})(jQuery);
