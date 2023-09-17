#!/usr/bin/env bun
import { Command } from "@commander-js/extra-typings";
import path from "node:path";
import fs from "node:fs/promises";

const command = new Command();

function unescape(str: string) {
  return str.replace(/\\n/g, "\n");
}

command
  .requiredOption("-c, --content <string>", "The content to prepend")
  .requiredOption("-f, --file <files...>", "Files to prepend to")
  .option("-v, --verbose", "Verbose output")
  .option("-e, --ext <extensions...>", "Only prepend to these file extensions")
  .action(async (opts) => {
    if (opts.verbose) {
      console.log(`Extensions: ${opts.ext ?? "none"}`);
      console.log(`Files: ${opts.file}`);
      console.log(`Content: ${opts.content}`);
    }

    const exts = opts.ext ? opts.ext.map((s) => s.replace(".", "")) : opts.ext;

    for (const file of opts.file) {
      if (exts) {
        const ext = path.extname(file).replace(".", "");

        console.log(ext);
        if (!exts.includes(ext)) continue;
      }

      if (opts.verbose) {
        console.log(`Prepending to ${file}`);
      }

      const cwd = process.cwd();

      const filePath = path.join(cwd, file);

      const content = await fs.readFile(filePath);
      const string = content.toString("utf8");

      const newContent = unescape(opts.content) + string;

      await fs.writeFile(filePath, newContent);
    }
  });

await command.parseAsync(process.argv);
