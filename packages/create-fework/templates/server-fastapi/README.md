# AI写作后台服务

这是一个介绍小程序项目的 README 文件。在这里描述你的小程序项目的概述和功能。

## 功能特点

- 特点一：描述特点一的功能。
- 特点二：描述特点二的功能。
- 特点三：描述特点三的功能。

## 演示截图

插入演示截图或小程序效果的 GIF 动图。

## 使用说明

在这里提供使用说明和操作指南。

## 创建虚拟环境

```bash
# 使用python3创建虚拟环境
python3 -m venv venv
# 激活虚拟环境 - linux
source venv/bin/activate
# 激活虚拟环境 - windows
venv\Scripts\activate
```

### 安装依赖

```bash
# 安装依赖
pip install -r requirements.txt
# 安装langchain相关的依赖
pip install -r requirements_optional.txt
# 将当前安装包保存到配置文件中，以便于部署
pipreqs ./ --encoding=utf-8
```

### 本地运行

如果是开发机 **本地运行**，直接在项目根目录下执行：

```bash
# 本地运行项目
python main.py
```

### 服务器部署

使用nohup命令在后台运行程序：

```bash
touch nohup.out
nohup python main.py & tail -f nohup.out
```

使用 `ps -ef | grep main.py | grep -v grep` 命令可查看运行于后台的进程，如果想要重新启动程序可以先 `kill` 掉对应的进程。日志关闭后如果想要再次打开只需输入 `tail -f nohup.out`。

## 目录结构

描述项目的目录结构。例如：

## one-api部署流程

```bash
sudo docker pull justsong/one-api
sudo docker run --name one-api -d --restart always -p 3000:3000 -e SQL_DSN="root:*#0VzQ36lt@tcp(gz-cynosdbmysql-grp-81wxjcvl.sql.tencentcdb.com:26365)/oneapi" -e TZ=Asia/Shanghai -v /home/ubuntu/data/one-api:/data justsong/one-api
```

## 技术栈

列举项目所使用的主要技术栈。例如：

- 服务端框架：FastAPI
- 数据库ORM：SQLAlchemy
- 数据库：MySQL

## 贡献指南

描述如何向项目做出贡献。例如：

1. Fork 本仓库到你的 GitHub 账号。
2. 创建新的分支并进行开发：`git checkout -b feature/xxx`
3. 提交你的修改：`git commit -am 'Add xxx feature'`
4. 推送分支到远程仓库：`git push origin feature/xxx`
5. 提交 Pull Request，等待审核与合并。

## 版权信息

描述项目的版权信息和许可证。

## 鸣谢

感谢对该项目做出贡献的人员或开源项目的作者。
