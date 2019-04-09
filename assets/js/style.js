$(function(){
	"use strict";
	var url = window.location.href,
		folders = url.split('/');
	// console.log(url.slice(url.lastIndexOf('/') + 1));
	// console.log(folders[folders.length-2]);
	$("header").load("../header.html", function(){
		$('a[href*="' + (folders[folders.length-2]) + '"]').parent().addClass('now');
	});
	$("footer").load("../footer.html");
	$(".designList").load("../designlist.html", function(){
		$('a[href*="' + (url.slice(url.lastIndexOf('/') + 1)) + '"]').parent().addClass('now');
	});
	$(".componentsList").load("../componentslist.html", function(){
		$('a[href*="' + (url.slice(url.lastIndexOf('/') + 1)) + '"]').parent().addClass('now');
	});
});