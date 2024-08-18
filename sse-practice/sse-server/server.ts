import { EventEmitter } from "node:events";

// https://github.com/oven-sh/bun/issues/2443
function sendSseMessage(
  controller: Bun.ReadableStreamController<Uint8Array>,
  data: Buffer,
) {
  console.log("data to be sent: ", data, `${data}`);
  controller.enqueue(Buffer.from(`data: ${data}\n\n`));
}

const eventEmitter = new EventEmitter();

function sse(req: Request) {
  const { signal } = req;
  return new Response(
    new ReadableStream({
      start(controller) {
        let buffer = Buffer.of();
        eventEmitter.on("message", (data) => {
          buffer = Buffer.concat([buffer, data]);
        });
        const interval = setInterval(() => {
          if (buffer.length) {
            sendSseMessage(controller, buffer);
            buffer = Buffer.of();
          }
        }, 200);

        signal.onabort = () => {
          sendSseMessage(controller, buffer);
          clearInterval(interval);
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

process.stdin.setRawMode(true);
process.stdin.on("data", (key) => {
  console.log(`You pressed: ${key}`);

  // Exit on Ctrl+C or Ctrl+D
  if (key[0] === 0x03 || key[0] === 0x04) {
    process.exit();
  }
  eventEmitter.emit("message", key);
});
