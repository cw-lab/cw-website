$(function() {
	new WOW().init();
	$('.slider-item--1').slick({
		infinite: true,//loop
		dots: false,
		arrows: false,
		slidesToShow: 1,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 0,//不停留一直跑
		speed: 8000,//跑的速度
		cssEase: 'linear',
		pauseOnHover: false,
		pauseOnFocus: false,
		touchMove: false,
	});
	$('.slider-item--2').slick({
		infinite: true,//loop
		dots: false,
		arrows: false,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 2000,//不停留一直跑
		speed: 300,//跑的速度
		fade: true,
		cssEase: 'linear',
		pauseOnHover: false,
		pauseOnFocus: false,
		touchMove: false,
	});
	$('.slider-item--3').slick({
		infinite: true,//loop
		dots: false,
		arrows: true,
		slidesToShow: 1,
		speed: 300,//跑的速度
		cssEase: 'linear',
		pauseOnHover: false,
		pauseOnFocus: false,
		touchMove: false,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon icon-right"></i></button>',
	});  
	$(window).resize(function(){
		var height = $(window).height();
	})
})