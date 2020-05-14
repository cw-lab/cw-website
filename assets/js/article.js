$(window).load(function() {
    var width = $(window).width(),
        height = $(window).height(),
        articleFirstBodyTop = $('article').children('.article__body').offset().top;
    $(window).on('scroll', _.throttle(function() {
        var scroll = $(window).scrollTop(),
            headerHeight = $('header').outerHeight();
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
                articleRecommendTop = articleRecommend.offset().top + articleRecommend.outerHeight() + 50,
                articleContentGroupHeight = articleRecommendTop - articleBodyTop;
            next.css({
                'height': functionGroupHeight
            })
            if ((scroll >= (articleBodyTop - headerHeight)) && (scroll < (articleRecommendTop - height + (functionGroupHeight / 2)))) {
                functionGroup.fadeIn(150);
            } else {
                functionGroup.fadeOut(150);
            }
            if ((scroll >= (articleRecommend.offset().top - (1.5 * height))) && (scroll < (articleRecommendTop - height + (functionGroupHeight / 2)))) {
                next.children('a').fadeIn({
                    start: function() {
                        $(this).css('display', 'block');
                    }
                });
            } else {
                next.children('a').fadeOut();
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
                articleIndexLink = articleIndex.attr('data-link');

            if ((scroll > articleIndexTop) && (scroll < (articleIndexTop + articleIndex.outerHeight()))) {
                $('header .title').text(articleIndexH1);
                $('title').text(articleIndexTitle);
                history.replaceState('', articleIndexTitle, articleIndexLink);
            }
        }
    }, 300));
})