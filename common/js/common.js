/**
 * common.js
 *
 */


/* ----------------------------------------------------------
 init
---------------------------------------------------------- */
$(function(){
  moreRead();
  navAccordion();
  cloneBreads(); // sp時のパンクズ生成
  pageScroll();  // スムーススクロール
  rollover(); // 画像ロールオーバー
  localNav(); // ローカルナビカレント
  toggleMenuSP();
  jsMatch(); // 高さ揃え
  fixContact();
});
/* ----------------------------------------------------------
 sp local nav accordion
 ---------------------------------------------------------- */

var moreRead = function() {
  
  // js-readmore ＝> wrap
  // js-more ＝> btn
  $('.js-readmore:not(.js-readmore:first-of-type)').css('display','none');
  $('.js-more').nextAll('.js-more').css('display','none');
  $('.js-more').on('click', function() {
    $(this).css('display','none');
    $(this).next('.js-readmore').fadeIn('slow');
    $(this).nextAll('.js-more:first').css('display','block');
  });
};

/* ----------------------------------------------------------
 sp local nav accordion
 ---------------------------------------------------------- */

var navAccordion = function() {
  
  var $button = $('.nav-local .category');
  var $nav = $('.nav-local ul');
  
  $(window).resize(function(){
    var w = $(window).width();
    var x = 768;
    if (w <= x) {
      $($button).removeClass('none');
      $($nav).addClass('none');
    } else {
      $($nav).removeClass('none').removeAttr('style');
    }
  });
  $($button).on('click',(function(){
    $button.removeClass('is-active');
    $nav.slideUp(300);
      if ($(this).next('ul').css('display')=='none'){
        $(this).addClass('is-active');
        $(this).next('ul').slideDown(500);
      } else {
        $(this).next('ul').slideUp(300);
        $(this).removeClass('is-active');
      }
    })
  );
};

/* ----------------------------------------------------------
 sp footer breadcrumbs
 ---------------------------------------------------------- */
var cloneBreads  = function() {
  var reSized = '';
  $(function () {
    $(window).on('resize', function () {
      getWidth();
    });
    getWidth();
  });
  function getWidth() {
    var winWidth = $(window).width();
    var $breads = $('.nav-breadcrumb');
    if (winWidth <= 768 && reSized != 'sp') {
      reSized = 'sp';
      $($breads).clone().appendTo("#cloneBreads");
    } else if (winWidth > 768 && reSized != 'pc') {
      reSized = 'pc';
      $('#cloneBreads').children($breads).remove();
    }
  }
};

/* ----------------------------------------------------------
 pageScroll
---------------------------------------------------------- */
var pageScroll = function(){
  $('.js-scroll').click(function() {
    var speed = 400; // スクロールスピード
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    if(href == '#'){
      // リンク#のときはページの先頭へ
      $('body,html').animate({scrollTop:0}, speed, 'swing');
    } else {
		// それ以外は指定idへ
			if (window.matchMedia( '(min-width: 769px)' ).matches) {　//切り替える画面サイズ
				$('body,html').animate({scrollTop:position -71}, speed, 'swing');
			}
			else {
				$('body,html').animate({scrollTop:position -50}, speed, 'swing');
			}
    }
    return false;
  });
};
/* ----------------------------------------------------------
 rollover
---------------------------------------------------------- */
var rollover = function(){
  var suffix = { normal : '_no.', over   : '_on.'}
  $('.js-over').each(function(){
    var a = null;
    var img = null;
    var elem = $(this).get(0);
    if( elem.nodeName.toLowerCase() == 'a' ){
      a = $(this);
      img = $('img',this);
    }else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
      img = $(this);
    }
    var src_no = img.attr('src'); // イメージ取得
    var src_on = src_no.replace(suffix.normal, suffix.over); // オーバーイメージに変換
    /* イメージ置換 */
    if( elem.nodeName.toLowerCase() == 'a' ){
      a.on("mouseover focus",function(){ img.attr('src',src_on); })
      .on("mouseout blur",  function(){ img.attr('src',src_no); });
    }else if( elem.nodeName.toLowerCase() == 'img' ){
      img.on("mouseover",function(){ img.attr('src',src_on); })
       .on("mouseout", function(){ img.attr('src',src_no); });
    }else if( elem.nodeName.toLowerCase() == 'input' ){
      img.on("mouseover focus",function(){ img.attr('src',src_on); })
       .on("mouseout blur",  function(){ img.attr('src',src_no); });
    }
    /* イメージ先読み */
    var cacheimg = document.createElement('img');
    cacheimg.src = src_on;
  });
};
/* ----------------------------------------------------------
 localNav
---------------------------------------------------------- */
var localNav = function () {
  var navClass = document.body.className.toLowerCase(),
    navLocal = $(".nav-local"),
    prefix = 'nav',
    current = 'is-current',
    parent = 'is-parent',
    regex = {
      a: /l/,
      dp: [
        /l[\d]+-[\d]+-[\d]+-[\d]+/,
        /l[\d]+-[\d]+-[\d]+/,
        /l[\d]+-[\d]+/,
        /l[\d]+/
      ]
    },
    route = [],
    i,
    l,
    temp,
    node;
  
  /* 子要素を非表示 */
  $("ul ul", parent).hide();
  if (navClass.indexOf("ldef") >= -1) {
    for (i = 0, l = regex.dp.length; i < l; i++) {
      temp = regex.dp[i].exec(navClass);
      if (temp) {
        route[i] = temp[0].replace(regex.a, prefix);
      }
    }
    
    /* アクティブ時にクラス付与 */
    if (route[0]) {
      // depth 4
      node = $("a." + route[0], navLocal);
      node.addClass(current);
      node.next().show();
      node.parent().parent().show()
      .parent().parent().show()
      .parent().parent().show();
      node.parent().parent().prev().addClass(parent);
      node.parent().parent()
      .parent().parent().prev().addClass(parent);
      node.parent().parent()
      .parent().parent()
      .parent().parent().prev().addClass(parent);
      
    } else if (route[1]) {
      // depth 3
      node = $("a." + route[1], navLocal);
      node.addClass(current);
      node.next().show();
      node.parent().parent().show()
      .parent().parent().show();
      node.parent().parent().prev().addClass(parent);
      node.parent().parent()
      .parent().parent().prev().addClass(parent);
      
    } else if (route[2]) {
      // depth 2
      node = $("a." + route[2], navLocal);
      node.addClass(current);
      node.next().show();
      node.parent().parent().show();
      node.parent().parent().prev().addClass(parent);
      
    } else if (route[3]) {
      // depth 1
      node = $("a." + route[3], navLocal);
      node.addClass(current);
      node.next().show();
    }
  }
};

/* !headerScroll
 ------------------------------------------------------------------- */
;(function ($) {
  $.fn.floatingWidget = function () {
    return this.each(function () {
      var $this = $(this),
        $parent = $this.offsetParent(),
        $window = $(window),
        top = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0)),
        bottom = $parent.offset().top + $parent.height() - $this.outerHeight(true),
        floatingClass = 'is-float',
        pinnedBottomClass = 'is-pinned-bottom';
      if ($parent.height() > $this.outerHeight(true)) {
        $window.on('load scroll', function () {
          var y = $window.scrollTop()-100;
          if (y > top) {
            $this.addClass(floatingClass).css("left", -$(window).scrollLeft());
            if (y > bottom) {
              $this.removeClass(floatingClass).addClass(pinnedBottomClass).removeAttr('style');
            } else {
              $this.removeClass(pinnedBottomClass);
            }
          } else {
            $this.removeClass(floatingClass).removeAttr('style');
          }
        });
      }
    });
  };
})(jQuery);
$(function () {
  $('#header').floatingWidget();
});
/* スマートフォン用メニューボタン設定
 ------------------------------------------------------------------- */
var toggleMenuSP = function () {
  //ヘッダーボタン
  $('.btn-sp-menu').on('click',function () {
    $('body').toggleClass('st-sp-menu-open');
  });
  //グローバルナビゲーション最下部ボタン
  $('.btn-sp-close').on('click',function () {
    $('body').removeClass('st-sp-menu-open');
  });
  $('.nav-global > ul > li  button').on('click',function () {
    $(this).toggleClass('st-category-open');
  });
};
/* スマートフォン用メニューボタン設定
 ------------------------------------------------------------------- */
(function ($) {
  "use strict";
  var TelLink = function () {
    this.$el = $("html");
    if (this.isMobileDevice()) {
      this.$el.data("tel", "enable").addClass("enable-anchor-tel")
    }
    this.setEvents();
  };
  TelLink.prototype = {
    setEvents: function () {
      this.$el.on("click", ".is-behaviorTel", this.handle);
    },
    isMobileDevice: function () {
      return /(mobile|android|iphone|nokia)/i.test(navigator.userAgent);
    },
    handle: function (event) {
      if ("enable" !== $("html").data("tel")) {
        event.preventDefault();
      }
    }
  };
  $(document).ready(function () {
    new TelLink();
  });
})(jQuery);

/* ----------------------------------------------------------
 match height
---------------------------------------------------------- */
var jsMatch= function () {
  var $element = $('.js-match-height');
  if($element.length >= 1) {
    $element.matchHeight();
  }
};

/* ----------------------------------------------------------
 fixed menu function
 ---------------------------------------------------------- */

var fixContact= function () {
  var $body = $('.mod-fixed-menu.contact');
  var $head = $('.mod-fixed-menu.contact .mod-fixed-menu-head');
  $head.click(function () {
    if (($body).hasClass('is-active')) {
      $($body).removeClass("is-active");
    } else {
      $($body).addClass('is-active');
    }
  });
  
  $($body)
  .hover(function () {
    $(this).addClass('is-active');
  }, function () {
    $(this).removeClass('is-active');
  });
  
  $(window).scroll(function () {
    if (($body).hasClass('is-active')) {
      $body.removeClass('is-active')
    }
  });
};

/* ----------------------------------------------------------
 fixed nav-local function
 ---------------------------------------------------------- */
(function ($) {
  $.fn.floatingWidget2 = function () {
    return this.each(function () {
      var $this = $(this),
        $parent = $this.offsetParent(),
        $window = $(window),
        top = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0)),
        floatingClass = 'is-nav-floating',
        pinnedBottomClass = 'is-nav-bottom';
      if ($parent.height() > $this.outerHeight(true)) {
        $window.on('load scroll', function () {
          var y = $window.scrollTop()+70;
          if (y > top) {
            var bottom = $parent.offset().top + $parent.height() - $this.outerHeight(true);
            $this.addClass(floatingClass);
            if ($window.width() < 1263) {
              $this.css("left", -$(window).scrollLeft());
            } else {
              $this.removeAttr('style');
            }
            if (y > bottom) {
              $this.removeClass(floatingClass).addClass(pinnedBottomClass).removeAttr('style');
            } else {
              $this.removeClass(pinnedBottomClass);
            }
          } else {
            $this.removeClass(floatingClass).removeAttr('style');
          }
        });
      }
    });
  };
})(jQuery);
$(function () {
  $('.nav-local').not('.type2').floatingWidget2();
  $('.nav-wrap').floatingWidget2();
  $('.js-more').click(function() {
    $('.nav-wrap').addClass('is-nav-floating');
    $('.nav-wrap').removeClass('is-nav-bottom');
  });
});

$(function () {
  $(window).on('load',function () {
    var navHeight = $('.nav-wrap').height();
    $('.contents').css('min-height',navHeight);
  });
});

/* ----------------------------------------------------------
 QA accordion function
 ---------------------------------------------------------- */
$(function(){
	// アコーディイオン
	accordionMenu();
});
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

