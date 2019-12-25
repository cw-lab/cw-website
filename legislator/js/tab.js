$(function() {
    var barhtml = '';
    for (var a = 0; a < bargraph.length; a++) {
        barhtml += '<div class="tab__item ';
        barhtml += bargraph[a]['issue_eng'];
        barhtml += '" data-item="';
        barhtml += bargraph[a]['issue_eng'];
        barhtml += '"><div class="row"><div class="col-xxl-8 offset-xxl-2"><div class="d-flex align-items-end justify-content-center img__chart"><div class="chart--yAxis">';
        for (var b = 0; b < bargraph[a]['data'].length; b++) {
            barhtml += '<div>' + bargraph[a]['data'][b]['keyword'] + '</div>';
        }
        barhtml += '</div><div class="chart"><div class="chart--xAxis"><div class="xAxis xAxis--0">0%</div><div class="xAxis xAxis--50">50%</div><div class="xAxis xAxis--100">100%</div></div><div class="chart--line"><span class="divi divi--25"></span><span class="divi divi--50"></span><span class="divi divi--75"></span><div class="line__group">';
        for (var b = 0; b < bargraph[a]['data'].length; b++) {
            barhtml += '<div class="line"><span style="width: ' + bargraph[a]['data'][b]['percent'] + ';"></span></div>';
        }
        barhtml += '</div></div></div><div class="chart--number">';
        for (var b = 0; b < bargraph[a]['data'].length; b++) {
            barhtml += '<div>' + bargraph[a]['data'][b]['percent'] + '</div>';
        }
        barhtml += '</div></div></div></div><div class="hot__group">';
        for (var b = 0; b < bargraph[a]['data'].length; b++) {
            var filteredBarKeyword = barkeyword.filter(function(barkeyword) {
                return barkeyword.post_keyword === bargraph[a]['data'][b]['keyword'];
            });
            for (var c = 0; c < filteredBarKeyword.length; c++) {
                barhtml += '<div class="hot__item"><div class="hot__title">';
                barhtml += filteredBarKeyword[c]['post_keyword'];
                barhtml += '</div><div class="hot__content"><span class="date">';
                barhtml += filteredBarKeyword[c]['year'] + '.' + filteredBarKeyword[c]['month'];
                barhtml += '</span><b>';
                barhtml += filteredBarKeyword[c]['post_name'];
                barhtml += '</b><i class="icon-';
                barhtml += filteredBarKeyword[c]['platform'];
                barhtml += '"></i>：<a href="';
                barhtml += filteredBarKeyword[c]['post_link'];
                barhtml += '" target="_blank">';
                barhtml += filteredBarKeyword[c]['post_content'];
                barhtml += '</a></div><div class="hot__more" data-toggle="modal" data-target="#hotModal" data-keyword="';
                barhtml += filteredBarKeyword[c]['post_keyword'];
                barhtml += '">看全部</div></div>';
            }
            barhtml += '';
        }
        barhtml += '</div></div>';
    }
    $('.tab__item__group').html(barhtml);
    $('.hot__group').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        autoplay: false,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon-arrow"></i></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon-arrow"></i></button>',
        responsive: [{
            breakpoint: 1780,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });
    $('.tab__nav li').click(function() {
        var tabIndex = $(this).index(),
            tabValue = $(this).data('value');
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $(this).parent().siblings('.tab__item__group').children().removeClass('active');
        $(this).parent().siblings('.tab__item__group').children().eq(tabIndex).addClass('active');
        $('#tab_nav').children('option').attr('selected', false);
        $('#tab_nav').children('option[value="' + tabValue + '"]').attr('selected', true);
    });
    $('#tab_nav').on('change', function() {
        var tabValue = $(this).val();
        $('.tab__nav li').removeClass('active');
        $('.tab__nav li[data-value="' + tabValue + '"').addClass('active');
        $('.tab__item').removeClass('active');
        $('.tab__item.' + tabValue).addClass('active');
    })
    $('.tab__item').eq(0).addClass('active');
    $('.hot__more').click(function() {
        var moreBtn = $(this).data('keyword'),
            hotHtml = '',
            filteredhotMore = barkeyword.filter(function(barkeyword) {
                return barkeyword.post_keyword === moreBtn;
            });
        for (var d = 0; d < filteredhotMore.length; d++) {
            if (filteredhotMore[d]["post_content"].length > 100) {
                var hundren = filteredhotMore[d]["post_content"].substr(0, 98) + '...';
            } else {
                var hundren = filteredhotMore[d]["post_content"];
            }
            hotHtml += '<div class="hot__item ' + filteredhotMore[d]['issue_eng'] + '"><div class="hot__content"><span class="date">';
            hotHtml += filteredhotMore[d]['year'] + '.' + filteredhotMore[d]['month'];
            hotHtml += '</span><b>';
            hotHtml += filteredhotMore[d]['post_name'];
            hotHtml += '</b><i class="icon-';
            hotHtml += filteredhotMore[d]['platform'];
            hotHtml += '"></i>：<a href="';
            hotHtml += filteredhotMore[d]['post_link'];
            hotHtml += '" target="_blank">';
            hotHtml += hundren;
            hotHtml += '</a></div></div>';
        }
        $('.hot__block').html(hotHtml);
        $('#hotModalCenterTitle').html(moreBtn);
    })
})