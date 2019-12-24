$(function() {
    $('.tab__nav li').click(function() {
        var tabIssue = $(this).text();
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var filteredIssue = bargraph.filter(function(bargraph) {
            return (bargraph.issue === tabIssue);
            // return bargraph;
        });
        for (var a = 0; a < filteredIssue.length; a++) {
            var barhtml = '';
            barhtml += '<div class="tab__item ';
            barhtml += filteredIssue[a]['issue_eng'];
            barhtml += '" data-item="';
            barhtml += filteredIssue[a]['issue_eng'];
            barhtml += '"><div class="row"><div class="col-xxl-8 offset-xxl-2"><div class="d-flex align-items-end justify-content-center img__chart"><div class="chart--yAxis">';
            for (var b = 0; b < filteredIssue.length; b++) {
                barhtml += '<div>' + filteredIssue[b]['keyword'] + '</div>';
            }
            barhtml += '</div><div class="chart"><div class="chart--xAxis"><div class="xAxis xAxis--0">0%</div><div class="xAxis xAxis--50">50%</div><div class="xAxis xAxis--100">100%</div></div><div class="chart--line"><span class="divi divi--25"></span><span class="divi divi--50"></span><span class="divi divi--75"></span><div class="line__group">';
            for (var c = 0; c < filteredIssue.length; c++) {
                barhtml += '<div class="line"><span style="width:' + filteredIssue[c]['percent'] + '"></span></div>';
            }
            barhtml += '</div></div></div><div class="chart--number">';
            for (var d = 0; d < filteredIssue.length; d++) {
                barhtml += '<div>' + filteredIssue[d]['percent'] + '</div>';
            }
            barhtml += '</div></div></div></div>';
        }
        $('.tab__item__group').html(barhtml);
    });
})