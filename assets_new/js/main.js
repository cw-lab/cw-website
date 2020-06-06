function lazyload() {
    $("img.lazyload").each(function() {
        $(this).lazyload();
        $(this).load(function() {
            $(this).parent().addClass('finished');
        })
    });
}
lazyload();
$(function() {
    var width = $(window).width();
    $('body').append('<div class="black"></div><div class="opacity"></div>');
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
        $('.opacity').removeClass('opened menubar__user');
    });
    $('.search__icon').click(function() {
        $('header, .ad--970by250').toggleClass('opened');
        $(this).toggleClass('opened');
        $('.search__block').slideToggle();
        $('.black').toggleClass('opened search__opened');
        $('.menubar__user--member').slideUp();
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
    });
    $('.opacity').click(function() {
        if ($(this).hasClass("menubar__user")) {
            $('body').removeClass('opened');
            $('.menubar__user--member').slideUp();
            $('.opacity').removeClass('opened menubar__user');
        }
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
        $('.channel__title').click(function() {
            $(this).children('i.icon').toggleClass('active');
            $(this).siblings('.channel__option').slideToggle();
            $(this).parent().siblings('.channel__item').children('.channel__title').children('i.icon').removeClass('active');
            $(this).parent().siblings('.channel__item').children('.channel__option').slideUp();
        })
    }
    $('.tabPanel .tabGroup li').click(function() {
        var tabIndex = $(this).index();
        $('.tabContent .active').removeClass('active');
        $(this).addClass('active').siblings('.active').removeClass('active');
        $(this).parent().siblings('.tabContent').children('ul').eq(tabIndex).addClass('active');
    });
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
    $(".menubar__user > i.icon, .menubar__user .menubar__user--login").click(function() {
        $(this).siblings('.menubar__user--member').slideToggle();
        $('.search__block').slideUp();
        $('.black, .opened').removeClass('opened search__opened');
        $('.desktop i.icon-down').toggleClass('active');
        $('.opacity').toggleClass('opened menubar__user');
        if (($('header').hasClass('fixed')) && (width < 1024)) {
            $('body').toggleClass('opened')
        }
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
    $(window).load(function() {
        $(window).scroll(function() {
            var scroTop = $(window).scrollTop(),
                headerTop = $('body>.banner').outerHeight(),
                headerHeight = $('header').outerHeight();
            if (scroTop >= headerTop) {
                $('header, .banner, .main-nav').addClass('fixed');
                $('body').css({
                    'padding-top': headerHeight
                });
            } else {
                $('header, .banner, .main-nav').removeClass('fixed');
                $('body').css({
                    'padding-top': 0
                });
            }
        });
    });
})