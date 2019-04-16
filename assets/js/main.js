$(function(){
	var width = $(window).width(),
		height = $(window).height();
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
	// 當tooltips大於等於15字
	$(".tooltips").each(function(){
		if ($(this).data("tooltips").length >= 15 ) {
			$(this).addClass("tooltips-wrap");
		}
	});
	$(".hamburger").click(function(event) {
		event.stopPropagation();
		$(this).toggleClass("opened");
	});
	$("nav.sidebar > ul > li > .li__group > i.more").click(function(event) {
		$(this).parent().parent().siblings().children().children("i.more").removeClass("active");
		$(this).parent().parent().siblings().children("ul").slideUp();
		$(this).parent().siblings("ul").slideToggle();
		$(this).toggleClass("active");
	});
	$(window).resize(function(width) {
		var width = $(window).width();
		tabNavWidth (width);
	})
});