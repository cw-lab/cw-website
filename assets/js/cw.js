var width = $(window).width(),
    menubarUserClick = 0,
    searchClick = 0;

function lazyload() {
    $(".lazyload").each(function() {
        $(this).lazyload({
            effect : "fadeIn"
        });
        $(this).on('load', function() {
            $(this).parent().parent().addClass('finished');
        })
    });
}
lazyload();
// 圖片全螢幕
function imgZoom() {
    $('.imgzoom').each(function() {
        $(document).on("click", ".imgzoom", function() {
            var imgcode = $(this).data('zoom');
            $('body').addClass('opened');
            $('.black').addClass('opened black-fullscreen');
            $('.fullscreen img').attr('src', imgcode);
            $('.fullscreen').fadeIn();
        })
    });
    $(document).on("click", ".fullscreen", function() {
        $('body').removeClass('opened');
        $('.black').removeClass('opened black-fullscreen');
        $('.fullscreen img').attr('src', '');
        $('.fullscreen').fadeOut();
    });
    $(document).on("click", ".fullscreen__content", function(event) {
        event.stopPropagation();
    });
}
imgZoom();

WebFontConfig = {
    google: { families: [ 'Noto+Sans+TC:100,300,400,500,700','Noto Serif TC:200,300,400,500,600,700','Roboto:300,400,500,700' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

$(function() {
    var width = $(window).width(),
        height = $(window).height(),
        originTitle = $('title').text(),
        originLink = window.location.pathname.split("/").pop(),
        originString = window.location.search,
        // 判斷系統
        iphone = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null),
        android = (navigator.userAgent.match(/android/i) != null),
        ipad = navigator.userAgent.match(/iPad/i) != null,
        // 判斷瀏覽器
        chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        ie = false,
        old_ie = window.navigator.userAgent.indexOf('MSIE '),
        new_ie = window.navigator.userAgent.indexOf('Trident/');
    if (chrome) {
        $("body").addClass("chrome");
    }
    if (android || ipad || iphone) {
        $("body").addClass("mobile__device");
    }
    if (android) {
        $("body").addClass("android");
    }
    if ((old_ie > -1) || (new_ie > -1)) {
        ie = true;
    }
    if (ie) {
        $("body").addClass('ie');
        $("img.lazyload").each(function() {
            var source = $(this).data('src');
            $(this).attr('src', source);
        });
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
        if ($(this).hasClass("dialogs")) {
            $('.black').removeClass('opened dialogs');
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
        $('.channel__title').click(function() {
            $(this).children('i.icon').toggleClass('active');
            $(this).siblings('.channel__option').slideToggle();
            $(this).parent().siblings('.channel__item').children('.channel__title').children('i.icon').removeClass('active');
            $(this).parent().siblings('.channel__item').children('.channel__option').slideUp();
        })
    }

    // 打開小辭典
    function openDictionary() {
        $('.more').each(function() {
            $(this).click(function() {
                $(this).siblings('.more__text').slideToggle({
                    complete: function() {
                        var status = $(this).is(':visible') ? 'block' : 'none';
                        $(this).css('display', status);
                    },
                });
            });
        });
    }
    openDictionary();

    function adBlock() {
        $('[class*="cw__advertising"]').each(function() {
            if (($(this).height() < 80) && (!$(this).hasClass('ad--scrollvideo'))) {
                $(this).hide();
            }
        })
    }
    $('main').children('article').eq(0).attr({
        'data-title': originTitle,
        'data-link': originLink + originString
    });
    $(window).on('load', function() {
        var height = $(window).height(),
            footerHeight = $('footer').outerHeight(),
            container = $("header .container").outerWidth(),
            articleContainFluid = $(".article__info").outerWidth(),
            articleTextWidth = $(".article__text").outerWidth();
        // adBlock();
        if ((width >= 1024) && ($('footer').length !== 0)) {
            $('body').css({ 'padding-bottom': footerHeight });
        } else {
            $('body').css({ 'padding-bottom': 0 });
        }
        // 判斷有沒有值
        $("input.form__group__input").each(function() {
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
        });
        // 統計字數
        $('.form__group--countletter input').keyup(function() {
            $(this).siblings('i').children('span').html(this.value.length);
        });
        // 是否顯示密碼
        $('.form__group .icon-eye').click(function() {
            $(this).siblings('input').attr('type',
                $(this).siblings('input').attr('type') === 'password' ? 'text' : 'password'
            );
            $(this).toggleClass('icon-eyeoff icon-eyeon');
        })

        function input() {
            $("input.form__group__input").parent().addClass('form__group--defalt');
            $("input.form__group__input[disabled]").parent().removeClass('form__group--defalt').addClass('form__group--disabled');
        }

        function select() {
            $("select").parent().addClass('select__group--defalt');
            $("select[disabled]").parent().removeClass('select__group--defalt').addClass('select__group--disabled');
        }
        input();
        select();
        $("input.form__group__input").change(function() {
            input();
        })
        $("select").change(function() {
            select();
        })
        $(".select__group--undone").click(function() {
            $(this).removeClass("select__group--undone")
        });
        // tabs
        $(".tab__nav > ul li").click(function() {
            var tabsIndex = $(this).index();
            if (!$(this).parent().parent().parent().parent(".group").hasClass("group--disabled")) {
                $(this).addClass('active').siblings('.active').removeClass('active');
                $(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').removeClass('active');
                $(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').eq(tabsIndex).addClass('active');
            }
        });
        $(".tab--recommend .card__group .card__title").each(function() {
            var num = $(this).data('title');
            if (($(this).data('title').length >= 21) && (width >= 768)) {
                $(this).text(num.substr(0, 20) + '...');
            } else {
                $(this).text(num);
            }
        });
        // 當裝置大於等於768時，將tab__nav寬度設為等分
        function tabNavWidth(width) {
            $(".tab").each(function() {
                var tabLength = $(this).children(".tab__nav").children("ul").children("li").length,
                    tabWidth = $(this).width(),
                    tabLiWidth = $(this).width() / tabLength,
                    tabUlWidth = (140 * (tabLength)),
                    scrollWidth = Math.floor((tabWidth - 100) / 140),
                    tab_index = 0,
                    index = 0;
                $(this).children(".tab__nav").not(".tab__nav--inline").children("ul").children("li").css("width", tabLiWidth);
                if (tabLiWidth < 130) {
                    $(this).children(".tab__nav").addClass("tab__nav--overflow");
                }
                if (width < 768) {
                    $(this).children(".tab__nav").children("ul").children("li").css("width", tabLiWidth);
                }
                if (width >= 768) {
                    var tabUlWidth = (140 * (tabLength + 1));
                    if (tabLiWidth < 130) {
                        $(this).append("<i class='icon icon-right click-right'></i>");
                    }
                    $(this).children(".click-right").click(function() {
                        $(this).siblings(".tab__nav").children("ul").animate({ left: "-=" + (140 * scrollWidth) }, function() {
                            if (index >= scrollWidth - 1) {
                                index = -1;
                                $(this).animate({ "left": 0 }, 300);
                            }
                            index++;
                        });
                    });
                }
            });
        }
        tabNavWidth(width);
        // 當tooltips大於等於15字
        $(".tooltips").each(function() {
            if ($(this).data("tooltips").length >= 15) {
                $(this).addClass("tooltips-wrap");
            };
        });
        // menu寬度平分
        $("nav.menubar--belt").each(function() {
            $(this).children().children().css({
                "width": ($(this).outerWidth() / $(this).children().children().length) + "px"
            });
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
        // 會員中心暫時用
        if (location.href.match('/member')) {
            $('.menubar__user--login i.icon').click(function() {
                $(this).toggleClass('icon-close');
                $('.menubar__user--member').slideToggle();
            });
        }
        // message: Notification 3 秒後關閉
        // setTimeout(function() {
        // 	$(".message--notification").fadeOut();
        // }, 3000);
        // message: 點擊 message__open 開啟
        $(".message__open").on("click", function() {
            var messageID = $(this).attr("id");
            $('body').removeClass('message__open');
            $('.black').toggleClass('opened');
            $(".message." + messageID).fadeIn();
        });
        // message: Dialogs 點擊X關閉
        $(".message__close").on("click", function() {
            $(this).parent().parent().fadeOut();
            $('.black').toggleClass('opened');
            $('body').removeClass('message__open');
        });
        $(".btn__close").on("click", function() {
            $(this).parent().parent().parent().fadeOut();
            $('.black').toggleClass('opened');
            $('body').removeClass('message__open');
        });
        // message--alert, .message--dialogs 絕對定位
        // $(".message--alert, .message--dialogs").animate({
        // 	"top": (height / 2)
        // }, 10);
        // 字體大小放大縮小
        fzLevel = 0,
            fzClass = 'article__level--' + fzLevel;
        $('main').on("click", '.function__scale', function() {
            fzLevel < 2 ? fzLevel++ : fzLevel = 0;
            fzClass = 'article__level--' + fzLevel;
            $('article').attr("class", "mt30");
            $('article').addClass(fzClass);
            return false;
        });
        // width <= 1024，點擊後出現 tooltips
        if (width <= 1024) {
            $(".tooltips").click(function() {
                $(this).toggleClass("active");
            })
        }
        $(".accordion__item__header").on("click", function() {
            $(this).parent().siblings().children(".accordion__item__panel").slideUp();
            $(this).parent().siblings().children(".accordion__item__header").removeClass("active");
            $(this).parent().siblings().children(".accordion__item__header").children("i.icon").addClass("icon-plus");
            $(this).parent().siblings().children(".accordion__item__header").children("i.icon").removeClass("icon-minus");
            $(this).toggleClass("active");
            $(this).children("i.icon").toggleClass("icon-plus");
            $(this).children("i.icon").toggleClass("icon-minus");
            $(this).siblings(".accordion__item__panel").slideToggle();
        });
        // 全閱讀 secant project
        var rightHeights = $('.plan__item .plan__item__right').map(function() {
            return $(this).outerHeight();
        }).get();
        var highestCol = Math.max.apply(null, rightHeights);
        if (width >= 768) {
            $(".plan__item__right").height(highestCol);
        } else {
            $(".plan__item__right").height('');
        }
        $("#chageInvoicing").on("click", function() {
            $(this).parent().parent().parent().slideUp();
            $(this).parent().parent().parent().siblings(".select-invoicing").slideDown();
        })
        $(".tab__content__pane.active > .label").on("click", function() {
            if (!$(this).parent().parent().parent().parent(".group").hasClass("group--disabled")) {
                $(this).siblings().children(".form__group--input").css({
                    "display": "none"
                });
                $(this).children(".form__group--input").css({
                    "display": "block"
                });
            };
        });
        $(window).scroll(function() {
            var scroll = $(window).scrollTop(),
                adFirstHeight = $('body > .ad--970by250').outerHeight(),
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
        });
        $(window).resize(function(width) {
            var width = $(window).width(),
                height = $(window).height(),
                footerHeight = $('footer').outerHeight();
            if (width >= 1024) {
                $('body').css({ 'padding-bottom': footerHeight });
            } else {
                $('body').css({ 'padding-bottom': 0 });
            }

            tabNavWidth(width);
            if (width >= 768) {
                $(".plan__item__right").height(highestCol);
            } else {
                $(".plan__item__right").height('');
            }
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