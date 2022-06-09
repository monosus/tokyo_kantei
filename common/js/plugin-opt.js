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
  var slicked = false;
  $(window).on('load resize', function() {
    if (window.matchMedia('(min-width:769px)').matches) {
      if (!slicked) {
        slicked = true;
          
        $('.js-slick-service').slick({
          dots: false,
          arrows: true,
          infinite: false,
          speed: 300,
          slidesToShow: 3
        });
        
        $('.mod-slick-body').slick({
          dots: false,
          arrows: true,
          infinite: false,
          speed: 300,
          slidesToShow: 5
        });
      }
    }
    else {
      if (slicked) {
        slicked = false;
        $('.js-slick-service').slick('unslick');
        $('.mod-slick-body').slick('unslick');
      }
    }
  });
};

/* ----------------------------------------------------------
 lightBoxOpt
 ---------------------------------------------------------- */

var lightBoxOpt = function() {
  lightbox.option({
    'showImageNumberLabel': false,
    'maxWidth': 1200,
    'maxHeight': 700
  });
};
$(function() {
  $(window).on('load resize', function () {
    var w = $(window).width();
    $('.lb-image').css('max-width', Math.min(w * .8, w - 180));
  });
});


/* ----------------------------------------------------------
 matchHeight
 ---------------------------------------------------------- */

var matchHeight = function() {
  $('.js-match').matchHeight();
};