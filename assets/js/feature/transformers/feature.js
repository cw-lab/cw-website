$(function() {
    var width = $(window).width(),
        height = $(window).height();
    // slideshow
    $(".slideshow").each(function() {
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
        $slider_item.first().clone().css({
            "width": slider_item_width
        }).appendTo($slider_wrap);
        $slider_wrap.css({
            "width": slider_item_width * (slider_count + 1),
        });
        $thumbnail_item.clone().appendTo($thumbnail_wrap);
        $thumbnail_item.first().addClass('active');
        $thumbnail_wrap.css({
            "width": thumbnail_item_width * (thumbnail_count * 2),
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
        if (width >= 1024) {
            $thumbnail_wrap.css({
                "width": (thumbnail_item_width * (thumbnail_count * 2)) + (15 * ((thumbnail_count * 2) - 1)),
            });
        } else {
            $thumbnail_wrap.css({
                "width": (thumbnail_item_width * (thumbnail_count * 2)) + (10 * ((thumbnail_count * 2) - 1)) + 60,
            });
        }
        $('img.slider__blur').css({
            'height': $slider_item.outerHeight()
        })
        $slider_item.css({
            "width": slider_item_width
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
    })
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