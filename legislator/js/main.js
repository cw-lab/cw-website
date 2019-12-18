$(function() {
    function unique(list) {
        var result = [];
        $.each(list, function(i, e) {
            if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
    }
    $('#sort').on('change', function() {
        var val = $(this).val();
        if (val == "north") {
            $("#country").attr('disabled', false);
            $("#country").html(
                "<option selected disabled>請選擇縣市</option>" +
                "<option value='keelung'>基隆市</option>" +
                "<option value='taipei'>台北市</option>" +
                "<option value='newtaipei'>新北市</option>" +
                "<option value='taoyuan'>桃園市</option>" +
                "<option value='hsinchucity'>新竹市</option>" +
                "<option value='hsinchucounty'>新竹縣</option>"
            );
            $("#electorate").html(
                "<option selected disabled>請選擇選區</option>"
            );
        } else if (val == "middle") {
            $("#country").attr('disabled', false);
            $("#country").html(
                "<option selected disabled>請選擇縣市</option>" +
                "<option value='miaoli'>苗栗縣</option>" +
                "<option value='taichung'>台中市</option>" +
                "<option value='changhua'>彰化縣</option>" +
                "<option value='nantou'>南投縣</option>" +
                "<option value='yunlin'>雲林縣</option>"
            );
            $("#electorate").html(
                "<option selected disabled>請選擇選區</option>"
            );
        } else if (val == "south") {
            $("#country").attr('disabled', false);
            $("#country").html(
                "<option selected disabled>請選擇縣市</option>" +
                "<option value='chiayicity'>嘉義市</option>" +
                "<option value='chiayicounty'>嘉義縣</option>" +
                "<option value='tainan'>台南市</option>" +
                "<option value='kaohsiung'>高雄市</option>" +
                "<option value='pingtung'>屏東縣</option>"
            );
            $("#electorate").html(
                "<option selected disabled>請選擇選區</option>"
            );
        } else if (val == "east") {
            $("#country").attr('disabled', false);
            $("#country").html(
                "<option selected disabled>請選擇縣市</option>" +
                "<option value='yilan'>宜蘭縣</option>" +
                "<option value='hualien'>花蓮縣</option>" +
                "<option value='taitung'>台東縣</option>"
            );
            $("#electorate").html(
                "<option selected disabled>請選擇選區</option>"
            );
        } else if (val == "offshore") {
            $("#country").attr('disabled', false);
            $("#country").html(
                "<option selected disabled>請選擇縣市</option>" +
                "<option value='penghu'>澎湖縣</option>" +
                "<option value='lianjiang'>連江縣</option>" +
                "<option value='kinmen'>金門縣</option>"
            );
            $("#electorate").html(
                "<option selected disabled>請選擇選區</option>"
            );
        } else if (val == "aborigine") {
            $("#country").attr('disabled', true);
            $("#electorate").attr('disabled', false);
            $("#country").html(
                "<option selected disabled>無法選擇縣市</option>"
            );
            $("#electorate").html(
                "<option selected disabled>請選擇選區</option>" +
                "<option value='rural'>平地原住民選區</option>" +
                "<option value='urban'>山地原住民選區</option>"
            );
        }
    })
    $('#country').on('change', function() {
        var sortname = $(this).val();
        $('#electorate').attr('disabled', false);
        for (var k = 0; k < country.length; k++) {
            if (sortname == country[k]["country_val"]) {
                var chtml = '<option selected disabled>請選擇選區</option>';
                for (var l = 0; l < country[k]["country_sort"].length; l++) {
                    chtml += '<option value="' + country[k]["country_sort"][l]["sort_val"] + '">' + country[k]["country_sort"][l]["sort_name"] + '</option>';
                }
                $('#electorate').html(chtml);
            }
        }
    });
    $('#electorate').on('change', function() {
        var html = '',
            select_value = $(this).val();
        var filteredCandidate = candidate.filter(function(candidate) {
            var electorate = select_value;
            return candidate.constituency === electorate;
        });
        for (var i = 0; i < filteredCandidate.length; i++) {
            var filteredKeyword = keywords.filter(function(keywords) {
                return (keywords.post_name === filteredCandidate[i]["name_chinese"]);
            });
            if (filteredCandidate[i]["party"] == '國民黨') {
                html += '<div class="col-md-12 candidate__item candidate--kmt order-1">';
            } else if (filteredCandidate[i]["party"] == '民進黨') {
                html += '<div class="col-md-12 candidate__item candidate--ddp order-2">';
            } else if (filteredCandidate[i]["party"] == '台灣民眾黨') {
                html += '<div class="col-md-12 candidate__item candidate--tpp order-5">';
            } else if (filteredCandidate[i]["party"] == '親民黨') {
                html += '<div class="col-md-12 candidate__item candidate--pfp order-3">';
            } else if (filteredCandidate[i]["party"] == '時代力量') {
                html += '<div class="col-md-12 candidate__item candidate--npp order-4">';
            } else if (filteredCandidate[i]["party"] == '無黨籍') {
                html += '<div class="col-md-12 candidate__item candidate--npsu order-6">';
            } else {
                html += '<div class="col-md-12 candidate__item candidate--other order-7">';
            }
            html += '<div class="row"><div class="candidate__img order-0"><img src="images/candidate/';
            html += filteredCandidate[i]["img"];
            html += '" width="120" alt="';
            html += filteredCandidate[i]["name_chinese"];
            html += '"></div><div class="candidate__detail order-2 order-md-1"><div class="d-md-flex flex-wrap align-items-start text-center text-md-left mt-3 mb-4"><div class="candidate__name"><div class="name name--han">';
            html += filteredCandidate[i]["name_chinese"];
            if (filteredCandidate[i]["age"] !== '') {
                html += '<span class="age">（' + filteredCandidate[i]["age"] + '）</span>';
            }
            html += '</div>';
            if (filteredCandidate[i]["name_english"] !== '') {
                html += '<div class="name name--eng">' + filteredCandidate[i]["name_english"] + '</div>';
            }
            html += '</div><div class="detail">';
            if (filteredCandidate[i]["yuan_rate"] !== '-') {
                html += '<div class="candidate__perform__group"><div class="candidate__perform" data-chinese="' + filteredCandidate[i]["name_chinese"] + '" data-party="' + filteredCandidate[i]["party"] + '">問政表現<i class="fas fa-chevron-down"></i></div>';
                html += '<div class="perform__model"><div class="perform__title">問政表現</div><i class="model__close"></i><ul class="rate__block"></ul></div></div>';
                // } else if (filteredCandidate[i]["yuan_rate"] == '-') {
                //     html += '<div class="candidate__perform"><i class="far fa-comments"></i>問政表現</div>';
            }
            if (filteredCandidate[i]["family"] == '是') {
                html += '<div class="candidate__family__group"><div class="candidate__family" data-chinese="' + filteredCandidate[i]["name_chinese"] + '" data-party="' + filteredCandidate[i]["party"] + '">政治家族<i class="fas fa-chevron-down"></i></div>';
                html += '<div class="family__model"><div class="family__title">政治家族</div><i class="model__close"></i><p class="family__block"></p></div></div>';
                // } else {
                //     html += '<div class="candidate__family"><i class="far fa-star"></i>政治家族</div>';
            }
            html += '</div></div><ul class="candidate__keyword list-reset">';
            for (var j = 0; j < filteredKeyword.length; j++) {
                if (filteredCandidate[i]["name_chinese"] == filteredKeyword[j]["post_name"]) {
                    html += '<li data-toggle="modal" data-target="#keywordModal" data-chinese="' + filteredCandidate[i]["name_chinese"] + '" data-keyword="' + filteredKeyword[j]["post_keyword"] + '">#' + filteredKeyword[j]["post_keyword"] + '</li>';
                }
            }
            html += '</ul></div><div class="candidate__party">';
            html += filteredCandidate[i]["party"];
            html += '</div></div></div>';
        }
        $('.candidate__group').html(html);
        $('.candidate__perform').click(function() {
            var chname = $(this).data('chinese'),
                partyname = $(this).data('party');
            for (var i = 0; i < filteredCandidate.length; i++) {
                if (chname == filteredCandidate[i]["name_chinese"] && partyname == filteredCandidate[i]["party"]) {
                    var rate = '';
                    rate += '<li><div class="title">院會出席率<span class="description">（實際出席場次／應出席場次）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["yuan_rate"];
                    rate += '</div></li><li><div class="title">委員會出席率<span class="description">（實際出席場次／應出席場次）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["committees_rate"];
                    rate += '</div></li><li><div class="title">口頭質詢率<span class="description">（口頭質詢次數／可質詢次數）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["oral_interpellation"];
                    rate += '</div></li><li><div class="title">法案及預算審查率<span class="description">（法案及預算審查發言場次／可發言場次）</span></div><div class="rate">';
                    rate += filteredCandidate[i]["deliberation"];
                    rate += '</div></li><li><div class="title">公督盟優秀立委得獎次數</div><div class="rate">';
                    rate += filteredCandidate[i]["ccw_awards"];
                    rate += '</div></li>';
                    $('.rate__block').html(rate);
                }
            }
        })
        $('.candidate__family').click(function() {
            var chname = $(this).data('chinese'),
                partyname = $(this).data('party');
            for (var i = 0; i < filteredCandidate.length; i++) {
                if (chname == filteredCandidate[i]["name_chinese"] && partyname == filteredCandidate[i]["party"]) {
                    var family = filteredCandidate[i]["kinship"];;
                    $('.family__block').html(family);
                }
            }
        })
        $('.candidate__keyword li').click(function() {
            var keywordBtn = $(this).data('keyword'),
                chname = $(this).data('chinese'),
                khtml = '';
            var filteredKeyword = keywords.filter(function(keywords) {
                return (keywords.post_keyword === keywordBtn) && (keywords.post_name === chname);
            });
            $('#keywordModalCenterTitle').html(keywordBtn);
            for (var m = 0; m < filteredKeyword.length; m++) {
                if (filteredKeyword[m]["post_content"].length > 100) {
                    var hundren = filteredKeyword[m]["post_content"].substr(0, 98) + '...';
                } else {
                    var hundren = filteredKeyword[m]["post_content"];
                }
                khtml += '<div><span class="date">' + filteredKeyword[m]["year"] + '/' + filteredKeyword[m]["month"] + '</span>';
                khtml += '<i class="fa fa-' + filteredKeyword[m]["platform"] + '"></i>';
                khtml += '<a href="' + filteredKeyword[m]["post_link"] + '" target="_blank">' + hundren + '</a></div>';
            }
            $('.keyword__block').html(khtml);
        })
        $('.candidate__keyword').each(function() {
            var array = {};
            $(this).children('li').each(function() {
                var txt = $(this).text();
                if (array[txt]) {
                    $(this).remove();
                } else {
                    array[txt] = true;
                }
            });
        });
        $('.candidate__perform').click(function() {
            $(this).siblings('.perform__model').fadeIn(100);
            $('.opacity').show();
        });
        $('.candidate__family').click(function() {
            $(this).siblings('.family__model').fadeIn(100);
            $('.opacity').show();
        });
        $('.model__close, .opacity').click(function() {
            $('.family__model, .perform__model').fadeOut(100);
            $('.opacity').hide();
        });
    });
    $('#electorate').trigger('change');
    // var evt = document.createEvent("HTMLEvents");
    // evt.initEvent("change", true, true);
    // document.getElementById('electorate').dispatchEvent(evt);
});