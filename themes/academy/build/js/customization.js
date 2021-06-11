"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(o="Object"===o&&e.constructor?e.constructor.name:o)||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){function n(o,e){o&&(o.style.opacity=0,o.style.display=e||"block",function e(){var t=parseFloat(o.style.opacity);1<(t+=.1)||(o.style.opacity=t,requestAnimationFrame(e))}())}var w,b=function(){function e(){_classCallCheck(this,e),this.body=document.querySelector("body"),this.html=document.querySelector("html")}return _createClass(e,[{key:"forceCloseAllPopup",value:function(){_toConsumableArray(document.querySelectorAll(".popup")).forEach(function(e){var t;(t=e).style.opacity=1,function e(){(t.style.opacity-=.1)<0?t.style.display="none":requestAnimationFrame(e)}();e=e.querySelector(".wpcf7-mail-sent-ok");e&&(e.style.display="none")}),this.body.classList.remove("popup-opened"),this.html.classList.remove("popup-opened")}},{key:"openOnePopup",value:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1e3;this.forceCloseAllPopup(),setTimeout(function(){e.body.classList.add("popup-opened"),e.html.classList.add("popup-opened"),n(document.querySelector(t))},o)}},{key:"openPopup",value:function(){var o=this;this.body.addEventListener("click",function(e){var t=function e(t,o){return t.classList&&_toConsumableArray(t.classList).includes(o)?t:t.parentNode&&e(t.parentNode,o)}(e.target,"js-open-popup-activator");if(!t)return!1;e.preventDefault();t="A"===t.nodeName?t.getAttribute("href"):t.dataset.href,t=document.querySelector(t);o.body.classList.add("popup-opened"),o.html.classList.add("popup-opened"),n(t)})}},{key:"closePopup",value:function(){var t=this;this.body.addEventListener("click",function(e){return!!_toConsumableArray(e.target.classList).includes("js-popup-close")&&(e.preventDefault(),void t.forceCloseAllPopup())}),document.addEventListener("keydown",function(e){27===e.keyCode&&t.forceCloseAllPopup()})}},{key:"init",value:function(){this.openPopup(),this.closePopup()}}]),e}();function A(e){var t=document.querySelectorAll(".stages-holder .stage");e(window).on("scroll",function(){t&&_toConsumableArray(t).forEach(function(e){!function(e,t){var o=1<arguments.length&&void 0!==t?t:100;if(e){var n=window.scrollY||window.pageYOffset,r=e.getBoundingClientRect().top+o+n,t=n,o=n+window.innerHeight,n=r,e=r+e.clientHeight;return t<=e&&e<=o||n<=o&&t<=n}}(e,0)?e.classList.remove("in-viewport"):e.classList.add("in-viewport")})})}(w=jQuery)(function(){var e,t,o,n,r,i,a,s,l,c,u,d,p,f,m,y;function h(){var e=u.closest(".terms-navigation-wrapper");window.matchMedia("(min-width: 768px)").matches||window.scrollY<24?e.removeAttribute("style"):e.style.transform="translateY(".concat(window.scrollY-24,"px)")}function v(){var o=c.clientHeight+70;window.matchMedia("(min-width: 1200px)").matches||(o-=110),_toConsumableArray(p).forEach(function(e){var t=e.getAttribute("id");e.offsetTop<o+window.scrollY&&(_toConsumableArray(d).forEach(function(e){e.classList.remove("active")}),u.querySelector('[href="#'.concat(t,'"]')).classList.add("active"))})}(e=document.querySelector("#site-header"))&&(1<window.scrollY?e.classList.add("scrolled"):e.classList.remove("scrolled"),window.addEventListener("scroll",function(){1<window.scrollY?e.classList.add("scrolled"):e.classList.remove("scrolled")})),t=$(".menu-btn"),o=$(".site-header"),n=$("body"),r=$("html"),t.on("click",function(){t.hasClass("open")?(t.removeClass("open"),o.removeClass("open"),n.removeClass("menu-opened"),r.removeClass("menu-opened")):(t.addClass("open"),o.addClass("open"),n.addClass("menu-opened"),r.addClass("menu-opened"))}),A(w),(a=(i=w)(".ticks-list"))[0]&&a.find(".tick.expandable").on("click",function(){var e=i(this);a.find(".tick").removeClass("active"),e.addClass("active")}),s=w,!window.location.hash||(m=s(window.location.hash))[0]&&(m=m.offset().top-s("#site-header").height(),s("html, body").animate({scrollTop:m},1500,"swing")),(l=w)("a").click(function(e){e=l(e.target).attr("href"),e=e.substr(e.indexOf("#")),e=l(e);e[0]&&(e=e.offset().top-l("#site-header").height(),l("html, body").animate({scrollTop:e},1500,"swing"))}),(m=new b).init(),window.popup_windows=m,m=w,c=document.querySelector("#site-header"),u=document.querySelector(".js-terms-page-navigation"),d=u&&u.querySelectorAll("li > a"),p=document.querySelectorAll(".terms-content h4"),f=document.querySelector(".js-terms-menu-opener"),u&&(setTimeout(h,0),v(),m(window).on("scroll",function(){v(),h()}),m(window).on("resize",function(){setTimeout(h,0),setTimeout(v,0)})),u&&_toConsumableArray(d).forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();var t=e.target.getAttribute("href"),e=document.querySelector(t),t=e.offsetTop-c.clientHeight;window.matchMedia("(min-width: 1651px)").matches&&!c.classList.contains("scrolled")?t+=20:window.matchMedia("(min-width: 1200px)").matches?t-=20:t+=50,e&&window.scroll({behavior:"smooth",left:0,top:t})})}),f&&f.addEventListener("click",function(){var e=f.closest(".section");e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}),m=document.querySelectorAll(".js-close-reminder"),y=document.querySelector(".js-cookie-policy-box"),"viewed"!==Cookies.get("cookie_policy")&&setTimeout(function(){y&&y.classList.add("opened")},2e3),m&&m.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),y&&y.classList.remove("opened"),Cookies.set("cookie_policy","viewed",{expires:40})})})})});
//# sourceMappingURL=customization.js.map
