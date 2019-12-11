$(function(){
	var href = window.location.search,
		width = $(window).width();
	if( href !== "" ) {
		var split = href.replace('?main=','').replace('&sub=',' ').replace('&aq=',' ').split(' '),
			main = parseInt(split[0]),
			sub = parseInt(split[1] - 1),
			aq = parseInt(split[2] - 1);
		console.log(main, sub, aq);
		$('aside > ul').children('li').removeClass('now');
		$('aside > ul').children('li').children('.li__group').children('.icon').removeClass('active');
		$('aside > ul').children('li').children('ul').hide();
		$('aside > ul').children('li').eq(main).addClass('now');
		$('aside > ul').children('li').eq(main).children('.li__group').children('.icon').addClass('active');
		$('aside > ul').children('li').eq(main).children('ul').show();
		$('aside > ul').children('li').children('ul').children('li').removeClass('now');
		$('aside > ul').children('li').eq(main).children('ul').children('li').eq(sub).addClass('now');
		$('.accordion__group').children('.accordion__item').eq(aq).children('.accordion__item__header').addClass('active');
		$('.accordion__group').children('.accordion__item').eq(aq).children('.accordion__item__header').children('.icon').removeClass('icon-plus').addClass('icon-minus');
		$('.accordion__group').children('.accordion__item').eq(aq).children('.accordion__item__panel').show();
	}
	$('.btn--more').click(function(){
		$(this).hide();
		$('.accordion__item').slideDown();
	});
	if ( width < 1024) {
		$('.service__page aside > ul > li > .li__group > a').click(function(e){
			e.preventDefault();
		})
	}
});