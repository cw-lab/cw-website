// Your API key from the Developer Console
const API_KEY = 'AIzaSyDXlrTai-Jkpv3TpZtiLxTURschmUKSdIw';
const thisSpreadsheetId = '1lqTWZPgu9eMeKOMLTHHKY0NulhZPorzn3GO2S00zxT8';
// 獲取當前頁面的 URL
const currentUrl = window.location.href;
// 判斷 URL 中是否包含 "dev"
const isDev = currentUrl.includes('dev');
// 根據是否是開發環境來選擇不同的工作表名稱
const sheetName = isDev ? '正式機資料' : '測試機資料';
const thisRange = `${sheetName}!A:G`;

const spotboxLoader = document.querySelector('.spotbox_loader');
const spotbox = document.querySelector('.spotbox');
const helloBAR = document.querySelector('.hello__bar');

// 顯示 loading 畫面
spotboxLoader.style.display = 'block';
// spotbox.style.display = 'none';
helloBAR.style.display = 'none';


function handleClientLoad() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    }).then(function() {
        listMajors();
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

function listMajors() {
    gapi.client.sheets.spreadsheets.values.get({

        spreadsheetId: thisSpreadsheetId,
        range: thisRange,  // 更新範圍以包含 A 到 F 欄
    }).then(function(response) {
        
        let range = response.result;
        if (range.values.length > 1) { // 確保至少有一行資料（排除標題行）
          let spot_row = range.values[1]; // 取得第二行數據
          let spot_first_card = document.querySelector('.spotbox .card.first');

          // D 欄對應到 .txtbox 裡 h3 的 a 的 href 和 img 的 a 的 href
          let spot_first_aH3 = spot_first_card.querySelector('.txtbox h3 a');
          let spot_first_aP = spot_first_card.querySelector('.txtbox p a');
          let spot_first_aImg = spot_first_card.querySelector('.imgbox a');
          spot_first_aH3.href = spot_row[3] || '#';
          spot_first_aP.href = spot_row[3] || '#';
          spot_first_aImg.href = spot_row[3] || '#';
          
          // A 欄對應到 .txtbox 裡 h3 的 第一個span
          let spot_first_h3Span1 = spot_first_card.querySelector('.txtbox h3 span:nth-child(1)');
          spot_first_h3Span1.textContent = spot_row[0] || '';

          // B 欄對應到 .txtbox 裡 h3 的 第二個span
          let spot_first_h3Span2 = spot_first_card.querySelector('.txtbox h3 span:nth-child(2)');
          spot_first_h3Span2.textContent = spot_row[1] || '';

          // A+B 欄對應到 .imgbox 和 .txtbox 裡 a 的 title & event_label
          let spot_first_combinedContent = `${spot_first_h3Span1.textContent} ${spot_first_h3Span2.textContent}`.trim();
          spot_first_aImg.title = spot_first_combinedContent;
          spot_first_aImg.setAttribute('eventlabel', spot_first_combinedContent);
          spot_first_aH3.setAttribute('eventlabel', spot_first_combinedContent);
          

          // C 欄對應到 .txtbox 裡 p
          let spot_first_p = spot_first_card.querySelector('.txtbox p a');
          spot_first_p.textContent = spot_row[2] || '';
          spot_first_aP.setAttribute('eventlabel', spot_first_p.textContent);

          // E 欄對應到 .imgbox 裡 img.pc 的 src
          let imgPc = spot_first_card.querySelector('.imgbox #source-pc');
          let imgDefault = spot_first_card.querySelector('.imgbox img');
          imgPc.srcset = spot_row[4] || '';
          imgDefault.src = spot_row[4] || '';

          // F 欄對應到 .imgbox 裡 img.mb 的 src
          let imgMb = spot_first_card.querySelector('.imgbox #source-mb');
          imgMb.srcset = spot_row[5] || '';

          // listbox content build
          let listbox = document.querySelector('.spotbox .listbox');
          for (let i = 2; i < range.values.length; i++) { // 從第三行開始迭代
              let list_row = range.values[i];
              let list_card = document.createElement('div');
              list_card.className = 'card';

              // A 欄對應到 <h3><a><span></span></a>
              let list_h3 = document.createElement('h3');
              let list_a = document.createElement('a');
              let list_span = document.createElement('span');

              list_span.textContent = list_row[0] || ''; // 預防空值
              list_a.appendChild(list_span);
              list_a.href = list_row[3] || '#'; // 預防空值
              list_a.target = '_blank';
              list_h3.appendChild(list_a);

              // B 欄對應到 <a> 的文本，這裡把文本加入到 a 標籤的尾部
              let list_h3Text = document.createTextNode(list_row[1] || ''); // 預防空值
              list_a.appendChild(list_h3Text);

              list_card.appendChild(list_h3);
              listbox.appendChild(list_card);
              let list_eventLabelValue = list_row[1] || ''; // 預防空值
              list_a.setAttribute('gtm-name', '天下官網-首頁');
              list_a.setAttribute('eventaction', '首頁特殊策展_click');
              list_a.setAttribute('eventlabel', list_eventLabelValue);
            }
            // 檢查 .card 元素數量並在螢幕寬小於 768px 時顯示 .more
            if (window.innerWidth < 768) {
                if (listbox.getElementsByClassName('card').length > 3) {
                    document.querySelector('.spotbox .more').style.display = 'block';
                    // 設置 .spotbox 的 padding-bottom
                    document.querySelector('.spotbox').style.paddingBottom = '58px';

                    // 添加點擊事件監聽器
                    document.querySelector('.spotbox .more').addEventListener('click', function() {
                        this.classList.toggle('show');
                        listbox.classList.toggle('show');
                    });
                }
                
            }
            // 隱藏 loading 畫面並顯示 spotbox
            spotboxLoader.style.display = 'none';
            spotbox.style.display = 'block';
            helloBAR.style.display = 'none';
            // 向 dataLayer 推送 首頁特殊策展impression 數據
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'eventCategory':'天下官網-首頁',
                'eventAction':'首頁特殊策展_impression',
                'eventLabel':'homepage_special_event',
                'event': 'GAEventTrigger'
            });
        } else {
            spotboxLoader.style.display = 'none';
            spotbox.style.display = 'none';
            helloBAR.style.display = 'block';
            // console.log('No data found.');
            // 向 dataLayer 推送 hello bar impression 數據
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'eventCategory':'天下官網-首頁',
                'eventAction':'impression',
                'eventLabel':'onsite-hellobar',
                'event': 'GAEventTrigger'
            });
        }
    }, function(response) {
        console.log('Error: ' + response.result.error.message);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    handleClientLoad();
});