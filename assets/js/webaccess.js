$(function() {
	var height = $(window).height();
	function opening(height){
		if(height > 1020) {
			$('section#access').addClass('sp');
			$('section#access').css('min-height', 'auto');
		} else {
			$('section#access').removeClass('sp');
			$('section#access').css('min-height', (height - 80));
		}
	}
	opening(height);
	// slideshow
	$(".slideshow").each(function() {
		var $slider = $(this).children(".slider"),
			$sliderCountDiv = $(this).children(".slider__count"),
			$slider_wrap = $(this).children(".slider").children(".slider__wrap"),
			$slider_navi_prev = $(this).children(".slider__navi--prev"),
			$slider_navi_next = $(this).children(".slider__navi--next"),
			$slider_item = $slider_wrap.children(".slider__item"),
			slider_item_width = $slider_item.outerWidth(), //每張slide寬度
			slider_count = $slider_item.length,
			slider_item_index = 0, //預宣告slide為0
			index = 0;
		$slider_item.clone().css({
			"width": slider_item_width
		}).appendTo($slider_wrap);
		$slider.css({
			"width": slider_item_width
		});
		$slider_wrap.css({
			"margin-left": -slider_item_width,
			"width": slider_item_width * (slider_count * 2)
		});
		$slider_item.css({
			"width": slider_item_width
		});

		function switch_next() {
			if ($slider_wrap.is(":animated")) return;
			$slider_wrap.animate({ left: "-=" + slider_item_width }, function() {
				if (index >= slider_count - 1) {
					index = -1;
					$(this).css("left", 0);
				}
				index++;
			});
		}

		function switch_prev() {
			if ($slider_wrap.is(":animated")) return;
			if (index <= 0) {
				index = slider_count;
				$slider_wrap.css("left", -(index * slider_item_width));
			}
			$slider_wrap.animate({ left: "+=" + slider_item_width }, function() {
				index--;
			});
		}
		$slider_navi_next.click(switch_next);
		$slider_navi_prev.click(switch_prev);
		setInterval(function() {
			switch_next();
		}, 3000)
	})
	// accordion
	$(".accordion__item__header").on("click", function() {
	    $(this).parent().siblings().children(".accordion__item__panel").slideUp();
	    $(this).parent().siblings().children(".accordion__item__header").removeClass("active");
	    $(this).parent().siblings().children(".accordion__item__header").children("i.icon").addClass("icon-plus");
	    $(this).parent().siblings().children(".accordion__item__header").children("i.icon").removeClass("icon-minus");
	    $(this).toggleClass("active");
	    $(this).children("i.icon").toggleClass("icon-plus");
	    $(this).children("i.icon").toggleClass("icon-minus");
	    $(this).siblings(".accordion__item__panel").slideToggle();
	})
	$(window).resize(function(){
		var height = $(window).height();
		opening(height);
	})
})