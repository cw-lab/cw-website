$(function () {
	var width = $(window).width(),
		height = $(window).height();
	var edmUrl = "https://topic.cw.com.tw/edm/cw_40/cw40.html",
        currentYear = new Date().getFullYear(),
        type;

	$("input[name='edmType']").on("change", function () {
		switch ($("input[name='edmType']:checked").val()) {
			case "cwedm":
				$("#sound").hide();
				type = "cwedm";
				break;
			case "cwdaily":
                $("#sound").hide();
                type = "cwdaily";
				break;
			case "webaccess":
                $("#sound").show();
                type = "webaccess";
				break;
			case "transformers":
                $("#sound").hide();
                type = "transformers";
				break;
			case "off":
                $("#sound").hide();
                type = "off";
				break;
			case "economisＦt":
                $("#sound").hide();
                type = "economist";
				break;
			case "anniv40":
                $("#sound").hide();
                type = "anniv40";
				break;
			default:
		}
        //從參數製作html原始碼
        function makeSourceCode(key, worksheet) {
            var makecode = "";
            //以下是 Google Spreadsheets 的 api。最後加入的 date 參數可以篩選需要的日期項目，worksheet 選擇工作表
            //以 Json 格式載入文件
            var gspreadsheets = "https://spreadsheets.google.com/feeds/list/" + key + "/" + worksheet + "/public/values?alt=json&sq=%E9%A1%AF%E7%A4%BA=y";
            //以Json格式載入文件
            var data = { funcColum: [] };
            $.getJSON(gspreadsheets, function (l) {
                //將載入列表轉換為清單的格式
                $.each(l.feed.entry, function (i, f) {
                    data.funcColum[i] = {
                        columType: f.gsx$欄型.$t,
                        columLink: f.gsx$連結.$t,
                        columChannel: f.gsx$小帽.$t,
                        columImage: f.gsx$圖片.$t,
                        columTitle: f.gsx$標題.$t,
                        columText: f.gsx$內文.$t,
                    };
                });
                var mainColor = data.funcColum[0].columChannel,
                    textColor = data.funcColum[0].columImage;
                // console.log(data);

                //組裝原始碼第一段，版頭及表頭
                makecode += "";

                //組裝原始碼第二段，填入spreadsheet的內容部份
                var multiColumCont = 0;
                var tblRow = "";
                $(function () {
                    $.each(data.funcColum, function (i, f) {
                        if (i == 0) {
                            return true;
                        }
                        switch (f.columType) {
                            case "head":
                                // console.log('head');
                                break;
                            case "site-title":
                                // console.log('site-title');
                                tblRow += "";
                                break;
                            case "pure-text":
                                // console.log('pure-text');
                                tblRow += "";
                                break;
                            case "single-column-main":
                                // console.log('single-column-main');
                                tblRow += "";
                                break;
                            case "single-column":
                                // console.log('single-column');
                                tblRow += "";
                                break;
                            case "Double-column":
                                // console.log('Double-column');
                                tblRow += "";
                                break;
                            case "Single-Image":
                                // console.log('Single-Image');
                                tblRow += "";
                                break;
                            case "line":
                                // console.log('line');
                                tblRow += "";
                                break;
                            case "blank":
                                // console.log('blank');
                                tblRow += "";
                                break;
                            case "foot":
                                // console.log('foot');
                                break;
                            default:
                            // console.log('Nobody sucks!');
                        }
                    });
                    makecode += tblRow;
                });

                //組裝原始碼第三段，加上表尾及網頁foot的部份
                makecode += "";

                // dataLayer.push({
                // 	event: "GA-event",
                // 	eventInfo: "編碼完成",
                // 	fileID: key,
                // });

                //將原始碼塞入「發信用原始碼」的框框
                $("#sourceCode textarea").val(makecode);

                //將原始碼丟入「預覽」框，呈現組裝後的結果
                $("#previewHtml div").html(makecode);
            });
        }
        $("#preview").click(function () {
            var key = $("#dockey").val().split("/d/")[1].split("/")[0];
            console.log(key);
            makeSourceCode(key, worksheet);
        });
	});
});
