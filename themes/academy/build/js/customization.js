"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(i="Object"===i&&t.constructor?t.constructor.name:i)||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){function n(i,t){i&&(i.style.opacity=0,i.style.display=t||"block",function t(){var e=parseFloat(i.style.opacity);1<(e+=.1)||(i.style.opacity=e,requestAnimationFrame(t))}())}function L(t,e){var i=1<arguments.length&&void 0!==e?e:100;if(t){var n=window.scrollY||window.pageYOffset,a=t.getBoundingClientRect().top+i+n,e=n,i=n+window.innerHeight,n=a,t=a+t.clientHeight;return e<=t&&t<=i||n<=i&&e<=n}}var C,k=function(){function t(){_classCallCheck(this,t),this.body=document.querySelector("body"),this.html=document.querySelector("html")}return _createClass(t,[{key:"forceCloseAllPopup",value:function(){_toConsumableArray(document.querySelectorAll(".popup")).forEach(function(t){var e;(e=t).style.opacity=1,function t(){(e.style.opacity-=.1)<0?e.style.display="none":requestAnimationFrame(t)}();t=t.querySelector(".wpcf7-mail-sent-ok");t&&(t.style.display="none")}),this.body.classList.remove("popup-opened"),this.html.classList.remove("popup-opened")}},{key:"openOnePopup",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1e3;this.forceCloseAllPopup(),setTimeout(function(){t.body.classList.add("popup-opened"),t.html.classList.add("popup-opened"),n(document.querySelector(e))},i)}},{key:"openPopup",value:function(){var i=this;this.body.addEventListener("click",function(t){var e=function t(e,i){return e.classList&&_toConsumableArray(e.classList).includes(i)?e:e.parentNode&&t(e.parentNode,i)}(t.target,"js-open-popup-activator");if(!e)return!1;t.preventDefault();e="A"===e.nodeName?e.getAttribute("href"):e.dataset.href,e=document.querySelector(e);i.body.classList.add("popup-opened"),i.html.classList.add("popup-opened"),n(e)})}},{key:"closePopup",value:function(){var e=this;this.body.addEventListener("click",function(t){return!!_toConsumableArray(t.target.classList).includes("js-popup-close")&&(t.preventDefault(),void e.forceCloseAllPopup())}),document.addEventListener("keydown",function(t){27===t.keyCode&&e.forceCloseAllPopup()})}},{key:"init",value:function(){this.openPopup(),this.closePopup()}}]),t}(),a=function(){return(a=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var a in e=arguments[i])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},l=(t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal||this.endVal;this.countDown=this.startVal>t;var e=t-this.startVal;Math.abs(e)>this.options.smartEasingThreshold?(this.finalEndVal=t,e=this.countDown?1:-1,this.endVal=t+e*this.options.smartEasingAmount,this.duration=this.duration/2):(this.endVal=t,this.finalEndVal=null),this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},t.prototype.start=function(t){this.error||(this.callback=t,0<this.duration?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},t.prototype.printValue=function(t){t=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=t:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=t:this.el.innerHTML=t},t.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var e=Number(t);return this.ensureNumber(e)?e:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},t);function t(t,e,i){var s=this;this.target=t,this.endVal=e,this.options=i,this.version="2.0.7",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){s.startTime||(s.startTime=t);t-=s.startTime;s.remaining=s.duration-t,s.useEasing?s.countDown?s.frameVal=s.startVal-s.easingFn(t,0,s.startVal-s.endVal,s.duration):s.frameVal=s.easingFn(t,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(t/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(t/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Number(s.frameVal.toFixed(s.options.decimalPlaces)),s.printValue(s.frameVal),t<s.duration?s.rAF=requestAnimationFrame(s.count):null!==s.finalEndVal?s.update(s.finalEndVal):s.callback&&s.callback()},this.formatNumber=function(t){var e=t<0?"-":"",t=Math.abs(t).toFixed(s.options.decimalPlaces),i=(t=(t+="").split("."))[0],t=1<t.length?s.options.decimal+t[1]:"";if(s.options.useGrouping){for(var n="",a=0,o=i.length;a<o;++a)0!==a&&a%3==0&&(n=s.options.separator+n),n=i[o-a-1]+n;i=n}return s.options.numerals&&s.options.numerals.length&&(i=i.replace(/[0-9]/g,function(t){return s.options.numerals[+t]}),t=t.replace(/[0-9]/g,function(t){return s.options.numerals[+t]})),e+s.options.prefix+i+t+s.options.suffix},this.easeOutExpo=function(t,e,i,n){return i*(1-Math.pow(2,-10*t/n))*1024/1023+e},this.options=a(a({},this.defaults),i),this.formattingFn=this.options.formattingFn||this.formatNumber,this.easingFn=this.options.easingFn||this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(e),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}function S(t,e,i){var n;t[0]&&(n=t.offset().top,0<(n=window.scrollY-n+e)&&n<e&&(n=n/2,"top"===i?t.css("top",n+"px"):t.css("bottom","-"+n/1.5+"px")))}function x(a){return new Promise(function(t,e){a.classList.add("active");var i,n=a.querySelector(".statistic-item .js-value");window.matchMedia("(min-width: 768px)").matches&&!$("body").hasClass("mobile")?setTimeout(function(){!function(t){var e,i,n=document.createElement("span"),a=t,o=(r=(s=(s=t.dataset.value).split(""),i=e="",s.forEach(function(t){/\.|[0-9]/g.test(t)?e+=t:i+=t}),{number:e,text:i})).number,s=r.text,r=void 0===t.dataset.prefix?"":t.dataset.prefix,t=0;0<=o.indexOf(".")&&(t=o.length-o.indexOf(".")-1),n.innerText="0",a.innerHTML="",a.prepend(n);s={prefix:r,decimalPlaces:t,duration:1,suffix:s,useGrouping:!1};(s=new l(n,parseFloat(o),s)).error?console.error(s.error):s.start()}(n),n.classList.add("active"),t(!0)},500):((i=n).innerHTML=i.dataset.value,n.classList.add("active"),t(!0))})}(C=jQuery)(function(){var t,e,i,n,a,o,s,r,l,c,u,d,p,h,m,f,y,v,w,g,V;function b(){var t=d.closest(".terms-navigation-wrapper");window.matchMedia("(min-width: 768px)").matches||window.scrollY<24?t.removeAttribute("style"):t.style.transform="translateY(".concat(window.scrollY-24,"px)")}function A(){var i=u.clientHeight+70;window.matchMedia("(min-width: 1200px)").matches||(i-=110),_toConsumableArray(h).forEach(function(t){var e=t.getAttribute("id");t.offsetTop<i+window.scrollY&&(_toConsumableArray(p).forEach(function(t){t.classList.remove("active")}),d.querySelector('[href="#'.concat(e,'"]')).classList.add("active"))})}function E(){var t;window.matchMedia("(max-width: 1439px)").matches||y("body").hasClass("safari")||y("body").hasClass("mobile")||(t=y(window).height(),S(y(".circle-1"),t,"top"),S(y(".circle-2"),t,"bottom"),S(y(".circle-3"),t,"top"),S(y(".circle-4"),t,"bottom"),S(y(".circle-5"),t,"top"))}(t=document.querySelector("#site-header"))&&(1<window.scrollY?t.classList.add("scrolled"):t.classList.remove("scrolled"),window.addEventListener("scroll",function(){1<window.scrollY?t.classList.add("scrolled"):t.classList.remove("scrolled")})),e=(l=C)(".menu-btn"),i=l(".site-header"),n=l("body"),a=l("html"),e.on("click",function(){e.hasClass("open")?(e.removeClass("open"),i.removeClass("open"),n.removeClass("menu-opened"),a.removeClass("menu-opened")):(e.addClass("open"),i.addClass("open"),n.addClass("menu-opened"),a.addClass("menu-opened"))}),l=C,(o=document.querySelectorAll(".stages-holder .stage, .program .module, .technologies"))&&l(window).on("scroll",function(){o&&_toConsumableArray(o).forEach(function(t){L(t,0)?t.classList.add("in-viewport"):t.classList.remove("in-viewport")})}),(r=(s=C)(".ticks-list"))[0]&&r.find(".tick.expandable").on("click",function(){var t=s(this);r.find(".tick").removeClass("active"),t.addClass("active")}),l=C,!window.location.hash||(V=l(window.location.hash))[0]&&(V=V.offset().top-l("#site-header").height(),l("html, body").animate({scrollTop:V},1500,"swing")),(c=C)("a").click(function(t){t=c(t.target).attr("href");t&&(t=t.substr(t.indexOf("#")),(t=c(t))[0]&&(t=t.offset().top-c("#site-header").height(),c("html, body").animate({scrollTop:t},1500,"swing")))}),(V=new k).init(),window.popup_windows=V,V=C,u=document.querySelector("#site-header"),d=document.querySelector(".js-terms-page-navigation"),p=d&&d.querySelectorAll("li > a"),h=document.querySelectorAll(".terms-content h4"),m=document.querySelector(".js-terms-menu-opener"),d&&(setTimeout(b,0),A(),V(window).on("scroll",function(){A(),b()}),V(window).on("resize",function(){setTimeout(b,0),setTimeout(A,0)})),d&&_toConsumableArray(p).forEach(function(t){t.addEventListener("click",function(t){t.preventDefault();var e=t.target.getAttribute("href"),t=document.querySelector(e),e=t.offsetTop-u.clientHeight;window.matchMedia("(min-width: 1651px)").matches&&!u.classList.contains("scrolled")?e+=20:window.matchMedia("(min-width: 1200px)").matches?e-=20:e+=50,t&&window.scroll({behavior:"smooth",left:0,top:e})})}),m&&m.addEventListener("click",function(){var t=m.closest(".section");t.classList.contains("active")?t.classList.remove("active"):t.classList.add("active")}),V=document.querySelectorAll(".js-close-reminder"),f=document.querySelector(".js-cookie-policy-box"),"viewed"!==Cookies.get("cookie_policy")&&setTimeout(function(){f&&f.classList.add("opened")},2e3),V&&V.forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),f&&f.classList.remove("opened"),Cookies.set("cookie_policy","viewed",{expires:40})})}),y=C,E(),y(window).scroll(E),y(window).resize(E),(v=document.querySelector(".statistic-items"))&&(window.addEventListener("scroll",function(){var t;L(v,0)&&!v.classList.contains("active")&&(v.classList.add("active"),x((t=v.querySelectorAll(".statistic-item"))[0]),x(t[1]),x(t[2]),x(t[3]),x(t[4]))}),window.dispatchEvent(new CustomEvent("scroll"))),(w=C)('input[type="tel"]').each(function(){Inputmask("+999 99-999-99-99").mask(this);var t=w(this);t.on("focus",function(){""===t.val()&&t.val("+380")})}),g=C,document.addEventListener("wpcf7mailsent",function(t){g(t.target).closest(".join-form-wrapper")[0]&&popup_windows.openOnePopup("#thanks-join-popup",1e3)}),Stickyfill.forceSticky(),Stickyfill.add(document.querySelectorAll("[data-sticky]")),V=C,console.log(V),V(".certificate-title").addClass("certificate-title--active")})});
//# sourceMappingURL=customization.js.map
