;(function ($) {
  "use strict";

  //Default plugin settings
  var defaults = {
    lang: 'en',
    bgColor: null
  };

  //Constructor
  function Frodo(element, options) {
    var _this = this;

    //Config
    _this.config = $.extend(true, {}, defaults, options);

  }

  $.fn.frodo = function () {};
})(jQuery);

///=include jquery.frodo.js