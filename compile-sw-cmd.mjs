function buildCmd(isProd) {
  const args = [
    `bun build`,
    `./src/server/sw.ts`,
    `--outdir`,
    `./public`,
    "--format",
    "esm",
    isProd ? "--minify" : undefined,
    `--sourcemap=${isProd ? "none" : "inline"}`,
    isProd ? undefined : "--watch",
  ];

  return args.filter(Boolean).join(" ");
}

function printFn(str) {
  const separator = () => {
    console.log("");
    console.log("=".repeat(80));
    console.log("");
  };

  separator();
  console.log(str);
  separator();
}

printFn(
  JSON.stringify(
    {
      "dev:sw": buildCmd(false),
      "build:sw": buildCmd(true),
    },
    null,
    2
  )
);
