Add-Type -AssemblyName System.Web

function p($n,$s,$p,$f){@{Name=$n;Server=$s;Port=$p;Flag=$f}}

$nodes = @(
  (p "🇯🇵 日本 Tokyo 01" "jp9y3408.cloudflare.182682.xyz" "443" "🇯🇵"),
  (p "🇨🇦 加拿大 Toronto 01" "c321ajeoha.cloudflare.182682.xyz" "443" "🇨🇦"),
  (p "🇨🇦 加拿大 Vancouver 02" "cajeoha.cloudflare.182682.xyz" "443" "🇨🇦"),
  (p "🇨🇦 加拿大 Montreal 03" "141.193.213.60" "443" "🇨🇦"),
  (p "🇸🇬 新加坡 01" "sg083yt.cloudflare.182682.xyz" "443" "🇸🇬"),
  (p "🇸🇬 新加坡 02" "666.cloudflare.182682.xyz" "443" "🇸🇬"),
  (p "🇸🇬 新加坡 03" "141.193.213.107" "443" "🇸🇬"),
  (p "🎬 Youtube 去广告专线" "csgo.com" "443" "🎬"),
  (p "🇭🇰 香港 HK 01" "hkeofhwo3.cloudflare.182682.xyz" "443" "🇭🇰"),
  (p "🇹🇷 土耳其 Istanbul" "23.227.38.84" "443" "🇹🇷"),
  (p "🇬🇧 英国 London 01" "23.227.38.43" "443" "🇬🇧"),
  (p "🇬🇧 英国 Manchester 02" "666.cloudflare.182682.xyz" "443" "🇬🇧"),
  (p "🇬🇧 英国 Edinburgh 03" "141.193.213.199" "443" "🇬🇧"),
  (p "🇲🇾 马来西亚 Kuala Lumpur" "malaia.cloudflare.182682.xyz" "443" "🇲🇾"),
  (p "🇮🇸 冰岛 Reykjavik" "bi23aogo.cloudflare.182682.xyz" "443" "🇮🇸"),
  (p "🇺🇸 美国 Los Angeles 01-GPT" "111.cloudflare.182682.xyz" "443" "🇺🇸"),
  (p "🇺🇸 美国 解锁迪士尼+" "csgo.com" "443" "🇺🇸"),
  (p "🇺🇸 美国 解锁Netflix" "104.19.174.68" "443" "🇺🇸"),
  (p "🇺🇸 美国 New York 04" "104.19.173.68" "443" "🇺🇸"),
  (p "🇺🇸 美国 Chicago 05" "555.cloudflare.182682.xyz" "443" "🇺🇸"),
  (p "🇺🇸 美国 高速 06" "23.227.38.212" "443" "🇺🇸"),
  (p "🇺🇸 美国 高速 07" "777.cloudflare.182682.xyz" "443" "🇺🇸"),
  (p "🇺🇸 美国 高速 08" "888.cloudflare.182682.xyz" "443" "🇺🇸"),
  (p "🇺🇸 美国 高速 09" "999.cloudflare.182682.xyz" "443" "🇺🇸")
)

# Group
$byCountry = @{}
foreach ($n in $nodes) {
  $c = ($n.Name -split '\s+')[0..1] -join ' '
  if (-not $byCountry[$c]) { $byCountry[$c] = @() }
  $byCountry[$c] += $n
}

# Build country cards
$cards = ""
foreach ($c in ($byCountry.Keys | Sort-Object)) {
  $list = $byCountry[$c]
  $cards += "<div class='cc'><div class='ch'><span class='cf'>$($list[0].Flag)</span><span class='cn'>$c</span><span class='ct'>$($list.Count) 节点</span></div><div class='nl'>"
  foreach ($n in $list) {
    $cards += "<div class='nr'><span class='nn'>$($n.Name)</span><code>$($n.Server)</code><button class='bc' onclick=\"copyT('$($n.Name)')\" title='复制'>📋</button></div>"
  }
  $cards += "</div></div>"
}

$SUB = "https://dy11.baipiaoyes.com/api/v1/client/subscribe?token=83e15542743a538f2ef4c8ae4c656005"

$html = @"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>闪电网络 · 全球加速</title>
<style>
:root{--bg:#060614;--c:#0e0e28;--a:#7c3aed;--g:#f59e0b;--t:#e2e8f0;--s:#94a3b8;--gr:#10b981}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:var(--t);min-height:100vh}
.w{max-width:900px;margin:0 auto;padding:16px}
.h{text-align:center;padding:36px 0 20px}
.h span{font-size:52px;display:block}
.h h1{font-size:30px;font-weight:800;background:linear-gradient(135deg,#7c3aed,#a78bfa,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:6px 0}
.h p{color:var(--s);font-size:14px}
.sb{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:12px 0 20px}
.sb>div{border:1px solid rgba(124,58,237,.2);border-radius:12px;padding:12px 18px;text-align:center;min-width:80px}
.sb b{font-size:22px;color:#a78bfa;display:block}
.sb i{font-size:11px;color:var(--s);font-style:normal}
.ib{background:var(--c);border-radius:14px;padding:16px 20px;margin-bottom:20px;border:1px solid rgba(124,58,237,.3);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.ib .lb{font-weight:700;color:#a78bfa;font-size:14px;white-space:nowrap}
.ib .ub{flex:1;min-width:200px;display:flex;gap:6px}
.ib input{flex:1;padding:10px 12px;background:#060614;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#a78bfa;font-size:12px;font-family:monospace;outline:none}
.bt{display:inline-flex;align-items:center;gap:4px;padding:10px 16px;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s;white-space:nowrap}
.bt-p{background:var(--a);color:#fff}.bt-p:hover{opacity:.9;transform:translateY(-1px)}
.bt-g{background:var(--g);color:#1a1a2e}.bt-g:hover{opacity:.9;transform:translateY(-1px)}
.bt-o{background:transparent;border:1px solid rgba(255,255,255,.15);color:var(--t)}.bt-o:hover{background:rgba(255,255,255,.05)}
.ibtns{display:flex;gap:6px;flex-wrap:wrap}
.st{font-size:18px;font-weight:700;margin:24px 0 14px;display:flex;align-items:center;gap:8px}
.st::after{content:'';flex:1;height:1px;background:rgba(124,58,237,.2)}
.cc{background:var(--c);border-radius:14px;margin-bottom:10px;overflow:hidden;border:1px solid rgba(255,255,255,.04)}
.ch{display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(124,58,237,.08);border-bottom:1px solid rgba(255,255,255,.03)}
.cf{font-size:22px}.cn{font-weight:700;font-size:15px}
.ct{font-size:12px;color:var(--s);margin-left:auto;background:rgba(124,58,237,.15);padding:2px 10px;border-radius:10px}
.nl{padding:4px}
.nr{display:flex;align-items:center;gap:8px;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,.02);font-size:13px}
.nr:last-child{border-bottom:none}.nr:hover{background:rgba(124,58,237,.03)}
.nn{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}
.nr code{font-size:11px;color:var(--s);background:rgba(0,0,0,.2);padding:2px 8px;border-radius:4px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bc{background:transparent;border:1px solid rgba(255,255,255,.08);color:var(--s);padding:4px 8px;border-radius:6px;cursor:pointer;font-size:14px;transition:.2s}
.bc:hover{background:var(--a);color:#fff;border-color:var(--a)}
.by{background:linear-gradient(145deg,#1a1040,#0e0e28);border-radius:18px;padding:28px;text-align:center;margin:24px 0;border:2px solid rgba(124,58,237,.3)}
.by h3{font-size:22px;margin-bottom:6px}
.by .pr{font-size:48px;font-weight:800;color:var(--g);margin:16px 0 4px}
.by .pr small{font-size:22px}
.by .og{text-decoration:line-through;color:var(--s);font-size:14px}
.by ul{list-style:none;margin:16px 0;display:inline-block;text-align:left}
.by ul li{padding:6px 0;font-size:14px}
.bb{display:block;width:100%;max-width:300px;margin:16px auto 0;padding:16px;border:none;border-radius:14px;font-size:18px;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;letter-spacing:2px;transition:.3s}
.bb:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(124,58,237,.3)}
.ov{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.9);z-index:100;align-items:center;justify-content:center;padding:20px}
.ov.ac{display:flex}
.md{background:var(--c);border-radius:18px;padding:24px;max-width:420px;width:100%;border:1px solid rgba(124,58,237,.3);max-height:90vh;overflow-y:auto}
.md h3{text-align:center;margin-bottom:12px;font-size:18px}
.qr{display:block;width:200px;height:200px;margin:12px auto;border-radius:12px;object-fit:contain;border:2px solid rgba(255,255,255,.1)}
.ci{width:100%;padding:14px;background:#060614;border:2px solid rgba(124,58,237,.3);border-radius:10px;color:#fff;font-size:20px;text-align:center;letter-spacing:6px;font-family:monospace;outline:none;margin:10px 0}
.ci:focus{border-color:var(--a)}
.ce{display:none;color:#ef4444;font-size:13px;text-align:center;margin:6px 0}
.ce.sh{display:block}
.lb2{display:none;margin-top:12px;background:#060614;border-radius:10px;padding:14px;border:1px solid rgba(245,158,11,.3)}
.lb2.sh{display:block}
.lb2 textarea{width:100%;background:#000;border:1px solid rgba(255,255,255,.1);border-radius:6px;color:#a78bfa;font-size:11px;padding:8px;font-family:monospace;resize:none;word-break:break-all}
.cls{display:block;width:100%;padding:10px;border:none;border-radius:8px;background:rgba(255,255,255,.05);color:var(--s);font-size:14px;cursor:pointer;margin-top:10px}
.ts{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--gr);color:#fff;padding:12px 24px;border-radius:24px;font-size:14px;font-weight:600;z-index:200;opacity:0;transition:.3s;pointer-events:none}
.ts.sh{opacity:1}
.ft{text-align:center;padding:30px 0;color:var(--s);font-size:12px}
.al{color:rgba(255,255,255,.06);font-size:11px;cursor:pointer}
.al:hover{color:var(--s)}

/* Admin - Card Management */
.acm{margin:8px 0;padding:8px;background:rgba(0,0,0,.2);border-radius:8px;font-size:12px}
.acm .row{display:flex;gap:6px;align-items:center;margin:4px 0}
.acm input{flex:1;padding:6px 8px;background:#060614;border:1px solid rgba(255,255,255,.1);border-radius:6px;color:#fff;font-size:12px;outline:none}
.acm select{background:#060614;border:1px solid rgba(255,255,255,.1);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px}
.del-btn{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#ef4444;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:11px}
.pkgs{margin:8px 0;max-height:160px;overflow-y:auto}
.pkg-row{display:flex;justify-content:space-between;align-items:center;padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.03);font-size:12px}
.pkg-row:last-child{border:none}

@media(max-width:480px){.h h1{font-size:24px}.sb>div{padding:10px 14px}.sb b{font-size:18px}.ib{flex-direction:column;align-items:stretch}.nr code{display:none}.by .pr{font-size:38px}}
</style>
</head>
<body>
<div class="w">
<div class="h"><span>⚡</span><h1>闪电网络</h1><p>全球高速专线 · 多协议支持 · 一键导入</p></div>
<div class="sb"><div><b>$($nodes.Count)</b><i>全球节点</i></div><div><b>$($byCountry.Keys.Count)</b><i>覆盖地区</i></div><div><b>1Gbps</b><i>峰值带宽</i></div><div><b>808GB</b><i>剩余流量</i></div></div>
<div class="ib"><span class="lb">🔗 订阅导入</span><div class="ub"><input id="su" value="$SUB" readonly><button class="bt bt-p" onclick="copyT('$SUB')">📋 复制</button></div><div class="ibtns"><button class="bt bt-o" onclick="openG('clash')">🟣 Clash</button><button class="bt bt-o" onclick="openG('sr')">📱 小火箭</button><button class="bt bt-o" onclick="openG('v2ray')">💻 V2Ray</button></div></div>
<div class="st">🌍 节点分布</div>$cards
<div class="by" id="buy"><h3>🔥 限时特惠</h3><p id="pkgInfo">1000GB · 9个月 · 全平台通用</p><div class="og">原价 ¥199</div><div class="pr"><small>¥</small><span id="pkgPrice">50</span></div><ul><li>✅ 全平台通用（iOS/Android/Win/Mac）</li><li>✅ 一键订阅导入，无需手动配置</li><li>✅ 节点每日自动更新</li><li>✅ Clash / Shadowrocket / V2Ray</li></ul><button class="bb" onclick="openBuy()">💳 立即购买</button></div>
<div class="ft"><p>Clash · Shadowrocket · V2RayN · Surge 全支持</p><span class="al" onclick="openAdm()">⚙️</span></div>
</div>

<!-- Buy Modal -->
<div class="ov" id="bo"><div class="md"><h3>🛒 购买流程</h3><p style="text-align:center;font-size:14px">① 支付宝扫码支付 <strong>¥<span id="mp">50</span></strong></p><img class="qr" src="qr.png" alt="收款码" onerror="this.style.display='none'"><p style="text-align:center;font-size:12px;color:var(--s)">② 支付后联系客服获取验证码</p><input class="ci" id="ci" placeholder="输入6位验证码" maxlength="6" autocomplete="off"><div class="ce" id="ce">❌ 验证码错误</div><button class="bt bt-g" style="width:100%;padding:14px;margin-top:6px" onclick="vc()">✅ 验证获取订阅</button><div class="lb2" id="lb2"><label style="font-size:12px;color:var(--s)">📋 订阅链接</label><textarea id="li" readonly rows="2"></textarea><div id="pkgDetail" style="margin-top:8px;font-size:13px;color:#a78bfa;text-align:center"></div><button class="bt bt-p" style="width:100%;margin-top:6px" onclick="copyT(document.getElementById('li').value)">📋 复制链接</button></div><button class="cls" onclick="closeBuy()">关闭</button></div></div>

<!-- Guide Modal -->
<div class="ov" id="go"><div class="md"><h3 id="gt">📱 导入教程</h3><div id="gc"></div><button class="cls" onclick="closeG()">关闭</button></div></div>

<!-- Admin Modal -->
<div class="ov" id="ao"><div class="md">
<div id="al"><h3>🔐 管理员登录</h3><input type="password" class="ci" id="ap" placeholder="管理密码" style="letter-spacing:2px;font-size:16px"><button class="bt bt-g" style="width:100%;padding:14px" onclick="al()">登录</button><button class="cls" onclick="closeAdm()">关闭</button></div>
<div id="ad" style="display:none"><h3>⚙️ 管理后台</h3>
<div style="margin:10px 0"><b>📦 套餐管理</b> <span style="font-size:11px;color:var(--s)">（创建不同流量/时长的套餐）</span></div>
<div class="acm"><div class="row"><input id="pkName" placeholder="套餐名 如: 基础版"><input id="pkGB" placeholder="流量GB" style="max-width:80px"><select id="pkMo"><option value="1">1个月</option><option value="3">3个月</option><option value="6">6个月</option><option value="9" selected>9个月</option><option value="12">12个月</option></select></div><div class="row"><input id="pkPrice" placeholder="价格 如: 50"><input id="pkCode" placeholder="验证码(6位)" maxlength="6" style="max-width:100px"><button class="bt bt-p" onclick="addPkg()" style="padding:6px 12px;font-size:12px">➕ 添加</button></div></div>
<div class="pkgs" id="pkgs"></div>
<div style="margin:12px 0 8px"><b>📊 使用统计</b></div>
<div style="font-size:13px"><div>总尝试: <b id="st" style="color:#a78bfa">0</b></div><div>成功: <b id="ss" style="color:#10b981">0</b></div><div>失败: <b id="sf" style="color:#ef4444">0</b></div></div>
<button class="bt" style="width:100%;background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.2);margin:10px 0" onclick="rs()">🔄 重置统计</button>
<button class="cls" onclick="closeAdm()">关闭</button></div></div></div>

<div class="ts" id="ts"></div>

<script>
const SUB="$SUB",ADMPW="Ff666888";
let adin=false,curPkg=null;

// Package management
function getPkgs(){try{return JSON.parse(localStorage.getItem('vpp')||'[]')}catch(e){return[]}}
function savePkgs(p){localStorage.setItem('vpp',JSON.stringify(p))}

function addPkg(){
  const n=document.getElementById('pkName').value.trim();
  const gb=document.getElementById('pkGB').value.trim();
  const mo=document.getElementById('pkMo').value;
  const pr=document.getElementById('pkPrice').value.trim();
  const cd=document.getElementById('pkCode').value.trim();
  if(!n||!gb||!pr||!cd||cd.length<4){toast('⚠️ 请填写完整');return}
  let pkgs=getPkgs();
  if(pkgs.find(p=>p.code===cd)){toast('⚠️ 验证码重复');return}
  pkgs.push({name:n,gb:Number(gb),mo:Number(mo),price:Number(pr),code:cd,uses:0});
  savePkgs(pkgs);
  ['pkName','pkGB','pkPrice','pkCode'].forEach(id=>document.getElementById(id).value='');
  renderPkgs();toast('✅ 套餐已添加')
}
function delPkg(code){
  if(!confirm('删除此套餐？'))return;
  let pkgs=getPkgs().filter(p=>p.code!==code);
  savePkgs(pkgs);renderPkgs();toast('✅ 已删除')
}
function renderPkgs(){
  const pkgs=getPkgs();
  const el=document.getElementById('pkgs');
  if(pkgs.length===0){el.innerHTML='<div style="color:var(--s);font-size:12px;text-align:center;padding:8px">暂无套餐，请添加</div>';return}
  el.innerHTML=pkgs.map(p=>`<div class="pkg-row"><span>${p.name} | ${p.gb}GB/${p.mo}月 | ¥${p.price} | 码:${p.code}</span><div style="display:flex;align-items:center;gap:4px"><span style="font-size:10px;color:var(--s)">售${p.uses}</span><button class="del-btn" onclick="delPkg('${p.code}')">✕</button></div></div>`).join('')
}

// Buy flow - check packages
function openBuy(){
  document.getElementById('bo').classList.add('ac');
  document.getElementById('ci').value='';document.getElementById('ce').classList.remove('sh');
  document.getElementById('lb2').classList.remove('sh');
  // Show default price
  document.getElementById('mp').textContent='50';document.getElementById('pkgPrice').textContent='50';
  document.getElementById('pkgInfo').textContent='1000GB · 9个月 · 全平台通用';
  document.getElementById('pkgDetail').textContent=''
}
function closeBuy(){document.getElementById('bo').classList.remove('ac')}

function vc(){
  const v=document.getElementById('ci').value.trim();
  const e=document.getElementById('ce');
  if(!v){e.textContent='⚠️ 请输入验证码';e.classList.add('sh');return}
  // Check packages first
  const pkgs=getPkgs();
  const pkg=pkgs.find(p=>p.code===v);
  let s=JSON.parse(localStorage.getItem('vps')||'{"t":0,"s":0,"f":0}');s.t++;
  if(pkg){
    s.s++;localStorage.setItem('vps',JSON.stringify(s));
    // Update pkg usage
    pkg.uses=(pkg.uses||0)+1;savePkgs(pkgs);
    e.classList.remove('sh');
    document.getElementById('li').value=SUB;
    document.getElementById('pkgDetail').innerHTML=`📦 <b>${pkg.name}</b> | ${pkg.gb}GB · ${pkg.mo}个月 | 到期: ${new Date(Date.now()+pkg.mo*30*86400000).toLocaleDateString('zh-CN')}`;
    document.getElementById('lb2').classList.add('sh');
    toast(`✅ ${pkg.name} 订阅已生成`)
    return
  }
  // Fallback to default code
  if(v===(localStorage.getItem('vpc')||'888888')){
    s.s++;localStorage.setItem('vps',JSON.stringify(s));
    e.classList.remove('sh');
    document.getElementById('li').value=SUB;
    document.getElementById('pkgDetail').innerHTML='📦 <b>默认套餐</b> | 1000GB · 9个月';
    document.getElementById('lb2').classList.add('sh');
    toast('✅ 订阅链接已生成');return
  }
  s.f++;localStorage.setItem('vps',JSON.stringify(s));
  e.textContent='❌ 验证码错误，请联系客服';e.classList.add('sh')
}

// Guides
function openG(t){
  const g={clash:{t:'🟣 Clash 导入',c:'<p>1. 打开 Clash Verge</p><p>2. 配置 → 导入</p><p>3. 粘贴订阅链接</p><p>4. 开启系统代理</p><p style="margin-top:8px;color:var(--s)">支持: Clash Verge / ClashX / CFW</p>'},
  sr:{t:'📱 小火箭导入',c:'<p>1. 打开 Shadowrocket</p><p>2. 右上角 + → Subscribe</p><p>3. 粘贴订阅链接</p><p>4. 选择节点连接</p><p style="margin-top:8px;color:var(--s)">仅 iOS</p>'},
  v2ray:{t:'💻 V2Ray 导入',c:'<p>1. 打开 V2RayN / NG</p><p>2. 订阅 → 订阅设置</p><p>3. 添加订阅链接</p><p>4. 更新订阅</p><p style="margin-top:8px;color:var(--s)">支持: V2RayN(Win) / V2RayNG(Android)</p>'}}
  document.getElementById('gt').textContent=g[t].t;document.getElementById('gc').innerHTML=g[t].c;
  document.getElementById('go').classList.add('ac')
}
function closeG(){document.getElementById('go').classList.remove('ac')}

// Admin
function openAdm(){document.getElementById('ao').classList.add('ac');adin?sd():sl()}
function closeAdm(){document.getElementById('ao').classList.remove('ac')}
function sl(){document.getElementById('al').style.display='block';document.getElementById('ad').style.display='none';adin=false}
function sd(){document.getElementById('al').style.display='none';document.getElementById('ad').style.display='block';renderPkgs();const s=JSON.parse(localStorage.getItem('vps')||'{"t":0,"s":0,"f":0}');document.getElementById('st').textContent=s.t;document.getElementById('ss').textContent=s.s;document.getElementById('sf').textContent=s.f}
function al(){if(document.getElementById('ap').value===ADMPW){adin=true;sd()}else{toast('❌ 密码错误')}}
function rs(){if(confirm('确定重置统计？')){localStorage.setItem('vps','{"t":0,"s":0,"f":0}');sd();toast('✅ 已重置')}}

// Utils
function copyT(t){navigator.clipboard?.writeText(t);const e=document.createElement('textarea');e.value=t;document.body.appendChild(e);e.select();document.execCommand('copy');document.body.removeChild(e);toast('📋 已复制')}
function toast(m){const t=document.getElementById('ts');t.textContent=m;t.classList.add('sh');setTimeout(()=>t.classList.remove('sh'),2000)}

// Event listeners
document.querySelectorAll('.ov').forEach(o=>o.addEventListener('click',function(e){if(e.target===this)this.classList.remove('ac')}));
document.getElementById('ci')?.addEventListener('keydown',e=>{if(e.key==='Enter')vc()});
document.getElementById('ap')?.addEventListener('keydown',e=>{if(e.key==='Enter')al()});
</script>
</body>
</html>
"@

$html | Out-File "C:\Users\15082\.openclaw\workspace\vpn-sale\index.html" -Encoding UTF8
Write-Output "✅ Generated index.html ($($nodes.Count) nodes)"
