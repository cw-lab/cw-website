var width = $(window).width(),
    menubarUserClick = 0,
    searchClick = 0;

function lazyload() {
    $("img.lazyload").each(function() {
        $(this).lazyload();
        $(this).on('load', function() {
            $(this).parent().addClass('finished');
        })
    });
}
lazyload();

function adBlock() {
    $('[class*="cw__advertising"]').each(function() {
        if (($(this).height() < 80) && (!$(this).hasClass('ad--scrollvideo'))) {
            $(this).hide();
        }
    })
}
$(function() {
    var width = $(window).width(),
        height = $(window).height(),
        originTitle = $('title').text(),
        originLink = window.location.pathname.split("/").pop(),
        // 判斷系統
        iphone = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null),
        android = (navigator.userAgent.match(/android/i) != null),
        ipad = navigator.userAgent.match(/iPad/i) != null,
        // 判斷瀏覽器
        chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    if (chrome) {
        $("body").addClass("chrome");
    }
    if (android) {
        $("body").addClass("android");
    }
    // 漢堡
    $('body').append('<div class="black"></div><div class="opacity"></div>');
    $('.hamburger').click(function() {
        if ($('.black').hasClass("search__opened")) {
            $('.search__icon').removeClass('opened');
            $('.black').removeClass('opened search__opened');
            $('.search__block').slideUp();
            $('body, header, .ad--970by250').removeClass('opened');
        }
        $('body').addClass('opened');
        $('.menubar--left').addClass('opened');
        $('.black').addClass('opened menubar--left');
        $('.menubar__user--member').slideUp();
        $('.menubar__user > i.icon').removeClass('icon-close');
        $('.opacity').removeClass('opened menubar__user');
    });
    $('.black').click(function() {
        if ($(this).hasClass("menubar--left")) {
            $('body').removeClass('opened');
            $('.menubar--left').removeClass('opened');
            $('.black').removeClass('opened menubar--left');
        }
        if ($(this).hasClass("message--dialogs")) {
            $('.black').removeClass('opened message--dialogs');
            $('.message--dialogs').fadeOut(200);
        }
        if ($(this).hasClass("search__opened")) {
            $('body, header, .ad--970by250, .search__icon').removeClass('opened');
            $('.black').removeClass('opened search__opened');
            $('.search__block').slideUp();
        }
        if ($(this).hasClass("idlebox__opened")) {
            $('.black').removeClass('opened idlebox__opened');
            $('.message--idlebox').fadeOut(200);
        }
        menubarUserClick = 0;
        searchClick = 0;
    });
    $('.search__group').each(function() {
        $(this).children('input').blur(function() {
                $(this).parent().removeClass("focus");
            })
            .focus(function() {
                $(this).parent().addClass("focus");
            });
    });
    if (width < 1024) {
        $('.channel__group > h4').click(function() {
            $(this).toggleClass('active');
            $(this).siblings('.channel').slideToggle();
            $(this).parent().siblings('.channel__group').children('h4').removeClass('active');
            $(this).parent().siblings('.channel__group').children('.channel').slideUp();
        })
    }
    $('.tabPanel .tabGroup li').click(function() {
        var tabIndex = $(this).index();
        $('.tabContent .active').removeClass('active');
        $(this).addClass('active').siblings('.active').removeClass('active');
        $(this).parent().siblings('.tabContent').children('ul').eq(tabIndex).addClass('active');
    });
    // channelTitle 空值隱藏
    $('.caption .channelTitle').each(function() {
        if ($(this).text() == '') {
            $(this).hide();
        }
    });
    // 首頁手機版欄位
    $('.mobile-tab li').click(function() {
        var tabIndex = $(this).index();
        $('.mobile-tab .active').removeClass('active');
        $(this).addClass('active');
        $('.main article, .main aside').hide();
        $('.main').children().eq(tabIndex).show();
    });
    // 首頁網書
    var nowIndex2 = 0;
    $('.slider .prev').click(function() {
        var sliderLiLength = $('.slider li').length,
            $sliderLi = $('.slider li');
        $sliderLi.attr('class', '');
        $sliderLi.eq(nowIndex2).addClass('ltr_out');
        if (nowIndex2 > 0) {
            nowIndex2--;
        } else {
            nowIndex2 = sliderLiLength - 1;
        }
        $sliderLi.eq(nowIndex2).addClass('ltr_in');
        return false;
    });
    $('.slider .next').click(function() {
        var sliderLiLength = $('.slider li').length,
            $sliderLi = $('.slider li');
        $sliderLi.attr('class', '');
        $sliderLi.eq(nowIndex2).addClass('rtl_out');
        if (nowIndex2 < sliderLiLength - 1) {
            nowIndex2++;
        } else {
            nowIndex2 = 0;
        }
        $sliderLi.eq(nowIndex2).addClass('rtl_in');
        return false;
    });
    $(window).on('load', function() {
        var height = $(window).height(),
            container = $("header .container").outerWidth(),
            articleContainFluid = $(".article__info").outerWidth(),
            articleTextWidth = $(".article__text").outerWidth();
        // sidemenu-left
        $(".menubar--left > ul > li > .li__group > i.more, .menubar__user--member > ul > li > .li__group > i.more").click(function(event) {
            $(this).toggleClass("active");
            $(this).parent().siblings("ul").slideToggle();
            $(this).parent().parent().siblings().children().children("i.more").removeClass("active");
            $(this).parent().parent().siblings().children("ul").slideUp();
            $(this).parent().parent().parent().siblings("ul").children().children("ul").slideUp();
            $(this).parent().parent().parent().siblings("ul").children().children().children(".icon-down").removeClass("active");
            event.stopPropagation();
        })
        $(".li__group--id").click(function(event) {
            event.stopPropagation();
        });
        // 會員下拉式選單
        function memberHeight(width) {
            if (width < 1024) {
                $('.menubar__user--member').height(window.innerHeight - $('header').outerHeight());
            } else {
                $('.menubar__user--member').height('auto');
            }
        }
        memberHeight(width);
        $('.search__icon').click(function() {
            searchClick < 1 ? searchClick++ : searchClick = 0;
            $(this).toggleClass('opened');
            $('.search__block').slideToggle();
            $('.black').toggleClass('opened search__opened');
            $('.menubar__user--member').slideUp();
            $('.menubar__user > i.icon').removeClass('icon-close');
            $('.opacity').removeClass('opened menubar__user');
            menubarUserClick = 0
            if (searchClick == 0) {
                $('header, .ad--970by250').removeClass('opened');
            } else {
                $('header, .ad--970by250').addClass('opened');
            }
        });
        $(".menubar__user > i.icon, .menubar__user .menubar__user--member, .opacity").click(function() {
            menubarUserClick < 1 ? menubarUserClick++ : menubarUserClick = 0;
            $(this).siblings('.menubar__user--member').slideToggle();
            $('.desktop i.icon-down').toggleClass('active');
            $('.search__block').slideUp();
            $('body, .search__icon').removeClass('opened');
            $('.opacity, .black').removeClass('opened menubar__user search__opened');
            searchClick = 0;
            if (menubarUserClick == 0) {
                $('.menubar__user > i.icon').removeClass('icon-close');
                if (($('header').hasClass('fixed')) && (width < 1024)) {
                    setTimeout(function() {
                        $('body').removeClass('opened');
                    }, 300);
                }
            } else {
                $('.opacity').addClass('opened menubar__user');
                $('.menubar__user > i.icon').addClass('icon-close');
                if (($('header').hasClass('fixed')) && (width < 1024)) {
                    setTimeout(function() {
                        $('body').addClass('opened');
                    }, 300);
                }
            }
        });
        $('.opacity').click(function() {
            $('body').removeClass('opened');
            $('.menubar__user--member').slideUp();
            $('.menubar__user > i.icon').removeClass('icon-close');
            $('.opacity').removeClass('opened menubar__user');
            menubarUserClick = 0;
            searchClick = 0;
        });
        adBlock();
        $(window).scroll(function() {
            var scroll = $(window).scrollTop(),
                adFirstHeight = $('body > .banner').outerHeight(),
                headerHeight = $('header').outerHeight();
            if ((width < 1024) && ($('.menubar__user--member').is(':visible')) && (scroll >= adFirstHeight)) {
                $('body').addClass('opened');
            } else {
                $('body').removeClass('opened');
            }

            if (scroll >= adFirstHeight) {
                $('header').addClass('fixed');
                $('body').css({
                    'padding-top': headerHeight
                });
            } else {
                $('header').removeClass('fixed');
                $('body').css({
                    'padding-top': 0
                });
            }
            if (scroll >= (height / 2)) {
                $('.bulletin').addClass('hide');
            }
        });
        $(window).resize(function(width) {
            var width = $(window).width(),
                height = $(window).height();
            memberHeight(width);
            if (($('.menubar__user--member').is(':visible')) && (scroll >= adFirstHeight)) {
                if (width < 1024) {
                    $('body').addClass('opened');
                } else {
                    $('body').removeClass('opened');
                }
            }
        })
    })
});