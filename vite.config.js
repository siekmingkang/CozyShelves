import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const booksDir = fileURLToPath(new URL("./public/Books", import.meta.url));
const virtualBooks = "virtual:books";
const resolvedBooks = "\0" + virtualBooks;

// Each folder under public/Books is a book: cover.*, page_*.{png,jpg,webp,avif}
// and an optional meta.json ({ "title": "...", "author": "..." }).
function scanBooks() {
  if (!fs.existsSync(booksDir)) return [];

  return fs
    .readdirSync(booksDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const dir = path.join(booksDir, entry.name);
      const files = fs.readdirSync(dir);
      const cover = files.find((file) =>
        /^cover\.(png|jpe?g|webp|avif)$/i.test(file),
      );
      const pages = files
        .filter((file) => /^page_\d+\.(png|jpe?g|webp|avif)$/i.test(file))
        .sort(
          (a, b) =>
            Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]),
        );

      if (!cover || pages.length === 0) return [];

      let meta = {};
      try {
        const parsed = JSON.parse(
          fs.readFileSync(path.join(dir, "meta.json"), "utf8"),
        );
        if (parsed && typeof parsed === "object") meta = parsed;
      } catch {
        // Metadata is optional.
      }

      const asset = (...parts) =>
        "/" +
        ["Books", entry.name, ...parts].map(encodeURIComponent).join("/");

      return [
        {
          id: entry.name,
          title:
            typeof meta.title === "string" && meta.title.trim()
              ? meta.title.trim()
              : entry.name.replaceAll("_", " "),
          author: typeof meta.author === "string" ? meta.author.trim() : "",
          cover: asset(cover),
          pages: pages.map((page) => asset(page)),
        },
      ];
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function booksManifest() {
  return {
    name: "books-manifest",
    resolveId(id) {
      if (id === virtualBooks) return resolvedBooks;
    },
    load(id) {
      if (id === resolvedBooks) {
        return `export default ${JSON.stringify(scanBooks())};`;
      }
    },
    configureServer(server) {
      server.watcher.add(booksDir);
      let reloadTimer;

      server.watcher.on("all", (_event, file) => {
        const target = path.resolve(file);
        if (!target.startsWith(path.resolve(booksDir) + path.sep)) return;

        // Dropping a book folder fires one event per page; reload once.
        clearTimeout(reloadTimer);
        reloadTimer = setTimeout(() => {
          const mod = server.moduleGraph.getModuleById(resolvedBooks);
          if (mod) server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }, 300);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), booksManifest()],
});
