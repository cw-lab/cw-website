$(function() {
    var width = $(window).width(),
        height = $(window).height(),
        container = $(".header__logo .container").outerWidth();
    // 漢堡
    $('body').append('<div class="black"></div>');
    $('.hamburger').click(function() {
        $('.menubar--left').addClass('opened');
        $('.black').addClass('opened menubar--left');
    });
    $('.black').click(function() {
        if ($(this).hasClass("menubar--left")) {
            $('.menubar--left').removeClass('opened');
            $('.black').removeClass('opened menubar--left');
        }
        if ($(this).hasClass("message--dialogs")) {
            $('.black').removeClass('opened message--dialogs');
            $('.message--dialogs').fadeOut(200);
        }
    });

    function menubarSub(width, container) {
        $(".menubar--sub2").css({
            "right": ((width - container) / 2)
        });
    }
    menubarSub(width, container);
    $("nav[class*='menubar--sub'] ul.menubar__user > li, .opacity").click(function() {
            $(".menubar__user__slide").slideToggle();
            $("nav[class*='menubar--sub'] ul.menubar__user > li > a > i").toggleClass("deg");
            $('.opacity').toggleClass('opened');
        })
        // slideshow
    function slideshow() {
        var $slider = $(this).children(".slider"),
            $sliderCountDiv = $(this).children(".slider__count"),
            $slider_wrap = $(this).children(".slider").children(".slider__wrap"),
            $thumbnail_wrap = $(this).children(".slider__thumbnail").children(".slider__wrap__thumbnail"),
            $slider_navi_prev = $slider.children(".slider__navi__group").children(".slider__navi--prev"),
            $slider_navi_next = $slider.children(".slider__navi__group").children(".slider__navi--next"),
            $slider_item = $slider_wrap.children(".slider__item"),
            $thumbnail_item = $thumbnail_wrap.children("li"),
            slider_item_width = $(this).parent().outerWidth(), //每張slide寬度
            thumbnail_item_width = $thumbnail_item.outerWidth(), //每張slide寬度
            slider_count = $slider_item.length,
            thumbnail_count = $thumbnail_item.length,
            slider_item_index = 0, //預宣告slide為0
            index = 0;
        $thumbnail_item.clone().appendTo($thumbnail_wrap);
        $thumbnail_item.first().addClass('active');
        $thumbnail_wrap.css({
            "width": thumbnail_item_width * (thumbnail_count * 2) + 15 * (thumbnail_count * 2),
            "left": 0,
        })
        $thumbnail_wrap.children("li").click(function() {
            index = $(this).index();
            if (index >= thumbnail_count) {
                index = index - thumbnail_count
            }
            $slider_item.removeClass("active");
            $slider_item.eq(index).addClass("active");
            switch_item_horizon();
        });
        $slider.children(".slider__navi").css({
            "top": $slider_item.children("img").outerHeight() / 2
        });
        $thumbnail_wrap.children("li").click(function() {
            index = $(this).index();
            if (index >= thumbnail_count) {
                index = index - thumbnail_count
            }
            $slider_wrap.css("left", -(index * slider_item_width));
            switch_item_horizon();
        });
        // console.log(slider_item_width);
        $sliderCountDiv.html("<i class='icon icon-images'></i><span class='now'>" + (index + 1) + "</span><span class='slash'>/</span><span class='total'>" + slider_count + "</span>");
        var maxHeight = 0;
        $slider_item.each(function() {
            if ($(this).outerHeight() > maxHeight) {
                maxHeight = $(this).outerHeight();
            }
        }).parent().height(maxHeight);

        function switch_next() {
            if ($slider_wrap.is(":animated")) return;
            $slider_wrap.animate({ left: "-=" + slider_item_width }, function() {
                if (index >= slider_count - 2) {
                    index = -1;
                    $(this).css("left", 0);
                }
                index++;
                switch_item_horizon();
            });
        }

        function switch_item_horizon() {
            $thumbnail_item.removeClass('active');
            $thumbnail_item.eq(index).addClass('active');
            $thumbnail_wrap.css({
                "left": -((thumbnail_item_width + 15) * index)
            })
        }

        function switch_prev() {
            if ($slider_wrap.is(":animated")) return;
            if (index <= 0) {
                index = slider_count - 1;
                $slider_wrap.css("left", -(index * slider_item_width));
            }
            $slider_wrap.animate({ left: "+=" + slider_item_width }, function() {
                index--;
                switch_item_horizon();
            });
        }
        $slider_navi_next.click(switch_next);
        $slider_navi_prev.click(switch_prev);
    }
    $(".slideshow").each(slideshow);
    $("p.preface").each(function() {
        var preface_height = $(this).outerHeight();
        console.log(preface_height);
        if ((preface_height > 100) && (width < 1024)) {
            $(this).addClass('hidden');
            $(this).after('<button class="btn btn--outlined btn--preface">展開</button>');
        }
    })
    $(".btn--preface").on("click", function() {
        $(this).siblings("p").removeClass('hidden');
        $(this).remove();
    });
    if (width < 1024) {
        $("nav .sns__group").animate({
            "top": height - 115
        }, 20);
    }
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (width < 1024) {
            $("nav .sns__group").animate({
                "top": scroll + height - 115
            }, 20);
        }
    })
})