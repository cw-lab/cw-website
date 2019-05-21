$(function(){
	var width = $(window).width(),
		height = $(window).height(),
		container = $(".header__logo .container").outerWidth();
	// 判斷有沒有值
	$("input").on('change keyup copy paste cut', function(){
		if(!this.value) {
			$(this).parent().removeClass('hasValue');
		} else {
			$(this).parent().addClass('hasValue');
		}
	});
	$("input").each(function(){
		if(!this.value) {
			$(this).parent().removeClass('hasValue');
		} else {
			$(this).parent().addClass('hasValue');
		}
	});
	// 統計字數
	$('.form__group--countletter input').keyup(function() {
		$(this).siblings('i').children('span').html(this.value.length);
	});
	// 是否顯示密碼
	$('.form__group .icon-eye').click(function () {
		$(this).siblings('input').attr('type',
			$(this).siblings('input').attr('type') === 'password' ? 'text' : 'password'
		);
		$(this).toggleClass('icon-eyeoff icon-eyeon');
	});
	$("input").parent().addClass('form__group--defalt');
	$("input[disabled*='disabled']").parent().removeClass('form__group--defalt').addClass('form__group--disabled');
	// tabs
	$(".tab__nav > ul li").click(function () {
		var tabsIndex = $(this).index();
		$(this).addClass('active').siblings('.active').removeClass('active');
		$(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').removeClass('active');
		$(this).parent().parent().siblings('.tab__content').children('.tab__content__pane').eq(tabsIndex).addClass('active');
	});
	// 當裝置大於等於768時，將tab__nav寬度設為等分
	function tabNavWidth (width){
		$(".tab__nav > ul").each(function(){
			if (width >= 768) {
				$(this).children("li").css( "width", (100 / $(this).children("li").length) + "%" );
			} else {
				$(this).children("li").css( "width", "" );
			}
		});
	}
	tabNavWidth (width);
	$(".tab__nav").each(function(){
		if ( ($(this).outerWidth() / $(this).children().children("li").length) < 110) {
			$(this).addClass("tab__nav--overflow");
			$(this).append("<div class='tab__nav__next'><i class='icon icon-right'></i></div>");
			if (width >= 768) {
				$(this).addClass("tab__nav--desktop");
			} else {
				$(this).addClass("tab__nav--mobile");
			}
		} else {
			$(this).removeClass("tab__nav--overflow");
		}
	});
	// 當tooltips大於等於15字
	$(".tooltips").each(function(){
		if ($(this).data("tooltips").length >= 15 ) {
			$(this).addClass("tooltips-wrap");
		}
	});
	// 漢堡
	$('body').append('<div class="black"></div>');
	$('.hamburger, .black').click(function () {
		$('.menubar--left').toggleClass('opened');
		$('.black').toggleClass('opened');
	});
	// menu寬度平分
	$("nav.menubar--belt").each(function(){
		$(this).children().children().css({
			"width": ($(this).outerWidth() / $(this).children().children().length) + "px"
		});
	});
	// 當導覽menu有第三層時，加上classname
	$("nav.menubar--belt ul li  ul li").has("ul").parent().parent().parent().parent().addClass("menubar--belt--third");
	$("nav.menubar--belt ul li  ul li").has("ul").children("a").append("<i class='icon icon-caret-right'></i>");
	// sidemenu-left
	$("nav.menubar--left > ul > li > .li__group > i.more").click(function() {
		$(this).toggleClass("active");
		$(this).parent().parent().siblings().children().children("i.more").removeClass("active");
		$(this).parent().parent().siblings().children("ul").slideUp();
		$(this).parent().siblings("ul").slideToggle();
	});
	// 第二層
	$('body').append('<div class="opacity"></div>');
	$("nav.menubar--sub ul.menubar__user > li, .opacity").click(function(){
		$(".menubar__user__slide").slideToggle();
		$("nav.menubar--sub ul.menubar__user > li > a > i").toggleClass("deg");
		$('.opacity').toggleClass('opened');
	});
	// message: Notification 3 秒後關閉
	setTimeout(function(){
		$(".message--notification").fadeOut();
	}, 3000);
	// message: Dialogs 點擊X關閉
	$(".message__close").on("click", function(){
		$(this).parent().parent().fadeOut();
	});
	// menubar--sub 絕對定位
	function menubarSub (width, container){
		$(".article-page .menubar--sub").css({
			"right": ( (width - container) / 2 )
		});
	}
	menubarSub (width, container);
	console.log(width, container, (width - container) / 2);
	// 文章頁
	// youtube 16:9
	var articleTextWidth =  $(".article__text").outerWidth();
	$(".article__text iframe[src*='youtube']").css({
		"width": articleTextWidth,
		"height": articleTextWidth * 0.5625
	});
	$('.article__edit__info__type').hide();
	$('.article__edit__info__type').each(function(){
		if ($(this).text().length > 0) {
			$(this).show();
		}
	});
	// 複製網址
	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).data("link")).select();
		document.execCommand("copy");
		$temp.remove();
	}
	$(".copy-text").on("click", function(){
		copyToClipboard($(this));
	});
	$(window).resize(function(width) {
		var width = $(window).width(),
			height = $(window).height(),
			container = $(".header__logo .container").outerWidth();
		tabNavWidth (width);
		menubarSub (width, container);
	})
});