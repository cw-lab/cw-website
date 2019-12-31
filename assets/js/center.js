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
	$('.list__item--link').each(function(){
		var txtLink = $(this).data('textlink');
		$(this).click(function(){
			window.open(txtLink);
			return false;
		})
	});
	$('.list__item--vip').each(function(){
		$(this).click(function(){
			$('body').addClass('message__open');
			$('.black').addClass('opened');
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
	});
	function phaseText() {
		$('.list__group--author .phase').each(function(){
			var pwidth = $(this).outerWidth(),
				fontSize = 16,
				oneLine = Math.floor(pwidth/fontSize);
			if( $.trim($(this).text()).length > (oneLine*3) ) {
				$(this).siblings('.btn--text').show();
			} else {
				$(this).siblings('.btn--text').hide();
			}
		});
	}
	phaseText();
	$(window).resize(function(width) {
		phaseText();
	})
})
// });// $(window).load(function() {
// 	$(window).resize(function(width) {
// 	})
// });