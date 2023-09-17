#!/usr/bin/env bun
import { Command } from "@commander-js/extra-typings";
import path from "node:path";
import fs from "node:fs/promises";

const command = new Command();

function unescape(str: string) {
  return str.replace(/\\n/g, "\n");
}

command
  .argument("<prepend>", "The content to prepend")
  .argument("<files...>", "Files to prepend to")
  .option("-v, --verbose", "Verbose output")
  .option("-e, --ext <extensions...>", "Only prepend to these file extensions")
  .action(async (prepend, files, opts) => {
    for (const file of files) {
      if (opts.ext) {
        const ext = path.extname(file);
        if (!opts.ext.includes(ext)) continue;
      }

      if (opts.verbose) console.log(`Prepending ${prepend} to ${file}`);

      const cwd = process.cwd();

      const filePath = path.join(cwd, file);

      const content = await fs.readFile(filePath);
      const string = content.toString("utf8");

      const newContent = unescape(prepend) + string;

      await fs.writeFile(filePath, newContent);
    }
  });

await command.parseAsync(process.argv);
