// var dynamicLandingModule = (function() {
//   "use strict";

//   var $time = $(".dynamic-landing-page__time");
//   var $greeting = $(".dynamic-landing-page__greeting");
//   var $name = $(".dynamic-landing-page__name");

//   var initDates = function() {

//   }

//   var showTime = function(timeout) {
//     var today = new Date(),
//         hour  = today.getHours(),
//         min   = today.getMinutes(),
//         sec   = today.getSeconds();

//     var amPm = hour >= 12 ? "PM" : "AM";
    
//     hour = hour % 12 || 12;

//     time.innerHTML = hour + "<span>:</span>" + min + "<span>:</span>" + sec;
    
//     setTimeout(showTime, 1000);
//   }

//   var dynamicLandingModuleInit = function() {
//     console.log('Dynamic Landing Module');
//     showTime()
//   }



//   return {
//     dynamicLandingModuleInit : dynamicLandingModuleInit
//   }
// }());

(function($){

	var dynamicLandingControl, defaultOptions, __bind;

	__bind = function(fn, me) {
		return function() {
			return fn.apply(me, arguments);
		};
	};

	// Plugin default options
	defaultOptions = {
		
	};

	dynamicLandingControl = (function(options) {
		function dynamicLandingControl(handler, options) {
			this.handler = handler;

      // Extend default options
			$.extend(true, this, defaultOptions, options);

			// Bind methods
			this.init = __bind(this.init, this);
		}

		// Main method
		dynamicLandingControl.prototype.init = function() {
			
      console.log('Dynamic Landing Module Init!');
      var $dynamic_landing_page = $("dynamic-landing-page");
      console.log('dynamic_landing_page', $dynamic_landing_page)
      if ( $dynamic_landing_page.length > 0 ) {
        console.log('Ye')
      }
      

			//this.handler.data('exampleOneMore', this);
		};

		return dynamicLandingControl;
	})();

	$.fn.dynamicLandingModule = function(options) {
    // Create a dynamicLandingControlInstance instance if not available.
		if (!this.dynamicLandingControlInstance) {
			this.dynamicLandingControlInstance = new dynamicLandingControl(this, options || {});
		}

		this.dynamicLandingControlInstance.init();

		return this;
	};
})(jQuery);
