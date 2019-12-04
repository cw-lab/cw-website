$(function() {
	var width = $(window).width(),
		height = $(window).height();
	// 判斷瀏覽器
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	if (isChrome) {
		$("body").addClass("chrome");
	}
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
	$('.slideshow--column .slider__wrap').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
		dots: true
	});
	$('.slideshow--image .slider__wrap').slick({
		autoplay: false,
		autoplaySpeed: 3000,
		dots: true,
		prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-left"></i></a></div>',
		nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-right"></i></a></div>',
	});
	$('.card__group').slick({
		slidesToShow: 3,
		autoplay: false,
		autoplaySpeed: 3000,
		dots: true,
		prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-left"></i></a></div>',
		nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-right"></i></a></div>',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$(window).load(function() {
		var width = $(window).width(),
			height = $(window).height();
		$("p.preface").each(function() {
			var preface_height = $(this).outerHeight();
			if ((preface_height > (1.125*16*1.8*3)) && (width < 1024)) {
				$(this).addClass('hidden');
				$(this).after('<button class="btn btn--outlined btn--preface">展開</button>');
			}
		});
		$(".btn--preface").on("click", function() {
			$(this).siblings("p").removeClass('hidden');
			$(this).remove();
		});
		function naviTop(width) {
			$('.slideshow--image').each(function(){
				var itemHeight = $(this).outerWidth() * 426 / 640;
				$(this).find('.slider__navi').css('top', itemHeight/2);
			});
		}
		function dotsTop(width) {
			$('.slider__title').each(function(){
				var titleHeight = $(this).outerHeight() - 36;
				if (width <= 1023) {
					$(this).siblings().find('.slick-dots').css('top', 'calc(100% + ' + titleHeight + 'px)');
				} else {
					$(this).siblings().find('.slick-dots').css('top', 'auto');
				}
			});
		}
		naviTop(width);
		dotsTop(width);
		$(window).resize(function() {
			var width = $(window).width(),
				height = $(window).height(),
				sliderWidth;
			naviTop(width)
			dotsTop(width);
		});
	});
})