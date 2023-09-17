export {};

await Bun.build({
  entrypoints: ["./src/index.ts"],
  minify: true,
  format: "esm",
  outdir: "./dist",
  target: "node",
});
