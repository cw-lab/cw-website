$(window).load(function() {
	var width = $(window).width(),
		height = $(window).height(),
		container = $(".header__logo .container").outerWidth(),
		slider_item_width, $slider_wrap;
	function menubarSub(width, container) {
		$(".menubar--sub2").css({
			"right": ((width - container) / 2)
		});
	}
	menubarSub(width, container);
	// slideshow
	$(".slideshow.multi").each(function() {
		var $slider = $(this).children(".slider"),
			$sliderCountDiv = $(this).children(".slider__count"),
			$slider_wrap = $(this).children(".slider").children(".slider__wrap"),
			$thumbnail_wrap = $(this).children(".slider__thumbnail").children(".slider__wrap__thumbnail"),
			$slider_navi_prev = $slider.children(".slider__navi--prev"),
			$slider_navi_next = $slider.children(".slider__navi--next"),
			$slider_item = $slider_wrap.children(".slider__item"),
			$thumbnail_item = $thumbnail_wrap.children("li"),
			slider_item_width = $(this).parent().outerWidth(), //每張slide寬度
			thumbnail_item_width = $thumbnail_item.outerWidth(), //每張slide寬度
			slider_count = $slider_item.length,
			thumbnail_count = $thumbnail_item.length,
			thumbnail_shot_count = Math.floor(slider_item_width / thumbnail_item_width),
			slider_item_index = 0, //預宣告slide為0
			index = 0;
		$slider_item.first().clone().css({
			"width": slider_item_width
		}).appendTo($slider_wrap);
		$slider_wrap.css({
			"width": slider_item_width * (slider_count + 1),
		});
		// $thumbnail_item.clone().appendTo($thumbnail_wrap);
		$thumbnail_item.first().addClass('active');
		$thumbnail_wrap.css({
			"left": 0,
		})
		$thumbnail_wrap.children("li").click(function() {
			index = $(this).index();
			if (index >= thumbnail_count) {
				index = index - thumbnail_count
			}
			switch_item_horizon();
			$slider_item.removeClass("active");
			$slider_item.eq(index).addClass("active");
		});
		if (slider_count > 1) {
			$slider.children(".slider__navi").fadeIn()
		}
		if (width >= 1024) {
			$thumbnail_wrap.css({
				"width": (thumbnail_item_width * thumbnail_count) + (15 * (thumbnail_count - 1)),
			});
		} else {
			$thumbnail_wrap.css({
				"width": (thumbnail_item_width * thumbnail_count) + (10 * (thumbnail_count - 1)) + 60,
			});
		}
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
			switch_item_horizon();
			$slider_wrap.css("left", -(index * slider_item_width));
		});
		$slider_navi_next.click(switch_next);
		$slider_navi_prev.click(switch_prev);
		function switch_next() {
			if ($slider_wrap.is(":animated")) return;
			$slider_wrap.animate({ left: "-=" + slider_item_width }, function() {
				if (index >= slider_count - 1) {
					index = -1;
					$(this).css("left", 0);
				}
				index++;
				switch_item_horizon();
			});
		}
		function switch_item_horizon() {
			$thumbnail_item.removeClass('active').eq(index).addClass('active');
			if (index >= (Math.floor(thumbnail_shot_count / 2))) {
				if (width >= 1024) {
					$thumbnail_wrap.css({
						"left": -((thumbnail_item_width + 15) * (index - (Math.floor(thumbnail_shot_count / 2))))
					});
				} else {
					$thumbnail_wrap.css({
						"left": -((thumbnail_item_width + 10) * (index - (Math.floor(thumbnail_shot_count / 2))))
					});
				}
			} else {
				$thumbnail_wrap.css({
					"left": 0
				});
			}
			if (index >= (thumbnail_count - (Math.floor(thumbnail_shot_count / 2) + 1))) {
				$thumbnail_wrap.css({
					"left": $('.slider__thumbnail').outerWidth() - $thumbnail_wrap.outerWidth()
				});
			}
		}
		function switch_prev() {
			if ($slider_wrap.is(":animated")) return;
			if (index <= 0) {
				index = slider_count;
				$slider_wrap.css("left", -(index * slider_item_width));
			}
			$slider_wrap.animate({ left: "+=" + slider_item_width }, function() {
				index--;
				switch_item_horizon();
			});
		}
	});
	$("p.preface").each(function() {
		var preface_height = $(this).outerHeight();
		// console.log(preface_height);
		if ((preface_height > 100) && (width < 1024)) {
			$(this).addClass('hidden');
			$(this).after('<button class="btn btn--outlined btn--preface">展開</button>');
		}
	});
	$(".btn--preface").on("click", function() {
		$(this).siblings("p").removeClass('hidden');
		$(this).remove();
	});
	$(window).scroll(function() {
		var width = $(window).width(),
			scroll = $(window).scrollTop(),
			container = $(".header__logo .container").outerWidth();
		menubarSub(width, container);
		if (width < 1024) {
			$("nav .sns__group").css({
				"top": scroll + height - 165 - $('.message--banner').outerHeight()
			}, 20);
			if (scroll >= height) {
				$("nav .sns__group").css('opacity', 1);
			} else {
				$("nav .sns__group").css('opacity', 0);
			}
		}
	});
});