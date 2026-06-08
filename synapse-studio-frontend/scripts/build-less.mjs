import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, extname, dirname } from "node:path";
import less from "less";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src");

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = resolve(dir, e.name);
    if (e.isDirectory() && e.name !== "node_modules" && !e.name.startsWith(".")) {
      yield* walk(p);
    } else if (e.isFile() && e.name.endsWith(".less")) {
      yield p;
    }
  }
}

async function main() {
  let count = 0;

  for await (const file of walk(SRC)) {
    const rel = relative(ROOT, file);
    const cssFile = file.replace(/\.less$/, ".css");
    const input = await readFile(file, "utf-8");

    try {
      const result = await less.render(input, {
        filename: file,
        paths: [dirname(file)],
        compress: false,
      });
      await writeFile(cssFile, result.css, "utf-8");
      console.log(`  ${rel} → ${relative(ROOT, cssFile)}`);
      count++;
    } catch (err) {
      console.error(`Error in ${rel}:`, err.message);
      process.exitCode = 1;
    }
  }

  console.log(`\nCompiled ${count} LESS file(s) to CSS.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
