import chalk from "chalk";
import minimist from "minimist";

async function init() {
  try {
    const argv = minimist<{
      t?: string;
      template?: string;
    }>(process.argv.slice(2), { string: ["_"] });
    const args = argv._;
    const firstArg = args[0];
    // const isList = firstArg === "--list";
    // const isInit = firstArg === "--init";
    // const isCreate = firstArg === "--create";
    const isHelp = firstArg === "--help";

    if (isHelp) {
      usage();
    } else {
      console.log("Use --help to see available options.");
      usage();
    }
  } catch (error) {}
}

function usage() {
  console.log(`${chalk.whiteBright("fework [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}

init();
