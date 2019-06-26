$(function(){
	var width = $(window).width(),
		height = $(window).height(),
		container = $(".header__logo .container").outerWidth(),
		articleContainFluid =  $(".article__info").outerWidth(),
		articleTextWidth =  $(".article__text").outerWidth();
	// 判斷瀏覽器
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	if(isChrome) {
		$("body").addClass("chrome");
	}
	$("img").lazyload({
		effect : "fadeIn"
	});
	// 判斷有沒有值
	$("input").on('change keyup copy paste cut', function(){
		if(!this.value) {
			$(this).parent().removeClass('hasValue');
		} else {
			$(this).parent().addClass('hasValue');
		}
	})
	$("input").each(function(){
		if(!this.value) {
			$(this).parent().removeClass('hasValue');
		} else {
			$(this).parent().addClass('hasValue');
		}
	})
	// 統計字數
	$('.form__group--countletter input').keyup(function() {
		$(this).siblings('i').children('span').html(this.value.length);
	})
	// 是否顯示密碼
	$('.form__group .icon-eye').click(function () {
		$(this).siblings('input').attr('type',
			$(this).siblings('input').attr('type') === 'password' ? 'text' : 'password'
		);
		$(this).toggleClass('icon-eyeoff icon-eyeon');
	})
	$("input").parent().addClass('form__group--defalt');
	$("input[disabled*='disabled']").parent().removeClass('form__group--defalt').addClass('form__group--disabled');
	// tabs
	$(".tab__nav > ul li").click(function () {
		var tabsIndex = $(this).index();
		$(this).addClass('active').siblings('.active').removeClass('active');
		$(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').removeClass('active');
		$(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').eq(tabsIndex).addClass('active');
	})
	// slideshow
	$(".slideshow").each(function () {
		var $slider = $(this).children(".slider"),
			$sliderCountDiv = $(this).children(".slider__count"),
			$slider_wrap = $(this).children(".slider").children(".slider__wrap"),
			$slider_navi_prev = $(this).children(".slider__navi--prev"),
			$slider_navi_next = $(this).children(".slider__navi--next"),
			$slider_item = $slider_wrap.children(".slider__item"),
			slider_item_width = $(this).parent().outerWidth(), //每張slide寬度
			slider_count = $slider_item.length,
			slider_item_index = 0, //預宣告slide為0
			index = 0;
		$slider_item.first().clone().css({
			"width": slider_item_width
		}).appendTo($slider_wrap);
		$slider_wrap.css({
			"width": slider_item_width * (slider_count + 1),
		});
		$slider_item.css({
			"width": slider_item_width
		});
		console.log(slider_item_width);
		$sliderCountDiv.html("<i class='icon icon-images'></i><span class='now'>" + (index + 1) + "</span><span class='slash'>/</span><span class='total'>" + slider_count + "</span>");
		// $sliderCountDiv.html("<i class='icon icon-images'></i>" + slider_count);
		function switch_next() {
			if ($slider_wrap.is(":animated")) return;
			$slider_wrap.animate({left: "-="+slider_item_width}, function() {
				if (index >= slider_count - 1) {
					index = -1;
					$(this).css("left", 0);
				}
				index++;
				switch_item();
			});
		}
		function switch_item() {
			$sliderCountDiv.html("<i class='icon icon-images'></i><span class='now'>" + (index + 1) + "</span><span class='slash'>/</span><span class='total'>" + slider_count + "</span>");
		}
		function switch_prev() {
			if ($slider_wrap.is(":animated")) return;
			if (index <= 0) {
				index = slider_count;
				$slider_wrap.css("left", -(index * slider_item_width));
			}
			$slider_wrap.animate({left: "+="+slider_item_width}, function() {
				index--;
				switch_item();
			});
		}
		$slider_navi_next.click(switch_next);
		$slider_navi_prev.click(switch_prev);
		// var sid = setInterval(switch_next, 2000);
		// $slider.hover(function() {
		// 	clearInterval(sid);
		// },function() {
		// 	sid = setInterval(switch_next, 2000);
		// });
	})	// 當不是首頁時
	if (!$("body").hasClass("index__page")) {
		$("header nav.menubar--sub").addClass("menubar--sub2").removeClass("menubar--sub");
	}
	// 當不是首頁時
	$(".tab--recommend .card__group .card__title").each(function(){
		var num = $(this).data('title');
		if (($(this).data('title').length >= 21) && (width >= 768)) {
			$(this).text(num.substr(0, 20) + '...');
		} else {
			$(this).text(num);
		}
	})
	// 當裝置大於等於768時，將tab__nav寬度設為等分
	function tabNavWidth (width){
		$(".tab__nav > ul").each(function(){
			if ( (width >= 768) || ($(this).children("li").length <= 3) ) {
				$(this).children("li").css( "width", (100 / $(this).children("li").length) + "%" );
			} else {
				$(this).children("li").css( "width", "" );
			}
		})
	}
	tabNavWidth (width);
	// $(".tab__nav").each(function(){
	// 	if ( ($(this).outerWidth() / $(this).children().children("li").length) < 100) {
	// 		$(this).addClass("tab__nav--overflow");
	// 		$(this).append("<div class='tab__nav__next'><i class='icon icon-right'></i></div>");
	// 		if (width >= 768) {
	// 			$(this).addClass("tab__nav--desktop");
	// 		} else {
	// 			$(this).addClass("tab__nav--mobile");
	// 		}
	// 	} else {
	// 		$(this).removeClass("tab__nav--overflow");
	// 	}
	// })
	// 當tooltips大於等於15字
	$(".tooltips").each(function(){
		if ($(this).data("tooltips").length >= 15 ) {
			$(this).addClass("tooltips-wrap");
		}
	})
	// 漢堡
	$('body').append('<div class="black"></div>');
	$('.hamburger').click(function () {
		$('.menubar--left').addClass('opened');
		$('.black').addClass('opened');
	});
	$('.black').click(function () {
		$('.menubar--left, .black').removeClass('opened');
		$('.message--dialogs').fadeOut(200);
	});
	// menu寬度平分
	$("nav.menubar--belt").each(function(){
		$(this).children().children().css({
			"width": ($(this).outerWidth() / $(this).children().children().length) + "px"
		});
	})
	// 當導覽menu有第三層時，加上classname
	$("nav.menubar--belt ul li  ul li").has("ul").parent().parent().parent().parent().addClass("menubar--belt--third");
	$("nav.menubar--belt ul li  ul li").has("ul").children("a").append("<i class='icon icon-caret-right'></i>");
	// sidemenu-left
	$("nav.menubar--left > ul > li > .li__group > i.more").click(function() {
		$(this).toggleClass("active");
		$(this).parent().parent().siblings().children().children("i.more").removeClass("active");
		$(this).parent().parent().siblings().children("ul").slideUp();
		$(this).parent().siblings("ul").slideToggle();
	})
	// 第二層
	$('body').append('<div class="opacity"></div>');
	$("nav[class*='menubar--sub'] ul.menubar__user > li, .opacity").click(function(){
		$(".menubar__user__slide").slideToggle();
		$("nav[class*='menubar--sub'] ul.menubar__user > li > a > i").toggleClass("deg");
		$('.opacity').toggleClass('opened');
	})
	// message: Notification 3 秒後關閉
	setTimeout(function(){
		$(".message--notification").fadeOut();
	}, 3000);
	// message: 點擊 message__open 開啟
	$(".message__open").on("click", function(){
		var messageID = $(this).attr("id");
		$('.black').toggleClass('opened');
		$(".message." + messageID).fadeIn();
	})
	// message: Dialogs 點擊X關閉
	$(".click__close").on("click", function(){
		$(this).parent().parent().fadeOut();
		$('.black').toggleClass('opened');
	})
	// menubar--sub 絕對定位
	function menubarSub (width, container){
		$(".menubar--sub2").css({
			"right": ( (width - container) / 2 )
		});
	}
	menubarSub (width, container);
	// 文章頁
	// youtube 16:9
	$("iframe[src*='youtube']").each(function () {
		var youtube_width = $(this).parent().outerWidth();
		$(this).css({
			"width": youtube_width,
			"height": youtube_width * 0.5625
		})
	})
	$('.article__edit__info__type').hide();
	$('.article__edit__info__type').each(function(){
		if ($(this).text().length > 0) {
			$(this).show();
		}
	})
	// 字體大小放大縮小
	var $fz = $('.article__edit__font');
	var fzLevel = 0;
	var fzClass = 'article__level--' + fzLevel;
	$fz.click(function () {
		fzLevel < 2 ? fzLevel++ : fzLevel = 0;
		fzClass = 'article__level--' + fzLevel;
		$('article').attr("class", "");
		$('article').addClass(fzClass);
		return false;
	});
	// 複製網址
	var shareCopy = document.getElementById("shareCopy"),
		shareCopyBottom = document.getElementById("shareCopyBottom");
	if(shareCopy){
		shareCopy.addEventListener("click", function() {
			copyToClipboard(document.getElementById("copyTarget"));
		})
	}
	if(shareCopyBottom){
		shareCopyBottom.addEventListener("click", function() {
			copyToClipboard(document.getElementById("copyTargetBottom"));
		})
	}
	$("#shareCopy, #shareCopyBottom").click(function(){
		$(this).siblings().fadeIn();
		setTimeout(function(){
			$(".article__function--success").fadeOut();
		}, 1500);
		return false;
	})
	// width <= 1024，點擊後出現 tooltips
	if( width <= 1024 ){
		$(".tooltips").click(function(){
			$(this).toggleClass("active");
		})
	}
	$(".accordion__item__header").on("click", function () {
		$(this).parent().siblings().children(".accordion__item__panel").slideUp();
		$(this).parent().siblings().children(".accordion__item__header").removeClass("active");
		$(this).parent().siblings().children(".accordion__item__header").children("i.icon").addClass("icon-plus");
		$(this).parent().siblings().children(".accordion__item__header").children("i.icon").removeClass("icon-minus");
		$(this).toggleClass("active");
		$(this).children("i.icon").toggleClass("icon-plus");
		$(this).children("i.icon").toggleClass("icon-minus");
		$(this).siblings(".accordion__item__panel").slideToggle();
	})
	function copyToClipboard(elem) {
		// create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		// copy the selection
		var succeed;
		try {
			succeed = document.execCommand("copy");
		} catch (e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
	// 全閱讀 secant project
	function highestCol (width){
		if ( width >= 768 ) {
			var highestCol = Math.max(
				$('.plan__item:nth-child(1) .plan__item__right').outerHeight(),
				$('.plan__item:nth-child(2) .plan__item__right').outerHeight(),
				$('.plan__item:nth-child(3) .plan__item__right').outerHeight()
			);
		}
		$(".plan__item__right").css("height", highestCol);
	}
	highestCol (width);
	// 信用卡Keyup同步
	if ( (location.href.match(/payment/)) && (width >= 768) ) {
		$("#expMonth").on('change', function(){
			$(".card__input--month").attr("value", this.value);
		})
		$("#expYear").on('change', function(){
			$(".card__input--year").attr("value", this.value);
		})
		$("#securityCode").on('keyup', function(){
			$(".card__input--code").attr("value", this.value);
		})
		var creditCard = $('#creditCardNumber');
		function validateCard() {
			var cardHolder = $('div.card__type');
			creditCard.validateCreditCard(function(result) {
				var paymentIcons = $(this).hasClass('*[class*="card__type-"]'),
					removeIcon = $(this).removeClass(function(index, css) {
					return (css.match(/\bcard-\S+/g) || []).join(' ');
				});
				if (result.card_type !== null) {
					cardHolder.attr('class', 'card__type');
					cardHolder.addClass('card__type--' + result.card_type.name);
					$(".card__note--error").hide();
				} else {
					cardHolder.attr('class', 'card__type');
					$(".card__note--error").show();
				}
			}, {
				accept: ['visa', 'mastercard', 'jcb']
			});
		}
	}
	$("#creditCardNumber").on('keyup', function(){
		$(this).val(function (index, value) {
			return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1  ');
		});
		$(".card__input--number").attr("value", this.value);
		if (creditCard.data('creditcard') == true) {
			validateCard();
		}
	})
	$("#chageInvoicing").on("click", function(){
		$(this).parent().parent().parent().slideUp();
		$(this).parent().parent().parent().siblings(".select-invoicing").slideDown();
	})
	$(".tab__content__pane.active > .label").on("click", function(){
		$(this).siblings().children(".form__group--input").css({
			"display" : "none"
		});
		$(this).children(".form__group--input").css({
			"display" : "block"
		});
	})
	$(window).scroll(function(){
		// message: 定位在目前畫面之中
		var scroll = $(window).scrollTop();
		$(".message").animate({
			"top": scroll + (height / 2)
		}, 10);
	})
	$(window).resize(function(width) {
		var width = $(window).width(),
			height = $(window).height(),
			container = $(".header__logo .container").outerWidth(),
			articleTextWidth =  $(".article__text").outerWidth();
		tabNavWidth (width);
		menubarSub (width, container);
		highestCol (width);
		$("iframe[src*='youtube']").css({
			"width": articleTextWidth,
			"height": articleTextWidth * 0.5625
		})
	})
});