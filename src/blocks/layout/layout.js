$(function() {
    "use strict";
    
    var cssTransition = (function () {
        var prefixes = ['transition', 'WebkitTransition', 'MozTransition', 'OTransition', 'MsTransition'],
            el = document.documentElement,
            elStyle = el.style;

        for (var i = 0, l = prefixes.length; i < l; i += 1) {
            if (elStyle[prefixes[i]] !== undefined) {
                return true;
            }
        }
        return false;
    })();

    if (cssTransition) {
        new WOW().init();
    }
});