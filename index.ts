import { RpcTarget, newHttpBatchRpcResponse } from "capnweb";
import type { Api } from "./rpc";

export class RpcApi extends RpcTarget implements Api {
  sayHello(name: string) {
    return "Hello, " + name;
  }
}

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          timestamp: new Date().toISOString(),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (url.pathname === "/api") {
      const res = newHttpBatchRpcResponse(request, new RpcApi());
      return res;
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📡 Health check: GET /health`);
