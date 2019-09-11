var testModule = (function() {
  "use strict";

  var initTestModule = function() {
    console.log("Init Test Module");
  };

  return {
    initTestModule: initTestModule
  };
})();
