$(function(){
	"use strict";
	var url = window.location.href,
		folders = url.split('/'),
		hash = window.location.hash;
	// console.log(url.slice(url.lastIndexOf('/') + 1));
	// console.log(folders[folders.length-2]);
	// console.log(hash);
	function pageScroll(){
		$('a.page-scroll[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: (target.offset().top - 30)
					}, 1000);
					return false;
				}
			}
		});
	}
	pageScroll();
	$("aside").load("aside.html", function(){
		$('a[href*="' + (url.slice(url.lastIndexOf('/') + 1)) + '"]').parent().addClass('now');
		pageScroll();
	});
	$("footer").load("footer.html");
	$("span.detail").each(function(){
		$(this).children().html($(this).attr("data-val"));
	});
	// Notification 5秒後關閉
	setTimeout(function(){
		$(".message--notification").show();
	}, 3500);
});