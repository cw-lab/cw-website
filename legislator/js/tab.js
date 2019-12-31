$(function() {
    $('.tab__nav li').on('click', function() {
        var barhtml = '',
            tabValue = $(this).data('value'),
            filteredtabCart = bargraph.filter(function(bargraph) {
                return bargraph.issue_eng === tabValue;
            });
        for (var a = 0; a < filteredtabCart.length; a++) {
            barhtml += '<div class="tab__item ';
            barhtml += filteredtabCart[a]['issue_eng'];
            barhtml += '" data-item="';
            barhtml += filteredtabCart[a]['issue_eng'];
            barhtml += '"><div class="row"><div class="col-xxl-8 offset-xxl-2"><div class="d-flex align-items-end justify-content-center img__chart"><div class="chart--yAxis text-right">';
            for (var b = 0; b < filteredtabCart[a]['data'].length; b++) {
                barhtml += '<div>' + filteredtabCart[a]['data'][b]['keyword'] + '</div>';
            }
            barhtml += '</div><div class="chart"><div class="chart--xAxis"><div class="xAxis xAxis--0">0%</div><div class="xAxis xAxis--50">50%</div><div class="xAxis xAxis--100">100%</div></div><div class="chart--line"><span class="divi divi--25"></span><span class="divi divi--50"></span><span class="divi divi--75"></span><div class="line__group">';
            for (var b = 0; b < filteredtabCart[a]['data'].length; b++) {
                barhtml += '<div class="line"><span style="width:' + filteredtabCart[a]['data'][b]['percent'] + ';"></span></div>';
            }
            barhtml += '</div></div></div><div class="chart--number">';
            for (var b = 0; b < filteredtabCart[a]['data'].length; b++) {
                barhtml += '<div>' + filteredtabCart[a]['data'][b]['percent'] + '</div>';
            }
            barhtml += '</div></div></div></div><div class="hot__group">';
            for (var b = 0; b < filteredtabCart[a]['data'].length; b++) {
                var filteredtabValue = keywords.filter(function(keywords) {
                    return $.trim(keywords.post_keyword) === $.trim(filteredtabCart[a]['data'][b]['keyword']);
                });
                barhtml += '<div class="hot__item"><div class="hot__title">';
                barhtml += filteredtabCart[a]['data'][b]['keyword'];
                barhtml += '</div><div class="hot__content">';
                for (var c = 0;
                    (c < filteredtabValue.length) && (c <= 4); c++) {
                    barhtml += '<span class="date">' + filteredtabValue[c]['year'] + '.' + filteredtabValue[c]['month'];
                    barhtml += '</span><b>' + filteredtabValue[c]['post_name'] + '</b>';
                    barhtml += '<i class="icon-' + filteredtabValue[c]['platform'] + '"></i>';
                    barhtml += '：<a href="';
                    barhtml += filteredtabValue[c]['post_link'];
                    barhtml += '" target="_blank">';
                    barhtml += filteredtabValue[c]['post_content'];
                    barhtml += '</a>';
                }
                barhtml += '</div><div class="hot__more" data-toggle="modal" data-target="#hotModal" data-issue="';
                barhtml += filteredtabCart[a]['issue_eng'];
                barhtml += '" data-keyword="';
                barhtml += filteredtabCart[a]['data'][b]['keyword'];
                barhtml += '">看全部</div></div>';
            }
            barhtml += '</div></div>';
        }
        $('.tab__item__group').html(barhtml).trigger('widthChange');
        $('.hot__group').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            autoplay: false,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button" gtm-name="專輯-2020總統大選" eventaction="botton-click" eventlabel="點擊-向左"><i class="icon-arrow"></i></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button" gtm-name="專輯-2020總統大選" eventaction="botton-click" eventlabel="點擊-向右"><i class="icon-arrow"></i></button>',
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
        $('.hot__more').click(function() {
            var moreBtn = $(this).data('keyword'),
                hotHtml = '',
                filteredhotMore = keywords.filter(function(keywords) {
                    return keywords.post_keyword === moreBtn;
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
    });
    $('#tab_nav').on('change', function() {
        var tabValue = $(this).val();
        $('.tab__nav li').removeClass('active');
        $('.tab__nav li[data-value="' + tabValue + '"').addClass('active').trigger('click');
    })
    $('.tab__nav li').on('click', function() {
        var tabValue = $(this).data('value');
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        // $('#tab_nav').children('option').attr('selected', false);
        $('#tab_nav').children('option[value="' + tabValue + '"]').attr('selected', true);
    });
    $('.tab__nav li').eq(0).trigger('click');
})