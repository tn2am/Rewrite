/*
AppRaven



[rewrite_local]


https://appraven.net/appraven/graphql url script-response-body https://raw.githubusercontent.com/tn2am/Rewrite/refs/heads/main/appraven.js
[mitm] 

hostname = appraven.net

**/

var body = $response.body;

// 1. Xử lý cấu hình (Vẫn dùng JSON Manipulation vì nó an toàn cho phần cấu hình)
try {
    var obj = JSON.parse(body);
    if (obj && obj.data && obj.data.configuration) {
        var config = obj.data.configuration;
        config.adUnitId = "";
        config.loadAdsOnStartup = false;
        config.adRequestChance = 0.0;
        config.adsPerRequest = 0;
        config.adsPerView = 0;
        config.adTimerEnabled = false;
        config.homeAd = false;
        config.adClickableChance = 0.0;
        config.appsPerAd = 999999;
        config.commentsPerAd = 999999;
        config.showGetProOnWelcome = false;
        body = JSON.stringify(obj);
    }
} catch (e) {}

// 2. Kỹ thuật cưỡng ép (Regex) - "Cách cũ" mà bạn đề xuất
// Dù ứng dụng có giấu premium ở đâu (trong user, trong collection, hay trong meta), 
// nó cũng sẽ bị quét và ép thành true.
body = body.replace(/"premium":\s*false/gi, '"premium":true');
body = body.replace(/"role":\s*"USER"/gi, '"role":"ADMIN"');
$done({ body });