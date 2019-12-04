$(function(){
	$('.list__item--video').each(function(){
		var ytcode = $(this).data('ytcode');
		$(this).click(function(){
			$('body').addClass('message__open');
			$('.black').addClass('opened black-theater');
			$('.theater iframe').attr('src', 'https://www.youtube.com/embed/' + ytcode + '?rel=0');
			$('.theater').fadeIn();
		})
	});
	$('.list__item--pdf').each(function(){
		var pdfLink = $(this).data('pdflink');
		$(this).click(function(){
			window.open(pdfLink);
			return false;
		})
	});
	$('.list__item--vip').each(function(){
		$(this).click(function(){
			$('body').addClass('message__open');
			// $('.black').addClass('opened black-vip');
			$('.message--vip').fadeIn();
		})
	});
	$('.theater__close').click(function () {
		$('.theater').fadeOut();
		$('.theater iframe').attr('src', '');
		$('body').removeClass('message__open');
		$('.black').removeClass('opened black-theater');
	})
	$('.black').click(function(){
		if ( $(this).hasClass('black-theater') ) {
			$('.theater').fadeOut();
			$('.theater iframe').attr('src', '');
			$('body').removeClass('message__open');
			$('.black').removeClass('opened black-theater');
		}
		// if ( $(this).hasClass('black-vip') ) {
		// 	$('.message--vip').fadeOut();
		// 	$('body').removeClass('message__open');
		// 	$('.black').removeClass('opened black-vip');
		// }
	});
})
// $(window).load(function() {
// 	$(window).resize(function(width) {
// 	})
// });