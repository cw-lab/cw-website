function articleInint() {
    $(window).on('load', function() {
        var width = $(window).width(),
            height = $(window).height(),
            idleTime = 0,
            articleFirstBodyTop = $('article').children('.article__body').offset().top;
        // 閒置五分鐘
        var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
        $(this).mousemove(function(e) {
            idleTime = 0;
        });
        $(this).keypress(function(e) {
            idleTime = 0;
        });

        function timerIncrement() {
            idleTime++;
            if (idleTime > 5 && $(".idle-group").html() != '' && show_popup == 'true') { // 4:59
                $('.message--idlebox').fadeIn();
                $('.black').addClass('opened idlebox__opened');
            }
        }
        // 找到內容的R1
        $('.article__content').each(function() {
            $(this).find(".ad--300by250").first().addClass('ad--first');
        });
        if ( $('.bottombar').length == 0 ) {
            $('.article__next').addClass('no__bottombar');
        }    
        $(window).on('scroll', _.throttle(function() {
            var scroll = $(window).scrollTop(),
                headerHeight = $('header').outerHeight();
            if (scroll >= (articleFirstBodyTop - headerHeight)) {
                $('header').addClass('scroll');
                $('.bottombar').css({
                    'bottom': 0
                });
            } else {
                $('header').removeClass('scroll');
                if (width >= 1024) {
                    $('.bottombar').css({
                        'bottom': '-40px'
                    });
                } else {
                    $('.bottombar').css({
                        'bottom': '-50px'
                    });
                }
            }
            $('article').each(function() {
                var next = $(this).children('.article__body').children('.article__next'),
                    nextAHeight = next.children('a').outerHeight(),
                    functionGroup = $(this).children('.article__body').children('.article__function'),
                    functionGroupHeight = functionGroup.outerHeight(),
                    articleHead = $(this).children('.article__head'),
                    articleHeadTop = articleHead.offset().top,
                    articleTitle = $(this).attr('data-title'),
                    articleLink = $(this).attr('data-link'),
                    articleH1 = articleHead.children().children('h1').text(),
                    articleImg = articleHead.children().children('.article__img'),
                    articleImgTop = articleImg.offset().top,
                    articleBody = $(this).children('.article__body'),
                    articleBodyTop = articleBody.offset().top,
                    articleRecommend = $(this).next('.article__foot').children('.article__recommend'),
                    articleRecommendTop = articleRecommend.offset().top + 50,
                    articleContentGroupHeight = articleRecommendTop - articleBodyTop;
                next.css({
                    'height': functionGroupHeight
                })
                if ((width >= 1024) && (scroll >= (articleBodyTop - headerHeight)) && (scroll < (articleRecommendTop - height + (functionGroupHeight / 2)))) {
                    functionGroup.fadeIn(150);
                } else {
                    functionGroup.fadeOut(150);
                }
                if ((scroll >= (articleBodyTop - headerHeight)) && (scroll >= (articleRecommend.offset().top - 1500)) && (scroll < (articleRecommendTop - height + (functionGroupHeight / 2)))) {
                    next.addClass('show');
                    next.children('h4, a').fadeIn({
                        start: function() {
                            $(this).css('display', 'block');
                        }
                    });
                    next.children('').fadeIn({
                        start: function() {
                            $(this).css('display', 'block');
                        }
                    });
                } else {
                    next.removeClass('show');
                    next.children('h4, a').fadeOut();
                }
                if (scroll >= articleImgTop) {
                    $('.bulletin').addClass('hide');
                }
            })
            for (var index = 0; index < $('article').length; index++) {
                var articleIndex = $('article').eq(index),
                    articleIndexTop = articleIndex.offset().top,
                    articleIndexH1 = articleIndex.children('.article__head').children().children('h1').text(),
                    articleIndexTitle = articleIndex.attr('data-title'),
                    articleIndexLink = articleIndex.attr('data-link'),
                    articleIndexShare2fb = articleIndex.attr('data-share-fb'),
                    articleIndexShare2line = articleIndex.attr('data-share-line'),
                    articleIndexShare2mail = articleIndex.attr('data-share-mail');

                if ((scroll > articleIndexTop) && (scroll < (articleIndexTop + articleIndex.outerHeight()))) {
                    $('header .title').text(articleIndexH1);
                    $('header .article__share.mobile li.tooltips--facebook a').attr('onclick', articleIndexShare2fb);
                    $('header .article__share.mobile li.tooltips--line a').attr('href', articleIndexShare2line);
                    $('header .article__share.mobile li:last-child a').attr('href', articleIndexShare2mail);
                    $('title').text(articleIndexTitle);
                    history.replaceState('', articleIndexTitle, articleIndexLink);
                }
            }
        }, 300));
    })
}
articleInint();
