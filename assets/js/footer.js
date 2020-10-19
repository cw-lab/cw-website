$(function () {
    var width = $(window).width();
    if (width < 1024) {
        $('.channel__title').click(function() {
            $(this).children('i.icon').toggleClass('active');
            $(this).siblings('.channel__option').slideToggle();
            $(this).parent().siblings('.channel__item').children('.channel__title').children('i.icon').removeClass('active');
            $(this).parent().siblings('.channel__item').children('.channel__option').slideUp();
        })
    }
	$(window).on("load", function () {
		var footerHeight = $("footer").outerHeight();
		if (width >= 1024 && $("footer").length !== 0) {
			$("body").css({ "padding-bottom": footerHeight });
		} else {
			$("body").css({ "padding-bottom": 0 });
		}
	});
});
