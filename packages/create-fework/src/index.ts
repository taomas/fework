import chalk from "chalk";
import fs from "fs-extra/esm";
import minimist from "minimist";
import path from "path";
import prompts from "prompts";
import { fileURLToPath } from "url";

// 转换 import.meta.url 为文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const currentWorkingDirectory = process.cwd();
const defaultTargetDir = "fework-app";

// 创建项目
async function createProject(projectName: string, template: string) {
  const formatProjectName = `${projectName}`.trim().replace(/\/+$/g, "");
  const formatTemplate = `${template}`.trim().toLowerCase();

  // 这里添加创建项目的逻辑
  const projectDir = path.join(currentWorkingDirectory, formatProjectName);
  const templateDir = path.join(__dirname, `../templates/${formatTemplate}`);
  const isExists = await fs.pathExists(projectDir);
  const isTemplateExists = fs.pathExistsSync(templateDir);
  if (!isTemplateExists) {
    console.log(
      `Template ${chalk.blue(
        formatTemplate
      )} not found, please check your input.`
    );
    return;
  } else {
    if (!isExists) {
      fs.ensureDirSync(projectDir);
    }

    // 复制模板文件到项目目录
    fs.copySync(templateDir, projectDir);
    console.log();
    console.log(`Project created at ${chalk.green(projectDir)}`);
    console.log("Now run:");
    console.log(chalk.greenBright(`cd ${formatProjectName}`));
    console.log(chalk.greenBright("pnpm install"));
    console.log(chalk.greenBright("pnpm run dev"));
    console.log();
  }
}

// 创建项目命令
async function createProjectWithPrompt() {
  const platforms = [
    {
      title: "admin",
      value: "admin",
      templates: [
        {
          title: "react",
          value: "admin-react",
        },
        {
          title: "vue",
          value: "admin-vue",
        },
      ],
    },
    {
      title: "server",
      value: "server",
      templates: [
        {
          title: "fastapi",
          value: "server-fastapi",
        },
        {
          title: "nestjs",
          value: "server-nestjs",
        },
      ],
    },
    {
      title: "mini-program",
      value: "mini-program",
      templates: [
        {
          title: "taro",
          value: "mp-taro",
        },
        {
          title: "uniapp",
          value: "mp-uniapp",
        },
      ],
    },
  ];

  const response = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: chalk.reset("Project name:"),
        initial: defaultTargetDir,
      },
      {
        type: "select",
        name: "platform",
        message: "select a platform",
        choices: platforms.map((item) => {
          return {
            title: item.title,
            value: item.value,
            disabled: item.templates ? false : true,
          };
        }),
      },
      {
        type: "select",
        name: "template",
        message: "select a template",
        choices: (prev, values) => {
          const platform = values.platform;
          const templates = platforms.find(
            (item) => item.value === platform
          )?.templates;
          return (
            templates?.map((item) => {
              return {
                title: item.title,
                value: item.value,
              };
            }) || []
          );
        },
      },
    ],
    {
      onCancel: () => {
        console.log("Operation cancelled");
        process.exit(0);
      },
    }
  );

  // 这里添加创建项目的逻辑
  const { projectName, template } = response;
  if (projectName && template) {
    await createProject(projectName, template);
  }
}

async function init() {
  try {
    const argv = minimist(process.argv.slice(2), {
      string: ["template"],
      alias: { t: "template" },
      default: { template: "default" }, // 默认模板
    });
    const args = argv._;
    const cmdName = args[0]; // 命令名称作为第一个参数
    const projectName = args[1]; // 项目名称作为第二个参数
    const template = argv.template || argv.t; // 获取 --template 或 -t 的值
    const isHelp = args.includes("--help");

    // 创建项目命令
    if (cmdName === "create") {
      if (!projectName) {
        await createProjectWithPrompt();
      } else {
        await createProject(projectName, template);
      }
    } else if (isHelp) {
      usage();
    } else {
      console.log("Use --help to see available options.");
      usage();
    }
  } catch (error) {
    console.error("fework error:", error);
  }
}

function usage() {
  console.log(`${chalk.whiteBright("fework [CMD]")}
  ${chalk.greenBright("create")}\tCreate a new project with prompt
  ${chalk.greenBright(
    "create [PROJECT_NAME] --template [TEMPLATE]"
  )}\tCreate a new project
  ${chalk.greenBright("--help")}\tShow this help message`);
}

init();
