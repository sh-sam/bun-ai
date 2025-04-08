import { serve } from "bun";
import { HumanMessage } from "@langchain/core/messages";

import { graph } from "@graphs/master";

serve({
  async fetch(req) {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }

    // Handle actual POST request
    if (req.method === "POST" && req.headers.get("content-type") === "application/json") {
      const { input } = await req.json();
      const res = await graph.invoke({ messages: [new HumanMessage(input)] });
      console.log(res.messages[1].content);
      return new Response(JSON.stringify(res), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    return new Response("Invalid request method or content type", { status: 400 });
  },
  port: 8000,
});
