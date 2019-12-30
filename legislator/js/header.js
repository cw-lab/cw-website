$(function() {
    $(".navigation").load("navigation.html", function() {
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
                $("body, nav").addClass("scrollUp");
            } else {
                $("body, nav").removeClass("scrollUp");
            }
            iScrollPos = iCurScrollPos;
            if ($("nav").offset().top == 0) {
                $("body, nav").removeClass("scrollUp");
            }
            if ($("nav").offset().top > height) {
                $("nav").removeClass("firstscreen");
            } else {
                $("nav").addClass("firstscreen");
            }
        })
    });
});