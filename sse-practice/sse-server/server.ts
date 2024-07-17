import { EventEmitter } from "node:events";

// https://github.com/oven-sh/bun/issues/2443
function sendSseMessage(
  controller: Bun.ReadableStreamController<Uint8Array>,
  data: string,
) {
  const payload = data
    .split("\n")
    .map((line) => `data: ${line}\n\n`)
    .join("");

  controller.enqueue(Buffer.from(payload));
}

const eventEmitter = new EventEmitter();

function sse(req: Request) {
  const { signal } = req;
  return new Response(
    new ReadableStream({
      start(controller) {
        eventEmitter.on("message", (data) => {
          sendSseMessage(controller, data);
        });

        signal.onabort = () => {
          controller.close();
        };
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    },
  );
}

console.log("Start bun server");

Bun.serve({
  port: 8080,
  fetch(req) {
    if (new URL(req.url).pathname === "/sse") {
      return sse(req);
    }
    return new Response("Not Found", { status: 404 });
  },
});

const prompt = "Type prompt: ";
process.stdout.write(prompt);

for await (const line of console) {
  console.log(`You typed: ${line}`);
  eventEmitter.emit("message", line);
  process.stdout.write(prompt);
}
