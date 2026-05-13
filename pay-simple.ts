Deno.serve(async (req) => {
  const u = new URL(req.url);
  const p = u.pathname;

  if (p === "/") {
    return new Response(`付款页`,{headers:{"content-type":"text/html;charset=utf-8"}});
  }
  
  if (p === "/pay") {
    return Response.redirect("https://www.xichen22.com/s/kb5PHyS99mG", 302);
  }

  return new Response("ok");
});
