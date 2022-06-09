/*
 tokyo kantei dna.js
 */
$(function () {
  $(window).scroll(function () {
    var trgt = $('.js-display');
    var scroll = $(window).scrollTop() + (window.innerHeight/1.3);
    trgt.each(function () {
      var position = $(this).offset().top;
      if (position < scroll) {
        $(this).addClass('is-displayed');
        $(this).removeClass('js-display');
      }
    });
  });
});