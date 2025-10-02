import type { Api } from "./rpc";
import { newHttpBatchRpcSession } from "capnweb";

const client = newHttpBatchRpcSession<Api>("http://localhost:3000/api");

const res = await client.sayHello("capicua");
console.log(res);
