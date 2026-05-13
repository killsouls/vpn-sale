// 支付宝自动收款 + 订阅发放 - Deno Deploy
const ALIPAY_GATEWAY = "https://openapi.alipay.com/gateway.do";
const APP_ID = "2021006154680330";
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

const ALIPAY_PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyVYOwTmi4PUVPucDdySd
HUtA6H4u8KxwEInXeLF+lofo2wRIicRJm6ibfgL949WoAz8yYuG/N1u7WV1EDvkV
1FQdbyKySEOWXBun8HQwrkXTMgnx9yjJUvgfnysK8n74dpAR6vZ83qaz9FyONJqX
ngoEwm8SENVuUxbYoyffO5Z97Rr6JTibMHs5eFaeUd7aBkbEmnQspdeNcUWi4wPi
G36mBlAN3zG2zK6R25xKryWVwtpnWG6xd72FBZX0gQjXCF3yFjwRMKZZ+U8FnrQJ
kqulE23MttWbPT45dVdbrsUgYTw1BgPlUJ27dVFTnmnNYJXYSRWIZNo5rGUWQpqi
CQIDAQAB
-----END PUBLIC KEY-----`;

const SUB_URL = "https://late-newt-55.killsouls.deno.net";
const RETURN_URL = "https://late-newt-55.killsouls.deno.net/return";

// RSA-SHA256 signing
async function sign(data) {
  const key = await crypto.subtle.importKey(
    "pkcs8",
    new TextEncoder().encode(PRIVATE_KEY.replace(/-----.*?-----/g, "").replace(/\s/g, "")).buffer
      ? (() => { const b = atob(PRIVATE_KEY.replace(/-----.*?-----/g, "").replace(/\s/g, "")); const a = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a.buffer; })(),
    { name: "RSA-PSS", hash: "SHA-256" },
    false,
    ["sign"]
  );
  // Actually use RSASSA-PKCS1-v1_5 for Alipay
  return "";
}

// Simpler: use SubtleCrypto properly
async function rsaSign(dataStr) {
  const pem = PRIVATE_KEY;
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const binary = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  
  const key = await crypto.subtle.importKey(
    "pkcs8",
    binary,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const data = new TextEncoder().encode(dataStr);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, data);
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

function buildAlipayUrl(params) {
  const sorted = Object.keys(params).sort();
  const query = sorted.map(k => `${k}=${encodeURIComponent(params[k])}`).join("&");
  return query;
}

// Generate 6-digit code
function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// Store codes in memory (simple KV)
const codes = new Map();

async function handleRequest(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Return page - after Alipay payment
  if (path === "/return") {
    const outTradeNo = url.searchParams.get("out_trade_no");
    const code = codes.get(outTradeNo) || genCode();
    codes.delete(outTradeNo);

    return new Response(
      `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>支付成功</title>
<style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}
.card{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:32px 24px;text-align:center;max-width:400px;width:90%;border:1px solid rgba(124,58,237,.3)}
h2{color:#10b981;margin-bottom:8px}
.sub{color:#8890a8;font-size:14px;margin-bottom:20px}
.code-box{background:rgba(0,0,0,.4);border:2px solid rgba(124,58,237,.3);border-radius:12px;padding:20px;margin:16px 0}
.code{font-size:48px;font-weight:900;color:#f59e0b;letter-spacing:12px;font-family:monospace}
.label{font-size:12px;color:#8890a8;margin-bottom:8px}
.link-box{background:rgba(0,0,0,.4);border-radius:10px;padding:14px;margin:16px 0;border:1px solid rgba(255,255,255,.06)}
.link-box textarea{width:100%;background:transparent;border:none;color:#a78bfa;font-size:11px;font-family:monospace;resize:none;word-break:break-all;text-align:center}
.btn{display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;text-decoration:none;margin:6px}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(124,58,237,.4)}
.guide{margin-top:20px;font-size:13px;color:#8890a8;text-align:left}
.guide p{margin:4px 0}
</style></head><body>
<div class="card">
<h2>✅ 支付成功</h2>
<p class="sub">您的订阅已自动生成</p>
<div class="code-box">
<div class="label">📋 订阅链接</div>
<div class="link-box"><textarea id="sub" readonly rows="3">${SUB_URL}</textarea></div>
<button class="btn" onclick="navigator.clipboard.writeText('${SUB_URL}');this.textContent='✅ 已复制'">📋 复制订阅链接</button>
</div>
<div class="guide">
<p><b>📱 一键导入教程：</b></p>
<p>① 打开 Clash / 小火箭 / V2Ray</p>
<p>② 粘贴订阅链接 → 下载配置</p>
<p>③ 开启代理即可使用</p>
</div>
<p style="font-size:12px;color:#8890a8;margin-top:16px">如有问题请联系客服</p>
</div>
</body></html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } }
    );
  }

  // Payment page - redirect to Alipay
  if (path === "/pay") {
    const total = url.searchParams.get("total") || "0.01"; // Test: 1 cent
    const outTradeNo = "ORDER" + Date.now();
    const subject = "闪电网络-全球畅联套餐";

    const bizContent = JSON.stringify({
      out_trade_no: outTradeNo,
      product_code: "QUICK_WAP_WAY",
      total_amount: total,
      subject: subject,
      quit_url: RETURN_URL
    });

    const params = {
      app_id: APP_ID,
      method: "alipay.trade.wap.pay",
      charset: "utf-8",
      sign_type: "RSA2",
      timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "").replace(/[:-]/g, "").replace("T", " ").substring(0, 15),
      version: "1.0",
      notify_url: RETURN_URL,
      return_url: RETURN_URL,
      biz_content: bizContent
    };

    // Build query string for signing
    const signStr = buildAlipayUrl(params);
    const signature = await rsaSign(signStr);
    params.sign = encodeURIComponent(signature);

    // Build final URL
    const finalQuery = buildAlipayUrl(params);
    const alipayUrl = `${ALIPAY_GATEWAY}?${finalQuery}`;

    // Store order
    codes.set(outTradeNo, genCode());

    return Response.redirect(alipayUrl, 302);
  }

  // Default - redirect to main site
  return Response.redirect("https://killsouls.github.io/vpn-sale/", 302);
}

Deno.serve(handleRequest);
