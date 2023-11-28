let winW = $(window).width();
let timers = null;

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
  $(".hiddenBlock").closest("section").css("border", "none");
  $(".hiddenBlock").closest(".container").css("padding", "0");
  $(".hiddenBlock").parents("section").find("h2").hide();

  $("body").append(`<a href="https://event.cw.com.tw/2023mediakit/contact.html#contact" class="contact-btn" id="contactBtn"><p>Contact<br>US</p></a>`);
  $("header").replaceWith(`<header class="header" id="Nav">
  <nav class="container max-container">
    <div class="nav-wrap">
      <a class="logo" href="https://www.cw.com.tw" target="_blank">
        <img src="https://event.cw.com.tw/_test-by-cwlab/2023mediakit/images/logo.svg" alt="天下雜誌MediaKit">
      </a>
      <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
      <div class="main-nav">
        <ul class="menu">
          <li class="nav-item">
            <a class="nav-link gtmEvent" href="https://event.cw.com.tw/2023mediakit/index.html">ABOUT US</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://event.cw.com.tw/2023mediakit/sevice.html">客戶服務</a>
          </li>
          <li class="nav-item">
            <a class="nav-link  gtmEvent" href="https://event.cw.com.tw/2023mediakit/showcase.html"
              gtm-name="cwdigiteam_2023mediakitAction_showcase">SHOWCASE</a>
          </li>
          <li class="nav-item">
            <a id="Contact" class="nav-link gtmEvent" href="https://event.cw.com.tw/2023mediakit/contact.html"
              gtm-name="cwdigiteam_2023mediakitAction_contactindex">CONTACT US</a>
          </li>
          <li class="nav-item">
            <a id="News" class="nav-link active gtmEvent" href="https://event.cw.com.tw/2023mediakit/news.html"
              gtm-name="cwdigiteam_2023mediakitAction_newsindex">新聞稿專區</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>`);
  //區塊動態效果
  $(window)
    .on("resize", () => {
      winW = $(window).width();
      window.clearTimeout(timers);
      timers = window.setTimeout(() => {
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
