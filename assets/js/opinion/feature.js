$(function(){
	var width = $(window).width(),
		height = $(window).height(),
		hcontainer = $("header .container").outerWidth(),
		articleContainFluid =  $(".article__info").outerWidth(),
		articleTextWidth =  $(".article__text").outerWidth();
	// 判斷瀏覽器
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	if(isChrome) {
		$("body").addClass("chrome");
	}
	// 漢堡
	$('body').append('<div class="black"></div>');
	$('.hamburger').click(function () {
		$('.menubar--left').addClass('opened');
		$('.black').addClass('opened menubar--left');
	});
	$('.slider__title > span').each(function () {
		$(this).css({
			// 'padding-right': ((width - hcontainer) / 2)
		});
	})
	$('.black').click(function () {
		if ($(this).hasClass("menubar--left")) {
			$('.menubar--left').removeClass('opened');
			$('.black').removeClass('opened menubar--left');
		}
		if ($(this).hasClass("message--dialogs")) {
			$('.black').removeClass('opened message--dialogs');
			$('.message--dialogs').fadeOut(200);
		}
	});
	// slideshow
	$(".slideshow").each(function () {
		var $slider = $(this).children(".slider"),
			$sliderCountDiv = $(this).children(".slider__count"),
			$slider_wrap = $(this).children(".slider").children(".slider__wrap"),
			$slider_dot = $(this).children(".slider__dot"),
			$slider_navi_prev = $(this).children(".slider__navi--prev"),
			$slider_navi_next = $(this).children(".slider__navi--next"),
			$slider_item = $slider_wrap.children(".slider__item"),
			slider_item_width = $(this).parent().outerWidth(), //每張slide寬度
			slider_count = $slider_item.length,
			slider_item_index = 0, //預宣告slide為0
			index = 0,
			dot = "";
		for (var i = 0; i < slider_count; i++) {
			dot += "<li";
			if (i == 0) {
				dot += " class=\"active\"";
			}
			dot += "></li>";
		}
		$slider_dot.html(dot);
		if( $(this).hasClass('slideshow--image') && (width >= 768) && (width < 1024) ) {
			var slider_item_w = slider_item_width - 90;
		} else if( $(this).hasClass('slideshow--image') && (width < 768) ) {
			var slider_item_w = slider_item_width - 100;
		} else {
			var slider_item_w = slider_item_width;
		}
		$slider_item.first().clone().css({
			"width": slider_item_w
		}).appendTo($slider_wrap);
		$slider_wrap.css({
			"width": slider_item_w * (slider_count + 1),
		});
		$slider_item.css({
			"width": slider_item_w
		});
		$(this).children(".slider__navi").css({
			"top": $slider_item.children("img").outerHeight() / 2
		});
		function switch_next() {
			if ($slider_wrap.is(":animated")) return;
			$slider_wrap.animate({ left: "-=" + slider_item_w }, function() {
				if (index >= slider_count - 1) {
					index = -1;
					$(this).css("left", 0);
				}
				index++;
				switch_item();
			});
		}
		function switch_item() {
			$slider_dot.children("li.active").removeClass();
			$slider_dot.children("li").eq(index).addClass("active");
		}
		function switch_prev() {
			if ($slider_wrap.is(":animated")) return;
			if (index <= 0) {
				index = slider_count;
				$slider_wrap.css("left", -(index * slider_item_w));
			}
			$slider_wrap.animate({ left: "+=" + slider_item_w }, function() {
				index--;
				switch_item();
			});
		}
		$slider_navi_next.click(switch_next);
		$slider_navi_prev.click(switch_prev);
		$slider_dot.children("li").click(function() {
			index = $(this).index();
			$slider_wrap.animate({ left: index * -slider_item_w }, switch_item);
		});
	});
	// cardshow
	$(".cardshow").each(function () {
		var $carder = $(this).children(".carder"),
			$carder_group = $(this).children(".carder").children(".card__group"),
			$carder_dot = $(this).children(".slider__dot"),
			$carder_navi_prev = $(this).children(".slider__navi--prev"),
			$carder_navi_next = $(this).children(".slider__navi--next"),
			$carder_item = $carder_group.children(".card__item"),
			carder_count = $carder_item.length,
			carder_item_index = 0, //預宣告slide為0
			index = 0,
			dot = "";
		if( width >= 1024 ) {
			var carder_item_width = (($(this).outerWidth() - 50) / 3),
				carder_item_slide = carder_item_width + 25;
			for (var i = 0; i < (carder_count - 2); i++) {
				dot += "<li";
				if (i == 0) {
					dot += " class=\"active\"";
				}
				dot += "></li>";
			}
			$carder_item.clone().css({
				"width": carder_item_width
			}).appendTo($carder_group);
			$carder_group.css({
				"width": (carder_item_width * (carder_count * 2)) + (25 * ((carder_count * 2) - 1)),
			});
			$carder_item.css({
				"width": (($(this).outerWidth() - 50) / 3),
			});
		} else if ( width >= 768 && width < 1024 ) {
			var carder_item_width = (($(this).outerWidth() - 60 - 25) / 2),
				carder_item_slide = carder_item_width + 25;
			for (var i = 0; i < (carder_count - 1); i++) {
				dot += "<li";
				if (i == 0) {
					dot += " class=\"active\"";
				}
				dot += "></li>";
			}
			$carder_item.clone().css({
				"width": carder_item_width
			}).appendTo($carder_group);
			$carder_group.css({
				"width": (carder_item_width * (carder_count * 2)) + (25 * ((carder_count * 2) - 1)),
			});
			$carder_item.css({
				"width": carder_item_width,
			});
		} else {
			var carder_item_width = $(this).parent().outerWidth() - 100,
				carder_item_slide = $carder_item.outerWidth()
			for (var i = 0; i < carder_count; i++) {
				dot += "<li";
				if (i == 0) {
					dot += " class=\"active\"";
				}
				dot += "></li>";
			}
			$carder_item.first().clone().css({
				"width": carder_item_width
			}).appendTo($carder_group);
			$carder_group.css({
				"width": carder_item_width * (carder_count + 1),
			});
			$carder_item.css({
				"width": carder_item_width,
			});
		}
		$carder_dot.html(dot);
		$(this).children(".slider__navi").css({
			"top": $carder.outerHeight() / 2
		});
		function switch_next() {
		    if ($carder_group.is(":animated")) return;
		    $carder_group.animate({ left: "-=" + carder_item_slide }, function() {
		        if (index >= carder_count - 1) {
		            index = -1;
		            $(this).css("left", 0);
		        }
		        index++;
		        switch_item();
		    });
		}
		function switch_item() {
		    $carder_dot.children("li.active").removeClass();
		    $carder_dot.children("li").eq(index).addClass("active");
		}
		function switch_prev() {
		    if ($carder_group.is(":animated")) return;
		    if (index <= 0) {
		        index = carder_count;
		        $carder_group.css("left", -(index * carder_item_slide));
		    }
		    $carder_group.animate({ left: "+=" + carder_item_slide }, function() {
		        index--;
		        switch_item();
		    });
		}
		$carder_navi_next.click(switch_next);
		$carder_navi_prev.click(switch_prev);
		$carder_dot.children("li").click(function() {
			index = $(this).index();
			$carder_group.animate({ left: index * -carder_item_slide }, switch_item);
		});
	});
	$("p.preface").each(function () {
		var preface_height = $(this).outerHeight();
		console.log(preface_height);
		if ( (preface_height > 100) && (width < 768) ) {
			$(this).addClass('hidden');
			$(this).after('<button class="btn btn--outlined btn--preface">展開</button>');
		}
	})
	$(".btn--preface").on("click", function () {
		$(this).siblings("p").removeClass('hidden');
		$(this).remove();
	})
})