import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts", // 你的入口文件
  output: [
    {
      file: "dist/index.js", // CommonJS 输出文件，扩展名通常为 .cjs.js
      format: "cjs", // CommonJS 模块格式
    },
    {
      file: "dist/index.mjs", // ES 模块输出文件，扩展名为 .mjs
      format: "esm", // ES 模块格式
    },
  ],
  plugins: [
    typescript(), // 使用 TypeScript 插件
  ],
};
