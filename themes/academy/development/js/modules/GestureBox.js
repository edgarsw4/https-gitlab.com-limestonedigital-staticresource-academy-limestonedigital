export default class GestureBox {

	constructor(gestureZoneSelector = null,
	            leftSwipeHandler    = null,
	            rightSwipeHandler   = null,
	            topSwipeHandler     = null,
	            bottomSwipeHandler  = null,
	            tapHandler          = null,
	            horizontalLimit     = 90,
	            verticalLimit       = 90,
	) {
		this.pageWidth          = window.innerWidth || document.body.clientWidth;
		this.treshold           = Math.max( 1, Math.floor(0.01 * (this.pageWidth)) );
		this.touchstartX        = 0;
		this.touchstartY        = 0;
		this.touchendX          = 0;
		this.touchendY          = 0;

		this.horizontalLimit    = horizontalLimit;
		this.verticalLimit      = verticalLimit;

		this.leftSwipeHandler   = leftSwipeHandler;
		this.rightSwipeHandler  = rightSwipeHandler;
		this.topSwipeHandler    = topSwipeHandler;
		this.bottomSwipeHandler = bottomSwipeHandler;
		this.tapHandler         = tapHandler;
		this.gestureZone        = ( gestureZoneSelector instanceof Element )
										? gestureZoneSelector
										: document.querySelector(gestureZoneSelector);
	}


	touchStartHandler() {
		this.gestureZone.addEventListener('touchstart', (event) => {
				this.touchstartX = event.changedTouches[0].screenX;
				this.touchstartY = event.changedTouches[0].screenY;
			},
			false
		);
	}


	touchEndHandler() {
		this.gestureZone.addEventListener('touchend', (event) => {
				this.touchendX = event.changedTouches[0].screenX;
				this.touchendY = event.changedTouches[0].screenY;

				this.handleGesture(event);
			},
			false
		);
	}



	/**
	 *  Define swipe direction
	 */
	handleGesture() {
		let x  = this.touchendX - this.touchstartX;
		let y  = this.touchendY - this.touchstartY;

		if ( Math.abs(x) > this.treshold || Math.abs(y) > this.treshold ) {

			if ( Math.abs(x) >= this.horizontalLimit ) {

				if (x < 0 && typeof this.leftSwipeHandler === 'function') {
					this.leftSwipeHandler();
				} else if ( typeof this.rightSwipeHandler === 'function' ) {
					this.rightSwipeHandler();
				}

			}

			if ( Math.abs(y) <= this.horizontalLimit ) {

				if (y < 0 && typeof this.topSwipeHandler === 'function') {
					this.topSwipeHandler();
				} else if ( typeof this.bottomSwipeHandler === 'function' ) {
					this.bottomSwipeHandler();
				}

			}

		} else if ( typeof this.tapHandler === 'function' ) {

			this.tapHandler();

		}
	}

	init() {
		this.touchStartHandler();
		this.touchEndHandler();
	}

}