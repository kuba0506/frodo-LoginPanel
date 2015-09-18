;(function ($) {
  "use strict";

  var defaults = {};

  //Constructor
  function Frodo(element, options) {
    var _this = this;

    //Config
    _this.config = $.extend(true, {}, defaults, options);

  }

  $.fn.frodo = function () {};
})(jQuery);