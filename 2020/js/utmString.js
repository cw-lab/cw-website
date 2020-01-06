//從網址取得參數
function getUrlParameter(sParam)
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) 
  {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) 
      {
          return sParameterName[1];
      }
  }
}

//如果有utm的話，組合出網址帶入的utm
if (getUrlParameter('utm_source')){
  var utm_string = "utm_source="+getUrlParameter('utm_source')+"&utm_medium="+getUrlParameter('utm_medium')+"&utm_content="+getUrlParameter('utm_content')+"&utm_campaign="+getUrlParameter('utm_campaign');

  //如果已有utm資料的，先清除
  $("a[href*='utm_source='],area[href*='utm_source=']").attr('href', function(i, h) {
    return h.substring(0, h.indexOf('utm_source'));
  });

  //針對沒有頁籤符號的，加入由網址帶入的utm
  $(".utm_btn").attr('href', function(i, h) {
//    return h + (h.indexOf('?') != -1 ? "&"+utm_string : "?"+utm_string);
	  return h + '&' + utm_string
  });

  //針對有頁籤符號的，在頁籤前加入由網址帶入的utm
  $("a[href*='#'],area[href*='#']").attr('href', function(i, h) {
    return h.replace("#","?"+utm_string+"#");
  });
}