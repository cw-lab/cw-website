$(function(){
	"use strict";
	var url = window.location.href,
		folders = url.split('/'),
		hash = window.location.hash;
	// console.log(url.slice(url.lastIndexOf('/') + 1));
	// console.log(folders[folders.length-2]);
	// console.log(hash);
	$("aside").load("aside.html", function(){
		$('a[href*="' + (url.slice(url.lastIndexOf('/') + 1)) + '"]').parent().addClass('now');
	});
	$("footer").load("footer.html");
	$("span.detail").each(function(){
		$(this).children().text($(this).attr("data-val"));
	});
});