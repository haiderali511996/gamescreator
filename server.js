/**
 * Custom entry point for hosts (like cPanel's "Setup Node.js App" / Passenger)
 * that expect a plain server.js listening on process.env.PORT, instead of
 * running `next start` directly.
 *
 * Local/Vercel/most hosts: use `npm run dev` or `npm start` (next start) as usual.
 * cPanel: point the app's "Startup File" at this file. Passenger sets PORT itself.
 */
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`> Games Creator ready on port ${port} (${dev ? "development" : "production"})`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
