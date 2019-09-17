$(document).ready(function() {
  console.log('-- Document Ready --');
  
  function test(testing) { // Shorthand function to test if something exists - if it does, returns true
		return typeof testing != "undefined";
	}

  if ( test($.fn.dynamicLandingModule) ){
  var $dynamic_landing_page = $("dynamic-landing-page");
    $.fn.dynamicLandingModule();
  }
});
