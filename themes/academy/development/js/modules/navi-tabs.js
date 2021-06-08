/**
 * Tabs Navigation functionality
 * @param tabSwitchSelectors  -  css selectors
 * @param tabPanelSelectors   -  css selectors
 */
export function tabsNavigation( tabSwitchSelectors, tabPanelSelectors ) {

	[...document.querySelectorAll(tabSwitchSelectors)].forEach( (item) => {

		item.addEventListener('click', (event) => {

			const TAB_ID = ( event.target.nodeName === 'A' )
								? event.target.getAttribute('href')
								: event.target.dataset.href;

			// Remove active state from all switch elements
			[...document.querySelectorAll(tabSwitchSelectors)]
					.forEach( el => el.classList.remove('active') );

			// Remove active state from all tabs panels
			[...document.querySelectorAll(tabPanelSelectors)]
					.forEach( el => el.classList.remove('active') );


			// Set active state to current
			event.target.classList.add('active');
			document.querySelector(TAB_ID).classList.add('active');


			// force trigger resize event for the document
			if (document.createEvent) {
				window.dispatchEvent( new Event('resize') );
			}else{
				document.body.fireEvent('onresize');
			}

		});

	});


}