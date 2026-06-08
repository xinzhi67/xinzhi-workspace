# xinzhi-workspace

Synapse Studio（灵感枢纽）— 前端 UI 设计稿生成 + 后端智能体编排服务。

## 项目结构

```
xinzhi-workspace/
├── synapse-studio-frontend/   # Next.js 16 + React 19 + Three.js
└── synapse-studio-serve/      # NestJS 11 + TypeORM + MySQL
```

---

## 环境准备

- **Node.js** >= 18
- **MySQL** 8.0（后端需要）
- **npm** >= 9

---

## 快速启动

### 1. 安装依赖

```bash
# 前端
cd synapse-studio-frontend
npm install

# 后端
cd ../synapse-studio-serve
npm install
```

### 2. 配置环境变量

**前端** `synapse-studio-frontend/.env.local`（可选，默认连接本地后端）：
```env
# 后端 API 基址（默认 http://localhost:5000）
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

**后端** `synapse-studio-serve/.env`（从 .env.example 复制）：
```env
PORT=5000
OPENAI_API_KEY=你的密钥

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=你的密码
DB_NAME=synapse_studio
```

### 3. 启动服务

**方式一：一键启动（推荐）**

双击根目录的 `start.bat`，自动打开两个终端分别启动前后端。

**方式二：手动启动**

```bash
# 后端（先启动，端口 5000）
cd synapse-studio-serve
npm run start:dev

# 前端（新终端，端口 3000）
cd synapse-studio-frontend
npm run dev
```

### 4. 访问

- 前端工作台：http://localhost:3000
- 后端 API：http://localhost:5000/api/v1

---

## 前后端联动

前端通过 `next.config.ts` 中的 `rewrites` 将 `/api-proxy/*` 代理到后端 `localhost:5000`，开发时无跨域问题。

新增接口的流程：
1. 前端在 `src/lib/api/endpoints.ts` 的 `api` 对象中加一行
2. 后端在对应 NestJS module 中新增 controller 方法

---

## 页面功能

| 路由 | 功能 |
|------|------|
| `/` | 工作台 Hub |
| `/design` | UI 设计稿生成（AI 流式生成 + Canvas 预览）|
| `/personal` | 个人空间（本地存储）|
| `/play` | Three.js 3D 场景演示 |
| `/library` | UI 组件库 |
| `/test` | 后端 API 测试面板 |

## 后端 API

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/test/hello` | 连通性测试 |
| `GET` | `/api/v1/test/db` | 数据库连接检查 |
| `POST` | `/api/v1/design/generate` | 生成设计稿 |
| `POST` | `/api/v1/intent/recognize` | 识别用户意图 |

## 技术栈

**前端：** Next.js 16, React 19, TypeScript, Three.js, @react-three/fiber, GSAP, Zod

**后端：** NestJS 11, TypeORM, MySQL2, class-validator, RxJS
