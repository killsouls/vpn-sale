// Deno Deploy 订阅代理 V2
Deno.serve(async () => {
  const res = await fetch(
    "https://dy11.baipiaoyes.com/api/v1/client/subscribe?token=83e15542743a538f2ef4c8ae4c656005",
    { headers: { "User-Agent": "Shadowrocket/2.2.29" } }
  );
  return new Response(await res.text(), {
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});
