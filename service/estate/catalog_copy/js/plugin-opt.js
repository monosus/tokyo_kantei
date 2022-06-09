/*
 [catalog copy]
 ---------------------------------------------------------- */
$(function() {
  // スライダーオプション
  slickPopBox();
  // ライトボックス オプション
  lightBoxOpt();
  // 高さそろえ
  matchHeight();
});

/* ----------------------------------------------------------
 slickPopBox
 ---------------------------------------------------------- */

var slickPopBox = function() {
  $('.mod-slick-body').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });
};

/* ----------------------------------------------------------
 lightBoxOpt
 ---------------------------------------------------------- */

var lightBoxOpt = function() {
  lightbox.option({
    'showImageNumberLabel': false,
    'fitImagesInViewport': true,
    'wrapAround': true
  });
};

/* ----------------------------------------------------------
 matchHeight
 ---------------------------------------------------------- */

var matchHeight = function() {
  $('.js-match').matchHeight();
};