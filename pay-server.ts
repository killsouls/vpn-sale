// 璁㈤槄浠ｇ悊 + 鏀粯瀹濇敮浠?const APP_ID = "2021006154631297";
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJVg7BOaLg9RU+
5wN3JJ0dS0Dofi7wrHAQidd4sX6Wh+jbBEiJxEmbqJt+Av3j1agDPzJi4b83W7tZ
XUQO+RXUVB1vIrJIQ5ZcG6fwdDCuRdMyCfH3KMlS+B+fKwryfvh2kBHq9nzeprP0
XI40mpeeCgTCbxIQ1W5TFtijJ987ln3tGvolOJswezl4Vp5R3toGRsSadCyl141x
RaLjA+IbfqYGUA3fMbbMrpHbnEqvJZXC2mdYbrF3vYUFlfSBCNcIXfIWPBEwpln5
TwWetAmSq6UTbcy21Zs9Pjl1V1uuxSBhPDUGA+VQnbt1UVOeac1gldhJFYhk2jms
ZRZCmqIJAgMBAAECggEAX4FjHmWoze10VpJfInVL0kmQULkKq0AhKLc6bxZDZkSy
QLKXdkKWaDBjEjN5HEqNmHyx+hX8DtaE2K9VSYT+xengzIc46u6ktKypzXZQYVre
BC6TiRrf5WuuFGLmnoF8e0F8PmkOcs/BLXl6O5nZsi4uc80cVL/pxaBgw4R2cFzr
O4B0gbaszqOhFzVi0ymYiK99oePfxuTQ4haOQCm5JqIGiPICPtUksMoDzc/AZK+D
YOLm8Nj6A/WpR+8e5pOzwkJNuEh0BR8WP5cVNdRYV8GANdixbxkgGWVLocrcdxXh
JhQRMpScXEq2bMbEPxvfuhbM+ZvvlvWECaURI+fYAQKBgQDw1hnJmGcqut1nqQzD
OhKXqqIc2hOAdhpDMJk2tP4Qh6vB0ddV7XE6ONQCotlb4K0bEkOgtMAH+UCEhGyw
q6Wp7RynTXU/rFiDB+hfmnc1+RQIMhUVZ7oxjFYR//UobNMAqaEg5bXFm9wgBAS5
+2OkHtS9TxaKDJBv4tBLMmFemQKBgQDWA0bjUuK2HTSMrkvhnD28WCbG906bwpvC
nq9zPT2bKODhesIlS0jS9cIlnxsXe3c6IGWy2GKMy/aAuNMKeSMwnWELliHChEdK
PVBXpdKD65g0u7kZzC/5Jsh91No+TxocD7T5dPnPMkK0ahNo+Ig2g9dyEDB1KgAL
73OiRvW08QKBgQCOfp8TYFDqP1Xwl10txZZqllMEryMKxtYTGxYMAFqyfRNqwjWe
abastCL8zE2+xtilQ9EvrMJR9W/u+Es23NhQCjMB6hqNafOU04Dxz/rovE7V6ov+
9jh8SIREciUjnf/aTINBa6h5GxbK+pWxVMRHvtYwjDLRy01KZfDIDS7/QQKBgFld
SO6Hn8935oeQCHOO8GCDVr3iatqzqqLb7FtsiRsPOMguoH8+LoyYvpdDFub5UVHe
UVka7hvo12fsxYMsDjuwm+Ngr3wwDCy96ZyPy5X2fLoYYTSahLW/Mh0JEpDOKxLo
pCM+a0nPrPb1DGHa1dYdu4sPo4xpG1fghyKOCu+hAoGARAC7SkvAr3OAjNKNLQHj
5nfvDp/pl17yXfzuNIELV+qwwwPjt1lgfF1WJ32suFz8RtwJHiv9GLv21NdfGDZW
cUHOyBLJ7sRTEf3ARshMYpoOfhQD9nlrLtOWSVcRj/fpO0m5sHqlctYasNw0m9IF
PQj8I5V2WGivD/XaBDYXIXY=
-----END PRIVATE KEY-----`;

const SUB_URL = "https://dy11.baipiaoyes.com/api/v1/client/subscribe?token=83e15542743a538f2ef4c8ae4c656005";
const BASE = "https://late-newt-55.killsouls.deno.net";
const SITE = "https://killsouls.github.io/vpn-sale/";

function pem2bin(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const raw = atob(b64);
  const a = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) a[i] = raw.charCodeAt(i);
  return a;
}

async function rsaSign(data) {
  const key = await crypto.subtle.importKey("pkcs8", pem2bin(PRIVATE_KEY), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

function buildQuery(params) {
  return Object.keys(params).sort().map(k => `${k}=${encodeURIComponent(params[k])}`).join("&");
}

const orders = new Map();

async function handle(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  const ua = req.headers.get("user-agent") || "";

  // Subscription proxy (for VPN clients)
  if (path === "/" && (ua.includes("Shadowrocket") || ua.includes("Clash") || ua.includes("V2Ray") || ua.includes("Surge") || ua.includes("Quantumult") || ua.includes("okhttp") || ua.includes("curl") || req.headers.get("accept")?.includes("text/plain"))) {
    const r = await fetch(SUB_URL);
    return new Response(await r.text(), { headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  // Home page
  if (path === "/") {
    return new Response(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>闂數缃戠粶</title>
<style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}.c{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:40px 28px;text-align:center;max-width:380px;width:90%;border:1px solid rgba(124,58,237,.3)}h2{margin-bottom:4px}.pr{font-size:52px;font-weight:900;color:#f59e0b;margin:20px 0 8px}.pr s{font-size:16px;font-weight:400;color:#8890a8;text-decoration:line-through;display:block;margin-bottom:4px}ul{list-style:none;text-align:left;display:inline-block;margin:14px 0}li{padding:6px 0;font-size:14px}.btn{display:block;width:100%;padding:16px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:14px;font-size:18px;font-weight:700;cursor:pointer;letter-spacing:3px;margin-top:16px;text-decoration:none}.btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(124,58,237,.4)}</style></head><body><div class="c"><h2>鈿?闂數缃戠粶</h2><p style="color:#8890a8;font-size:14px">鍏ㄧ悆鐣呰仈濂楅</p><div class="pr"><s>楼199</s>楼50</div><ul><li>鉁?1000GB 楂橀€熸祦閲?/li><li>鉁?9涓湀鏈夋晥鏈?/li><li>鉁?鍏ㄥ钩鍙伴€氱敤</li><li>鉁?涓€閿鍏?/li></ul><a href="${BASE}/pay" class="btn">馃挸 鏀粯瀹濇敮浠?楼50</a><p style="margin-top:12px;font-size:11px;color:#8890a8">鏀粯鍚庤嚜鍔ㄨ幏鍙栬闃?/p></div></body></html>`,{headers:{"content-type":"text/html;charset=utf-8"}});
  }

  // Payment page
  if (path === "/pay") {
    const outTradeNo = "VN" + Date.now();
    const bizContent = JSON.stringify({
      out_trade_no: outTradeNo, product_code: "QUICK_WAP_WAY",
      total_amount: "50.00", subject: "闂數缃戠粶-鍏ㄧ悆鐣呰仈濂楅",
      quit_url: BASE + "/cancel"
    });
    const params = {
      app_id: APP_ID, method: "alipay.trade.wap.pay", charset: "utf-8",
      sign_type: "RSA2", version: "1.0",
      timestamp: new Date().toISOString().slice(0,19).replace(/[-:T]/g," ").slice(0,15),
      notify_url: BASE + "/notify", return_url: BASE + "/return",
      biz_content: bizContent
    };
    const signStr = buildQuery(params);
    params.sign = await rsaSign(signStr);
    orders.set(outTradeNo, { time: Date.now(), paid: false });
    return Response.redirect(`https://openapi.alipay.com/gateway.do?${buildQuery(params)}`, 302);
  }

  // Return / Notify
  if (path === "/return" || path === "/notify") {
    const tradeStatus = url.searchParams.get("trade_status") || "";
    const paid = tradeStatus === "TRADE_SUCCESS" || tradeStatus === "TRADE_FINISHED";
    const title = paid ? "鉁?鏀粯鎴愬姛" : "鈴?鏀粯澶勭悊涓?;
    const subPart = paid ? `<div style="background:rgba(0,0,0,.4);border-radius:12px;padding:16px;margin:14px 0;border:1px solid rgba(255,255,255,.06)"><textarea readonly rows="3" style="width:100%;background:transparent;border:none;color:#a78bfa;font-size:12px;font-family:monospace;resize:none;text-align:center;outline:none">${SUB_URL}</textarea></div><button class="btn" onclick="navigator.clipboard.writeText('${SUB_URL}');this.textContent='鉁?宸插鍒?" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin:6px;text-decoration:none">馃搵 澶嶅埗璁㈤槄閾炬帴</button><p style="margin-top:12px;font-size:12px;color:#8890a8">瀵煎叆 Clash / 灏忕伀绠?/ V2Ray 鍗冲彲浣跨敤</p>` : "";
    return new Response(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${title}</title><style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}.c{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:32px 24px;text-align:center;max-width:420px;width:90%;border:1px solid rgba(124,58,237,.3)}h2{color:#10b981;margin-bottom:6px}.btn-c{display:inline-block;padding:14px 28px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#8890a8;border-radius:12px;font-size:16px;text-decoration:none;margin:8px}</style></head><body><div class="c"><h2>${title}</h2>${subPart}<br><a class="btn-c" href="${SITE}">馃彔 杩斿洖棣栭〉</a></div></body></html>`,{headers:{"content-type":"text/html;charset=utf-8"}});
  }

  if (path === "/cancel") {
    return new Response(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>鏀粯鍙栨秷</title><style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}.c{text-align:center}.btn{display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;text-decoration:none}</style></head><body><div class="c"><h2>馃槙 鏀粯宸插彇娑?/h2><p style="color:#8890a8;margin:12px 0">璇疯繑鍥為噸璇?/p><a href="${BASE}/pay" class="btn">馃挸 閲嶆柊鏀粯</a></div></body></html>`,{headers:{"content-type":"text/html;charset=utf-8"}});
  }

  return Response.redirect(SITE, 302);
}

Deno.serve(handle);
