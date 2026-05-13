// Payment Server for Lightning Network
const SUB = "https://dy11.baipiaoyes.com/api/v1/client/subscribe?token=83e15542743a538f2ef4c8ae4c656005";
const PAY = "https://www.xichen22.com/s/kb5PHyS99mG";
const SITE = "https://killsouls.github.io/vpn-sale/";

Deno.serve(async (req) => {
  const u = new URL(req.url);
  const p = u.pathname;
  const ua = req.headers.get("user-agent") || "";

  // VPN client subscription
  if (p === "/" && (ua.includes("Shadowrocket") || ua.includes("Clash") || ua.includes("V2Ray") || ua.includes("Surge") || ua.includes("Quantumult") || ua.includes("curl"))) {
    const r = await fetch(SUB);
    return new Response(await r.text(), { headers: { "content-type": "text/plain" } });
  }

  // Home page
  if (p === "/") {
    const h = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Lightning Network</title>
<style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}
.c{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:40px 28px;text-align:center;max-width:380px;width:90%;border:1px solid rgba(124,58,237,.3)}h2{margin-bottom:6px}
.pr{font-size:52px;font-weight:900;color:#f59e0b;margin:20px 0 8px}
.pr span{font-size:16px;font-weight:400;color:#8890a8;text-decoration:line-through;display:block;margin-bottom:4px}
ul{list-style:none;text-align:left;display:inline-block;margin:14px 0}li{padding:6px 0;font-size:14px}
.btn{display:block;width:100%;padding:16px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:14px;font-size:18px;font-weight:700;cursor:pointer;letter-spacing:3px;margin-top:16px;text-decoration:none;box-sizing:border-box}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(124,58,237,.4)}</style></head>
<body><div class="c"><h2>Lightning Network</h2><p style="color:#8890a8;font-size:14px">Global Premium</p>
<div class="pr"><span>CNY 199</span>CNY 50</div>
<ul><li>1000GB Traffic</li><li>9 Months</li><li>All Platforms</li><li>One-Click Import</li></ul>
<a href="/pay" class="btn">Alipay - CNY 50</a>
<p style="margin-top:12px;font-size:11px;color:#8890a8">Auto delivery after payment</p></div></body></html>`;
    return new Response(h, { headers: { "content-type": "text/html;charset=utf-8" } });
  }

  // Payment redirect
  if (p === "/pay") {
    return Response.redirect(PAY, 302);
  }

  // Success page
  if (p === "/success") {
    const h = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Payment Success</title>
<style>body{font-family:'PingFang SC',sans-serif;background:#050510;color:#e8e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}
.c{background:linear-gradient(160deg,#14123c,#0a0823);border-radius:20px;padding:32px 24px;text-align:center;max-width:420px;width:90%;border:1px solid rgba(124,58,237,.3)}
h2{color:#10b981;margin-bottom:8px}.sub{color:#8890a8;font-size:14px;margin-bottom:16px}
.lb{background:rgba(0,0,0,.4);border-radius:12px;padding:16px;margin:14px 0;border:1px solid rgba(255,255,255,.06)}
.lb textarea{width:100%;background:transparent;border:none;color:#a78bfa;font-size:12px;font-family:monospace;resize:none;text-align:center;outline:none;height:50px}
.btn{display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin:6px;text-decoration:none}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(124,58,237,.4)}
.btn2{display:inline-block;padding:14px 28px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#8890a8;border-radius:12px;font-size:16px;text-decoration:none;margin:8px}</style></head>
<body><div class="c"><h2>Payment Complete</h2><p class="sub">Your subscription link:</p>
<div class="lb"><textarea readonly id="s">${SUB}</textarea></div>
<button class="btn" onclick="navigator.clipboard.writeText('${SUB}');this.textContent='Copied!'">Copy Link</button>
<p style="margin-top:16px;font-size:12px;color:#8890a8">Import to Clash / Shadowrocket / V2Ray</p>
<a class="btn2" href="${SITE}">Back to Site</a></div></body></html>`;
    return new Response(h, { headers: { "content-type": "text/html;charset=utf-8" } });
  }

  return Response.redirect(SITE, 302);
});
