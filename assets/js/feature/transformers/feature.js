$(function() {
	var width = $(window).width(),
		height = $(window).height(),
		sliderWidth;
	// 漢堡
	$('body').append('<div class="opacity"></div>');
	$('.opacity').click(function() {
		$('.opacity').removeClass('opened');
		if ($(this).hasClass("menubar__user")) {
			$('.menubar__user--login .desktop i.icon').removeClass('active');
			$('.opacity').removeClass('menubar__user');
			$('.menubar__user--member').slideUp();
		}
	});
	$(".menubar__user--member > ul > li > .li__group > i.more").click(function(event) {
		$(this).toggleClass("active");
		$(this).parent().parent().siblings().children().children("i.more").removeClass("active");
		$(this).parent().parent().siblings().children("ul").slideUp();
		$(this).parent().siblings("ul").slideToggle();
	   	event.stopPropagation();
	})
	$(".li__group--id").click(function(event){
		event.stopPropagation();
	})
	// 第二層
	$("nav[class*='menubar--sub'] ul.menubar__user > li").click(function() {
		$(this).children(".menubar__user--member").slideToggle();
		$(this).children('.menubar__user--login, .menubar__user--signin').children('.desktop').children('i.icon-down').toggleClass("active");
		$(this).children('.menubar__user--login, .menubar__user--signin').children('.mobile').children('i').toggleClass("icon-user-filled icon-cancel");
		$(".opacity").toggleClass("opened menubar__user");
		if (width < 1024) {
			$("body").toggleClass("slide__open");
		} else {
			$("body").removeClass("slide__open");
		}
	})
	if (width < 1024) {
		$(".menubar__user--member").css("height", (window.innerHeight - $('header').offset().top - $('header').outerHeight() + 4) + "px");
	} else {
		$(".menubar__user--member").css("height", "auto");
		if ($('.menubar__user--member').siblings().hasClass('menubar__user--signin')) {
			$('.menubar__user--member').hide();
			$('nav.menubar--sub2 .menubar__user .menubar__user--signin .mobile i.icon').removeClass("icon-cancel").addClass("icon-user-filled");
		}
	}
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
		fade: true,
		prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-left"></i></a></div>',
		nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center"><i class="icon icon--white icon-right"></i></a></div>'
	});
	$('.slideshow.multi .slider__wrap').slick({
		autoplay: false,
		fade: true,
		asNavFor: '.slideshow.multi .slider__thumbnail',
		prevArrow: '<div class="slider__navi slider__navi--prev"><a class="icon-btn icon-btn-center navi-btn"><i class="icon icon--white icon-left"></i></a></div>',
		nextArrow: '<div class="slider__navi slider__navi--next"><a class="icon-btn icon-btn-center navi-btn"><i class="icon icon--white icon-right"></i></a></div>'
	});
	$('.slideshow.multi .slider__thumbnail').slick({
		slidesToShow: 5,
		asNavFor: '.slideshow.multi .slider__wrap',
		arrows: false,
		focusOnSelect: true,
		centerMode: true,
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
		if (width >= 768) {
			$('.slideshow.multi .slider__thumbnail').each(function(){
				if ( $(this).children('.slick-list').children('.slick-track').children('.thumbnail__img').length < 5 ) {
					$(this).addClass('fixed');
				} else {
					$(this).removeClass('fixed');
				}
			});
		} else {
			$('.slider__title').each(function(){
				var titleHeight = $(this).outerHeight();
				$(this).siblings().find('.slider__ground').height(titleHeight);
			});
		}
		$(window).scroll(function() {
			var width = $(window).width(),
				scroll = $(window).scrollTop(),
				container = $(".header__logo .container").outerWidth();
			if (scroll >= height) {
				$(".sns__group").css('opacity', 1);
			} else {
				$(".sns__group").css('opacity', 0);
			}
		});
		$(window).resize(function() {
			var width = $(window).width(),
				height = $(window).height(),
				sliderWidth;
			imgResize(width, height);
			naviHeigh(sliderWidth);
			if (width < 1024) {
				$(".menubar__user--member").css("height", (window.innerHeight - 60) + "px");
			} else {
				$(".menubar__user--member").css("height", "auto");
				if ($('.menubar__user--member').siblings().hasClass('menubar__user--signin')) {
					$('.menubar__user--member').hide();
					$('nav.menubar--sub2 .menubar__user .menubar__user--signin .mobile i.icon').removeClass("icon-cancel").addClass("icon-user-filled");
				}
			}
		});
	});
})