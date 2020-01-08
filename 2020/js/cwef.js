$(function() {
    var width = $(window).width(),
        height = $(window).height(),
        container = $("nav > .container").outerWidth(),
        articleContainFluid = $(".article__info").outerWidth(),
        articleTextWidth = $(".article__text").outerWidth();
    // 判斷瀏覽器
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (isChrome) {
        $("body").addClass("chrome");
    }
    if (iOS) {
        $("body").addClass("iPhone");
    }
    // Smooth scrolling using jQuery easing
    $('a.anchor[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if (width >= 768) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 70)
                    }, 1000);
                } else {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 50)
                    }, 1000);
                }
                return false;
            }
        }
    });
    if (width < 768) {
        $('.hamburger').click(function() {
            $('.main-nav').slideDown();
        })
        $('.main-nav a, .close').click(function() {
            $('.main-nav').slideUp();
        })
    }
    if (!location.href.match('review|report|download|ppt')) {
        new WOW().init();
    }
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="card"><div class="card__img"><img src="images/speaker/' + data[i]["img"];
        html += '.jpg" alt="' + data[i]["nameCh"];
        html += '"></div><div class="card__body"><div class="card__title serif card__title--ch">' + data[i]["nameCh"];
        html += '</div><div class="card__title serif card__title--en">' + data[i]["nameEn"];
        html += '</div><div class="card__title card__title--description">' + data[i]["title"];
        html += '</div><a href="#!" class="btn btn--outlined btn--small btn--gray text-uppercase">more</a></div></div>';
    }
    $('.speaker-row').html(html);
    $('.btn--show').click(function() {
        $(this).hide();
        $(this).siblings('.display__block').removeClass('hide');
    });
    // 判斷有沒有值
    $('input').each(function() {
            if (this.value) {
                $(this).parent().addClass('hasValue');
            }
            $(this).on('change keyup copy paste cut', function() {
                if (!this.value) {
                    $(this).parent().removeClass('hasValue');
                } else {
                    $(this).parent().addClass('hasValue');
                }
            })
        })
        // 是否顯示密碼
    $('.input-group .icon-eye').click(function() {
        $(this).siblings('input').attr('type',
            $(this).siblings('input').attr('type') === 'password' ? 'text' : 'password'
        );
        $(this).toggleClass('icon-eyeoff icon-eyeon');
    })
    var ppthtml = '';
    for (var j = 0; j < ppt.length; j++) {
        ppthtml += '<div class="pttCard col-lg-4 col-md-6"><img class="card__img" src="';
        ppthtml += ppt[j]['img'];
        ppthtml += '" alt="';
        ppthtml += ppt[j]['pptname'];
        ppthtml += '"><div class="card__body"><div class="card__title serif">';
        ppthtml += ppt[j]['pptname'];
        ppthtml += '</div><div class="card__name">';
        ppthtml += ppt[j]['nameCh'] + '／' + ppt[j]['nameEn'];
        ppthtml += '</div><div class="card__job">';
        ppthtml += ppt[j]['title'];
        ppthtml += '</div></div><a href="';
        ppthtml += ppt[j]['link'];
        ppthtml += '" download class="btn btn--gray btn--sm btn--outlined">下載PPT</a></div>';
    }
    $('.pttCard__group').html(ppthtml);
    if (location.href.match('report')) {
        var reporthtml = '';
        for (var k = 0; k < report.length; k++) {
            reporthtml += '<div class="reportCard col-lg-4 col-md-6">';
            reporthtml += '<a class="card__img" href="' + report[k]['link'] + '">';
            reporthtml += '<img src="';
            reporthtml += report[k]['img'];
            reporthtml += '" alt="';
            reporthtml += report[k]['title'];
            reporthtml += '"><div class="card__body"><a href="' + report[k]['link'] + '" class="card__title serif">';
            reporthtml += report[k]['title'];
            reporthtml += '</a><div class="card__essay">';
            reporthtml += report[k]['essay'];
            reporthtml += '</div></div><a href="';
            reporthtml += report[k]['link'];
            reporthtml += '" download class="btn btn--gray btn--sm btn--outlined">完整報導</a></div>';
        }
        $('.reportCard__group').html(reporthtml);
    }
    $(window).scroll(function() {
        // <nav>滑到畫面一半後固定
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("nav").addClass('scroll');
        } else {
            $("nav").removeClass('scroll');
        }
    })
    $(window).resize(function(width, container) {})
});