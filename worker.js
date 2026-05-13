// Cloudflare Workers 订阅代理
// 效果：隐藏白嫖夜上游，链接变成你自己的

export default {
  async fetch(request) {
    // 真实订阅链接（上游机场）
    const REAL_URL = "https://dy11.baipiaoyes.com/api/v1/client/subscribe?token=83e15542743a538f2ef4c8ae4c656005";
    
    const response = await fetch(REAL_URL);
    const data = await response.text();
    
    return new Response(data, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "access-control-allow-origin": "*"
      }
    });
  }
};
