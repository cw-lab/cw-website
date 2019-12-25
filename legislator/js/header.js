$(function() {
    var iScrollPos = 0,
        height = $(window).height();
    $('.hamburger').click(function() {
        $('body, nav').toggleClass("menu__opened");
        $(this).toggleClass("active");
        $('.menu__block').toggleClass("default active");
    });
    $(window).scroll(function() {
        // 往上滾動出現<nav>
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos < iScrollPos) {
            $("nav").addClass("scrollUp");
        } else {
            $("nav").removeClass("scrollUp");
        }
        iScrollPos = iCurScrollPos;
        if ($("nav").offset().top == 0) {
            $("nav").removeClass("scrollUp");
        }
        if ($("nav").offset().top > height) {
            $("nav").removeClass("firstscreen");
        } else {
            $("nav").addClass("firstscreen");
        }
    })
});