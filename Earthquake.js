
	var cheerio = require('cheerio-httpcli');
	
	var earthquake = [];
	var quake_data = [];
	var cnt = 0;
	
	cheerio.fetch('http://typhoon.yahoo.co.jp/weather/jp/earthquake/list/', function (err, $, res, body) {		// 地震情報
		$("#eqhist tr").nextAll().each(function(){				// .nextAll()で最初のHeader領域を読み飛ばし　id="eqhist"の<tr>単位でeachする
			$(this).children("td").each(function(){				// <td>単位でeachする
				switch (cnt) {
					case 0:
						quake_data[cnt] = $(this).text();
						cnt++;
						$(this).children('a').each(function (idx) {		// リンク先のDataを出力
							quake_data[cnt] = $(this).attr('href');
						});
						break;
					default:
						quake_data[cnt] = $(this).text();				// 詳細情報
						break;
				}
				cnt++;
				if (cnt >= 6){
					Array.prototype.push.apply(earthquake, quake_data);
					cnt = 0;
				}
			});
		});
		console.log(earthquake);
	});
