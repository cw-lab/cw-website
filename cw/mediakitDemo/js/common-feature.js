let winW = $(window).width();
let timer = null;

//手機版navclick關閉navexpand
const mobileNavclick = () => {
  $(".main-nav .dropdown-item").on("click", function () {
    $("html").removeClass("nav-expanded");
    $(".main-nav").removeClass("expand");
    $("#menuToggle").removeClass("expand").attr("aria-expanded", "false");
  });
};

// 導覽列樣式
$(function () {
  $("body").append(`<a href="https://event.cw.com.tw/2023mediakit/contact.html#contact" class="contact-btn" id="contactBtn"><p>Contact<br>US</p></a>`);

  //區塊動態效果
  $(window)
    .on("resize", () => {
      winW = $(window).width();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (winW > 1200) {
          $("html").removeClass("Mobile");
        } else {
          $("html").addClass("Mobile");
          mobileNavclick();
        }
      }, 100);
    })
    .resize();

  // header
  $(document)
    .scroll(() => {
      if ($(window).scrollTop() > 20) {
        $("#contactBtn").addClass("show");
      } else {
        $("#contactBtn").removeClass("show");
      }
    })
    .scroll();

  // 手機版漢堡按鈕觸發
  $("#menuToggle").on("click", function () {
    // console.log($(this));
    $(this).toggleClass("expand");
    if ($(this).attr("aria-expanded") == "true") {
      $(this).attr("aria-expanded", "false");
    } else {
      $(this).attr("aria-expanded", "true");
    }

    $("html").toggleClass("nav-expanded");
    $(".main-nav").toggleClass("expand");
  });
});

// $(document).on("click", function (e) {
//   console.log($(e.target));
// });
