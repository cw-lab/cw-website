$(function() {
	var width = $(window).width(),
		height = $(window).height(),
		sliderWidth;
	function imgResize(width, height) {
		$(".slider__img").each(function() {
			var desktopImg = $(this).data('desktop'),
				mobileImg = $(this).data('mobile');
			if ((width / height) <= 1) {
				$(this).attr('src', mobileImg)
			} else {
				$(this).attr('src', desktopImg)
			}
		});
	}
	imgResize(width, height);
	$('.slideshow.single .slider__wrap').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-left"></i></a></div>',
		nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-right"></i></a></div>'
	});
	$('.slideshow.multi .slider__wrap').slick({
		asNavFor: '.slideshow.multi .slider__thumbnail',
		prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center navi-btn"><i class="icon icon--white icon-left"></i></a></div>',
		nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center navi-btn"><i class="icon icon--white icon-right"></i></a></div>'
	});
	$('.slideshow.multi .slider__thumbnail').slick({
		slidesToShow: 5,
		asNavFor: '.slideshow.multi .slider__wrap',
		arrows: false,
		centerMode: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});
	function naviHeigh(sliderWidth) {
		$('.slideshow.multi').each(function() {
			var sliderWidth = $(this).outerWidth(),
				imgHeigh = 422 / 630 * sliderWidth;
			$(this).children().children('.slider__navi--prev').css('top', imgHeigh / 2);
			$(this).children().children('.slider__navi--next').css('top', imgHeigh / 2);
		});
	}
	naviHeigh(sliderWidth);
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
		$("p.preface").each(function() {
			var preface_height = $(this).outerHeight();
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
				height = $(window).height(),
				scroll = $(window).scrollTop(),
				container = $(".header__logo .container").outerWidth();
			menubarSub(width, container);
			if (scroll >= height) {
				$(".sns__group").css('opacity', 1);
			} else {
				$(".sns__group").css('opacity', 0);
			}
		});

	});
	$(window).resize(function() {
		var width = $(window).width(),
			height = $(window).height(),
			sliderWidth;
		imgResize(width, height);
		naviHeigh(sliderWidth);
	});
});