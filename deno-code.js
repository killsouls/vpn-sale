// Payment + Subscription — HTML form method (Alipay recommended)
const APP_ID = "2021006154631297";
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPJXwUUKqyxycg
qkLImVF8yD6qFhSwbPMnQyuy9k7bnob1QeXFEIMS74DmVJp7f60i7NyPYXylf4/q
kgDcf3ABWDRa0odwnXvHd99hMJRmV+afAPLAFkvx6gqTALR/eJdWKBfqlXn82fq7
MDOJ68DwK7NnsC9ykTpN/Phdq0hXaOO3PydxMv/ye3cqCb7uCqga9RKStyPGkeSJ
DkKGLvLoAjqPe3DlPjBN3kold8KmANk52fW6kbVgYqtptBzMmGhI1uVD833yB+5X
2H7ZIMrNv7ZLYUdVoCqQN5IHnngOGHAHfoPpRt5S8MQV7AbIopWnG5c/2I9sWyKw
/4OVCOD5AgMBAAECggEAaKd1Ib0gL3ieyKjyDorZIqub9OoT0jC1TN01E7A0UyiB
bsnw3LSHv85OpRbxopzjzgbx8fnKEY1DgLGh45NgJfuAu230C4d3uYuQSxQjSve0
6kbdM0aZ25HKjVMUo6Vcr2a8pYsHFq+fOj+xToKIGo84qPQMnGxE/kOWqZTSXOR+
b51+y6G6AmYdb02JA3yint6vokpklLFWdrw8RY/TP3QVqQz/Ko2pT7/H3khOPom2
Dq4lZjtoGdWz6v89M5GHXeZEk3c4qAbaYok4mUpKreO2PykZz83NfFsQoNJqqhPS
KTxDQEbihA5ZY8PeaOBxtw3eQa1mKgoovLWSyfklAQKBgQDZodjLnxYCWnlg600D
F1LqILLXIVqrBgSK2E8qPRmz0cKH16GAbtSALVpOCUWaG0q6rmy6H9ctVuPGbjr1
fHcEaKz4Z8C0nT0A96iNCBaNSrkYTcB4ew63k/p8vten5r+GoAkedoP3UW5CnMV0
VvKDZLYtdxHpbrrVjMzMU/wa0QKBgQCoYfQPn/j99NiH2VsTDQZg3+69wwLoxAaF
cswNJuYIPZDD8sT2PvhuBxlPdYoA7M6xiVz9bq1rCjO13WWu1jvEtql6rwUVI/CU
9DLVmnEBgpBz5QhsU2UK78wg/GDPIA6XNAaHRBh90gcxxyEGcf48IQmKUHdcSy6c
Xz8KDNmdqQKBgA+AU6zNPAgW4aZhnC6oLqO2iIaCPa8I0rIBDkJ376i7PBvo4/v9
6OzoThJY3rhHUV9SpTPsqKr2EWtE1rY9k0yhGBDpcvRqbrnu6faBqPmPZPeyMg9i
1H2G8MSJ41p2ORYhuASPdH7dMflUqUvMFaH+Pmumm4QA+xXS3ZOAN+jBAoGBAIqP
oLFC6TjCRXT1DhcNPtR1MhcB5OD6fotOPlAMVHsvfnNg0Wf5xaF1QgS7Koc8V5KN
APKkIxzUVl0wBT7smF52Gd0VLU+KNa29jh9sadXeRVS5gkbyEVIApq/2Pwvyy07t
xvmEtcrEDJuPy8NsBtQgM6OYN8DBNWgEkPGKRYGRAoGBAIpyPwlubJvfMMTAOdiX
c6PpAS6leYjB5Jn+TaU39WkSRQdeI8Bf0iW9LA6YzoS1DQcSKGNdojAcUUfzCVtv
IctBt8cBhw0Epwd2wz89GNM12eNSE8WB5rgJoKvPwQ8YPek9Txyh7alF8RADLxSs
2U0XIDER/kc9XbMJhX4mojiQ
-----END PRIVATE KEY-----`;

const SUB_URL = "https://dy11.baipiaoyes.com/api/v1/client/subscribe?token=83e15542743a538f2ef4c8ae4c656005";

function pemToBin(p) {
  const b = p.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const r = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) r[i] = b.charCodeAt(i);
  return r;
}

async function sign(data) {
  const kd = pemToBin(PRIVATE_KEY);
  const k = await crypto.subtle.importKey("pkcs8", kd, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const s = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", k, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(s)));
}

function buildQ(p) { return Object.keys(p).sort().map(k => `${k}=${encodeURIComponent(p[k])}`).join("&"); }
function genCode() { return Math.floor(100000 + Math.random() * 900000).toString(); }
function ts() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`; }

const orders = new Map();

Deno.serve(async (req) => {
  const u = new URL(req.url);
  const p = u.pathname;
  const ua = req.headers.get("user-agent") || "";

  if (p === "/" && /Shadowrocket|Clash|V2Ray|Surge|Quantumult|okhttp/i.test(ua)) {
    const r = await fetch(SUB_URL);
    return new Response(await r.text(), { headers: { "content-type": "text/plain" } });
  }

  if (p === "/return") {
    const oid = u.searchParams.get("out_trade_no");
    const order = orders.get(oid);
    const code = order?.code || genCode();
    return new Response(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Complete</title>
<style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}
.c{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:32px 24px;text-align:center;max-width:420px;width:90%;border:1px solid rgba(124,58,237,.3)}
h2{color:#10b981}.lb{background:rgba(0,0,0,.4);border-radius:12px;padding:16px;margin:14px 0}
.lb textarea{width:100%;background:transparent;border:none;color:#a78bfa;font-size:12px;font-family:monospace;resize:none;text-align:center;outline:none}
.btn{display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin:6px}
.code{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);border-radius:10px;padding:12px;margin:12px 0;font-size:18px;color:#f59e0b;letter-spacing:6px}</style></head>
<body><div class="c"><h2>Payment Success</h2>
<div class="lb"><textarea readonly rows="3">${SUB_URL}</textarea></div>
<button class="btn" onclick="navigator.clipboard.writeText('${SUB_URL}');this.textContent='Copied!'">Copy</button>
<div class="code">Code: <b>${code}</b></div>
<p style="font-size:12px;color:#8890a8;margin-top:12px">Import to Clash / Shadowrocket / V2Ray</p></div></body></html>`, { headers: { "content-type": "text/html;charset=utf-8" } });
  }

  if (p === "/pay") {
    const outTradeNo = "VN" + Date.now();
    const bizContent = JSON.stringify({ out_trade_no: outTradeNo, product_code: "QUICK_WAP_WAY", total_amount: "50.00", subject: "Lightning Network", quit_url: u.origin + "/cancel", return_url: u.origin + "/return" });
    const params = { app_id: APP_ID, method: "alipay.trade.wap.pay", charset: "utf-8", sign_type: "RSA2", timestamp: ts(), version: "1.0", notify_url: u.origin + "/return", biz_content: bizContent };
    const signStr = buildQ(params);
    params.sign = await sign(signStr);
    orders.set(outTradeNo, { code: genCode(), time: Date.now() });

    return new Response(`<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>
<form id="f" action="https://openapi.alipay.com/gateway.do" method="GET">
${Object.entries(params).map(([k,v]) => `<input type="hidden" name="${k}" value="${v.replace(/"/g,'&quot;')}">`).join('\n')}
</form><script>document.getElementById('f').submit()</script></body></html>`, { headers: { "content-type": "text/html;charset=utf-8" } });
  }

  return new Response(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Lightning Network</title>
<style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}
.c{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:40px 28px;text-align:center;max-width:380px;width:90%;border:1px solid rgba(124,58,237,.3)}h2{margin-bottom:6px}
.pr{font-size:52px;font-weight:900;color:#f59e0b;margin:20px 0 8px}
.pr span{font-size:16px;font-weight:400;color:#8890a8;text-decoration:line-through;display:block;margin-bottom:4px}
ul{list-style:none;display:inline-block;margin:14px 0}li{padding:6px 0;font-size:14px}
.btn{display:block;width:100%;padding:16px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:14px;font-size:18px;font-weight:700;cursor:pointer;letter-spacing:3px;margin-top:16px;text-decoration:none;box-sizing:border-box}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(124,58,237,.4)}</style></head>
<body><div class="c"><h2>Lightning Network</h2><p style="color:#8890a8;font-size:14px">Global Premium</p>
<div class="pr"><span>199</span>50</div>
<ul><li>1000GB Traffic</li><li>9 Months</li><li>All Platforms</li><li>One-Click Import</li></ul>
<a href="/pay" class="btn">Alipay Pay 50</a>
<p style="margin-top:12px;font-size:11px;color:#8890a8">Auto redirect after payment</p></div></body></html>`, { headers: { "content-type": "text/html;charset=utf-8" } });
});
