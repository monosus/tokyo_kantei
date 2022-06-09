/* ----------------------------------------------------------
 init
---------------------------------------------------------- */
$(function() {
    // iPad対応
    viewport();
});

/* ----------------------------------------------------------
 viewport
---------------------------------------------------------- */
var viewport = function(){
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        $("meta[name='viewport']").attr('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=yes');
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        $("meta[name='viewport']").attr('content', 'target-densitydpi=device-dpi, width=1366px, maximum-scale=1.0, user-scalable=yes.0');
    } else {
        $("meta[name='viewport']").attr('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=yes');
    }
}