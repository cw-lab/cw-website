$(function(){

	var windowHeight = $(window).height() - 50;
	var robotBtnHeight = $(".scrollBox").height();

	var scrolltop = 0;
	var scrollRobat = $("#mechanism").offset().top - 300;

	var video = document.getElementById('OPvideo');
	

	//loader
	Pace.on("start", function () {
		$(".loader").show();
	});
	
	Pace.on("done", function () {
	    $(".loader").hide();

	    //load during the video
	    var wordstart = setTimeout(function () {
	        $(".header").fadeIn(300);
	        clearTimeout(wordstart);
	    }, 4950);

	    video.play();

	    //after video finished, scroll to next div
	    video.addEventListener('ended', scrollnext, false);
	    function scrollnext(e) {
	        console.log('video ended');

	        var delayscroll = setTimeout(function () {
	            if (scrolltop == 0 && scrolltop <= 100) {
	                $('body,html').animate({
	                    scrollTop: $("#container").offset().top
	                }, 1000);
	            }
	            clearTimeout(delayscroll);
	        }, 5000);
	    }

	});


	
	$(".rightRobot").hide();
	$(".header").append("<div class='glitch-window'></div>");

    //fill div with clone of real header
	$("h2.glitched").clone().appendTo(".glitch-window");
	$("h1.glitched").clone().appendTo(".glitch-window");
	$("p.glitched").clone().appendTo(".glitch-window");
	
  
	

  


	function collapseNavbar() {
		if ($(".navbar").offset().top > windowHeight) {
				$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
				$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
		if ($(".robotBtnArea").offset().top > robotBtnHeight) {
				$(".robotBtnArea").addClass("active");
		} else {
				$(".robotBtnArea").removeClass("active");
		}
	}

	$(window).scroll(collapseNavbar);
	$(document).ready(collapseNavbar);

	$(".black, .closeBtn").click(function(){
		$(".lightBoxArea").hide(300);
		return false;
	});
	$(".robotExplainArea .companyList ul li a").click(function(){
		$(".lightBoxArea").show(300);
		return false;
	});
	
	$("img.rightRobot").click(function(){
		$(".mobileRightBox").show(300);
		return false;
	});
	$(".closeBtn, .ulBlack").click(function(){
		$(".mobileRightBox").hide(300);
		return false;
	});

	var width = $(window).width(),
			height = $(window).height();

	//撖砍漲撠𤩺䲰768霈���硋𡖂銝�憟堒�𣇉��
	if ((width < 769)) {
			$('.embed-responsive-item source').attr('src', 'http://v.cw1.tw/video/cw2000_2017_opPlus.mp4');
	};

	if ((width > 767)) {
	    //scroll and show five menus
	    $(window).scroll(function () {
	        var scrolltopNew = $(window).scrollTop();
	        if (scrolltop >= scrollRobat) {
	            $(".robotBtn").removeClass("normalVer").addClass("fixRightVer");
	        } else {
	            $(".robotBtn").removeClass("fixRightVer").addClass("normalVer");
	        }
	        scrolltop = scrolltopNew;
	    });
	}

	var iphone = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
	var androidp = (navigator.userAgent.match(/android/i) != null);
	var IS_IPAD = navigator.userAgent.match(/iPad/i) != null;

	if (IS_IPAD) {
			phone = false;
			androidp = false;
			$('video.embed-responsive-item').load();
	    //loader
			Pace.on("start", function () {
			    $(".loader").show();
			});

			Pace.on("done", function () {
			    $(".loader").hide();

			    //load during the video
			    var wordstart = setTimeout(function () {
			        $(".header").fadeIn(300);
			        clearTimeout(wordstart);
			    }, 4950);

			    video.play();

			    //after video finished, scroll to next div
			    video.addEventListener('ended', scrollnext, false);
			    function scrollnext(e) {
			        console.log('video ended');

			        var delayscroll = setTimeout(function () {
			            if (scrolltop == 0 && scrolltop <= 100) {
			                $('body,html').animate({
			                    scrollTop: $("#container").offset().top
			                }, 1000);
			            }
			            clearTimeout(delayscroll);
			        }, 5000);
			    }

			});

	}
	if (iphone) {
			IS_IPAD = false;
			androidp = false;
			$('video.embed-responsive-item').load();
			$("video.embed-responsive-item source.mp4").attr('src', 'http://v.cw1.tw/video/cw2000_2017_opPlus.mp4');

	    //loader
			Pace.on("start", function () {
			    $(".loader").show();
			});

			Pace.on("done", function () {
			    $(".loader").hide();

			    //load during the video
			    var wordstart = setTimeout(function () {
			        $(".header").fadeIn(300);
			        clearTimeout(wordstart);
			    }, 4950);

			    video.play();

			    //after video finished, scroll to next div
			    video.addEventListener('ended', scrollnext, false);
			    function scrollnext(e) {
			        console.log('video ended');

			        var delayscroll = setTimeout(function () {
			            if (scrolltop == 0 && scrolltop <= 100) {
			                $('body,html').animate({
			                    scrollTop: $("#container").offset().top
			                }, 1000);
			            }
			            clearTimeout(delayscroll);
			        }, 5000);
			    }

			});

	    //scroll and show five menus
			$(window).scroll(function () {
			    var scrolltopNew = $(window).scrollTop();
			    if (scrolltop >= scrollRobat) {
			        $(".rightRobot").show();
			        
			    } else {
			        $(".rightRobot").hide();
			       
			    }
			    scrolltop = scrolltopNew;
			});

	}
	if (androidp) {
			IS_IPAD = false;
			iphone = false;

			var video = document.querySelector('video');

			$('video.embed-responsive-item').load();
			$("video.embed-responsive-item").attr('poster', 'http://topic.cw.com.tw/cw2000_2017/images/opMobile000.png');
			$("video.embed-responsive-item source.mp4").attr('src', 'http://v.cw1.tw/video/cw2000_2017_opPlus.mp4');

			$(".header").fadeIn(300);

			window.addEventListener('touchstart', function videoStart() {
					video.play();
					console.log('first touch');
					// remove from the window and call the function we are removing
					this.removeEventListener('touchstart', videoStart);
			});
            
	    //scroll and show five menus
			$(window).scroll(function () {
			    var scrolltopNew = $(window).scrollTop();
			    if (scrolltop >= scrollRobat) {
			        $(".rightRobot").show();

			    } else {
			        $(".rightRobot").hide();

			    }
			    scrolltop = scrolltopNew;
			});

		}

	$(document).on('click', 'a.pageScroll', function (event) {
	    $(".mobileRightBox").hide(300);
			var $anchor = $(this);
			$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
	});
	var companyname;

	$(".lightBoxArea").hide();
	$("#rankBox").hide();
	$(".stockNo").hide();
	$(".companyLink").hide();
	$("#revenueBox").hide();
	$("#profitBox").hide();
	$("#EPSBox").hide();
	$("#articleBox").hide();



	$(".robotExplainArea .companyList ul li a").click(function () {
	    companyname = $(this).text();
	    for (var i = 0; i < data.length; i++) {
	        if (companyname == data[i]["companyShort"]) {
	            $("#rankBox").hide();
	            $(".stockNo").hide();
	            $(".companyLink").hide();
	            $("#revenueBox").hide();
	            $("#profitBox").hide();
	            $("#EPSBox").hide();
	            $("#articleBox").hide();
	            $(".name").text(data[i]["company"]);
	            $(".engName").text(data[i]["companyEng"]);

	            if (data[i]["2016Rank"] !== "") {
	                $("#rankBox").show();
	                $(".rankNo").text("#" + data[i]["2016Rank"] + "");
	                $(".rankWord").text(data[i]["Rankname"]);
	            }

	            if (data[i]["stockCode"] !== "") {
	                $(".stockNo").show();
	                $(".stockNo").text("(" + data[i]["stockCode"] + ")");
	            }

	            if (data[i]["companyWebsite"] !== "") {
	                $(".companyLink").show();
	                $(".companyLink").attr("href", "" + data[i]["companyWebsite"] + "");
	            }

	            $(".type").html("<ul><li>" + data[i]["modual"] + "</li><li>" + data[i]["parts"] + "</li><li>" + data[i]["machine"] + "</li></ul>");

	            if (data[i]["modual"] == "") {
	                $(".type").html("<ul><li class='noMargin'>" + data[i]["modual"] + "</li><li>" + data[i]["parts"] + "</li><li>" + data[i]["machine"] + "</li></ul>");
	            }
	            if (data[i]["parts"] == "") {
	                $(".type").html("<ul><li>" + data[i]["modual"] + "</li><li class='noMargin'>" + data[i]["parts"] + "</li><li>" + data[i]["machine"] + "</li></ul>");
	            }
	            if (data[i]["modual"] == "" && data[i]["parts"] == "") {
	                $(".type").html("<ul><li class='noMargin'>" + data[i]["modual"] + "</li><li  class='noMargin'>" + data[i]["parts"] + "</li><li>" + data[i]["machine"] + "</li></ul>");
	            }

	            $("#chairman").text(data[i]["chairman"]);
	            $("#location").text(data[i]["location"]);

	            if (data[i]["2016Revenue"] !== "") {
	                $("#revenueBox").show();
	                $("#revenue").text(data[i]["2016Revenue"]);
	            }

	            if (data[i]["2016Profit"] !== "") {
	                $("#profitBox").show();
	                $("#profit").text(data[i]["2016Profit"]);
	            }

	            if (data[i]["2016EPS"] !== "") {
	                $("#EPSBox").show();
	                $("#EPS").text(data[i]["2016EPS"]);
	            }

	            if (data[i]["article"] !== "") {
	                $("#articleBox").show();
	                $(".relativeLink").text(data[i]["articleName"]);
	                $(".relativeLink").attr("href", "" + data[i]["article"] + "");
	            }
	        }
	    }
	    $(".lightBoxArea").show();
	    return false;
	});
	$(".black, .closeBtn").click(function () {
	    $(".lightBoxArea").fadeOut("easeInCirc");
	});
});