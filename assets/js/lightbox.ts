/*!
 * bootstrap-lightbox.js v0.6.1
 * Copyright 2013 Jason Butz
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
(function ($) {
  $("body").on("click", ".lightbox", function (event) {
    if (!event.ctrlKey) {
      event.preventDefault();
      var $body = $("body");
      var $imgHref = $(this).children("img").attr("data-src");
      var $lightbox = $('<div id="lightbox">');
      var $lightboxImage = $("<img>").attr("src", $imgHref);
      $lightbox.append($lightboxImage);
      $lightbox.fadeIn(200);
      $body.append($lightbox);
      $("#lightbox").on("click", function (remove) {
        if (remove.target == this) {
          $lightbox.fadeOut(200, function () {
            $("#lightbox").remove();
          });
        }
      });
    }
  });
})(window.jQuery);
