$(function() {
    $('.list__item--video').each(function() {
        var ytcode = $(this).data('ytcode');
        $(this).click(function() {
            $('body').addClass('message__open');
            $('.black').addClass('opened black-theater');
            $('.theater iframe').attr('src', 'https://www.youtube.com/embed/' + ytcode + '?rel=0');
            $('.theater').fadeIn();
        })
    });
    $('.list__item--pdf').each(function() {
        var pdfLink = $(this).data('pdflink');
        $(this).click(function() {
            window.open(pdfLink);
            return false;
        })
    });
    $('.list__item--link').each(function() {
        var txtLink = $(this).data('textlink');
        $(this).click(function() {
            window.open(txtLink);
            return false;
        })
    });
    $('.list__item--vip button[disabled]').each(function() {
        $(this).parent().addClass('list__item--disabled');
    });
    $('.list__item--vip').each(function() {
        $(this).click(function() {
            $('body').addClass('message__open');
            $('.black').addClass('opened');
            $('.message--vip').fadeIn();
        })
    });
    $('.list__item--disabled .btn--text').each(function() {
        $(this).click(function(e) {
            e.stopPropagation();
        });
    });
    $('.theater__close').click(function() {
        $('.theater').fadeOut();
        $('.theater iframe').attr('src', '');
        $('body').removeClass('message__open');
        $('.black').removeClass('opened black-theater');
    })

    function phaseText() {
        $('.list__group--author .phase').each(function() {
            var pwidth = $(this).outerWidth(),
                fontSize = 16,
                oneLine = Math.floor(pwidth / fontSize);
            if ($.trim($(this).text()).length > (oneLine * 3)) {
                $(this).siblings('.btn--text').show();
            } else {
                $(this).siblings('.btn--text').hide();
            }
        });
    }
    phaseText();
    var url = window.location.href,
        pathSpilt = url.split("/"),
        pathLastSpilt = pathSpilt[pathSpilt.length - 1],
        findLinkElement = $(".menubar__user--member > ul > li > .li__group > a[href$='" + pathLastSpilt + "'], aside.menubar--left > ul > li > .li__group > a[href$='" + pathLastSpilt + "']"),
        find2LinkElement = $(".menubar__user--member > ul > li > ul > li > .li__group > a[href$='" + pathLastSpilt + "'], aside.menubar--left > ul > li > ul > li > .li__group > a[href$='" + pathLastSpilt + "']");
    findLinkElement.parent().parent().addClass('now');
    find2LinkElement.parent().parent().addClass('now');
    find2LinkElement.parent().parent().parent().show();
    find2LinkElement.parent().parent().parent().parent().addClass('now');
    find2LinkElement.parent().parent().parent().siblings('.li__group').children('i.icon').addClass('active');
    $("a[href$='password']").click(function() {
        $(this).parent().parent().siblings().removeClass('now');
        $(this).parent().parent().addClass('now');
    });
    $(window).resize(function(width) {
        phaseText();
    })
});
// });// $(window).load(function() {
// 	$(window).resize(function(width) {
// 	})
// });