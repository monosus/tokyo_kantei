/**
 * style.js
 *
 */


/* ----------------------------------------------------------
 init
---------------------------------------------------------- */
$(function(){
  // アコーディイオン
  accordionMenu();

});

$(function() {
  var $button = $('.nav-local .category p');
  var $nav = $('.nav-local ul');

  $(window).resize(function(){
    var w = $(window).width(); //ブラウザの幅を取得
    var x = 768; //ブレイクポイントを設定
    if (w <= x) { // ウィンドウサイズが768px以下
      $($button).removeClass('none');
      $($nav).addClass('none');
    } else { //ウィンドウサイズが768以上
      $($nav).removeClass('none').removeAttr('style');
    }
  });
  $($button).on('click',(function(){
      if ($($nav).css('display')=='none'){
        $($nav).slideDown(500);
      } else {
        $($nav).slideUp(300);
      }
    })
  );
});
/* ----------------------------------------------------------
アコーディオン
---------------------------------------------------------- */
var accordionMenu = function(){
  $(function(){
  	$(".matter-q").on("click", function() {
  		$(this).next().slideToggle();
      $(this).toggleClass('is-active');
  		// activeが存在する場合
      return false;
  	});
  });
};
