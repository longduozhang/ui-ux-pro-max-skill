# 销售数据可视化看板（Excel 固定模板）MVP 架构设计

## 1. 项目目录结构（前后端分离）

```text
sales-dashboard-mvp/
├── backend/                            # FastAPI 后端
│   ├── app/
│   │   ├── main.py                     # FastAPI 入口，注册路由与中间件
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       └── sales.py            # 上传与分析接口
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py               # 配置（环境变量、跨域等）
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── request.py              # 请求模型（如上传参数）
│   │   │   └── response.py             # 返回模型（指标、趋势、排行、明细）
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── excel_parser.py         # Excel 模板校验与解析
│   │   │   └── sales_aggregator.py     # 统计聚合逻辑
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── validators.py           # 通用校验工具
│   │   │   └── errors.py               # 自定义异常与错误码
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── test_excel_parser.py
│   │       └── test_sales_api.py
│   ├── requirements.txt                # Python 依赖
│   ├── .env.example                    # 环境变量示例
│   └── README.md                       # 后端本地启动说明
│
├── frontend/                           # React 前端
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.tsx                    # React 入口（推荐 Vite）
│   │   ├── App.tsx                     # 页面骨架
│   │   ├── api/
│   │   │   └── sales.ts                # 请求后端接口
│   │   ├── components/
│   │   │   ├── upload/
│   │   │   │   └── UploadPanel.tsx     # 上传区域
│   │   │   ├── metrics/
│   │   │   │   └── MetricCards.tsx     # 指标卡片
│   │   │   ├── charts/
│   │   │   │   ├── SalesTrendChart.tsx # 销售趋势图
│   │   │   │   ├── ProductRankChart.tsx# 产品排行图
│   │   │   │   └── RegionShareChart.tsx# 区域占比图
│   │   │   └── table/
│   │   │       └── DetailTable.tsx     # 明细表格
│   │   ├── pages/
│   │   │   └── DashboardPage.tsx       # 单页 MVP 主页面
│   │   ├── types/
│   │   │   └── sales.ts                # TS 类型（与后端响应对应）
│   │   ├── hooks/
│   │   │   └── useSalesDashboard.ts    # 状态管理与请求编排
│   │   ├── constants/
│   │   │   └── columns.ts              # 表格列定义
│   │   └── styles/
│   │       └── index.css               # 全局样式
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md                       # 前端本地启动说明
│
├── sample-data/
│   ├── sales_template.xlsx             # 给用户下载/测试的标准模板
│   └── sales_demo.xlsx                 # 演示数据
│
├── docs/
│   ├── api-contract.md                 # 前后端接口契约
│   ├── data-spec.md                    # Excel 模板字段定义
│   └── mvp-scope.md                    # MVP 范围与非目标
│
├── .gitignore
├── README.md                           # 项目总说明（一键运行）
└── Makefile                            # 可选：统一启动命令
```

---

## 2. 每个目录和文件的作用

### backend/
- 负责文件接收、模板校验、数据聚合、结果返回。
- **重点分层**：
  - `api/`：仅处理 HTTP 输入输出，不放复杂业务。
  - `services/`：核心逻辑层（解析 + 计算），便于单测。
  - `schemas/`：响应结构强约束，避免前后端字段漂移。

### frontend/
- 负责上传交互、可视化展示、错误提示。
- **重点分层**：
  - `api/`：封装 axios/fetch，避免请求散落在组件里。
  - `components/`：展示组件拆分，保持复用。
  - `hooks/`：组合上传、加载、错误、数据映射等状态。
  - `types/`：与后端返回字段一一对应，减少类型错误。

### sample-data/
- 提供标准 Excel 模板，减少用户上传格式错误。
- 提供 demo 文件，便于联调和演示。

### docs/
- 固化接口契约和数据规范，后续改动先改文档再改代码。

---

## 3. 技术方案（MVP 可落地）

## 3.1 后端技术选型（FastAPI）
- 框架：`FastAPI`
- 解析：`pandas + openpyxl`
- 校验：自定义校验函数 + Pydantic 响应模型
- 运行：`uvicorn`

### Excel 模板校验规则（固定模板）
1. 文件类型必须是 `.xlsx`。
2. 必须只有一个目标 sheet，且名称必须为 `sales`。
3. 表头必须完全匹配并按顺序：
   - `date`, `product`, `region`, `quantity`, `revenue`
4. 字段类型建议：
   - `date`：可解析为日期
   - `product` / `region`：字符串非空
   - `quantity`：整数或可转整数
   - `revenue`：数值

### 聚合输出（一个接口返回全部看板数据）
建议单接口：`POST /api/v1/sales/analyze`

返回结构示意：
- `summary`
  - `total_revenue`
  - `total_quantity`
- `trend_by_date`（按日期聚合）
- `product_ranking`（按销售额降序）
- `region_share`（按销售额占比）
- `detail_rows`（清洗后的明细）

> MVP 阶段用内存计算，不落库。

## 3.2 前端技术选型（React）
- 构建：`Vite + React + TypeScript`
- UI：可用 `Ant Design`（快速）或 `MUI`
- 图表：`ECharts`（`echarts-for-react`）或 `Recharts`
- 表格：先用 UI 库表格组件，MVP 不做复杂筛选。

### 页面模块
1. 上传区域：拖拽/点击上传 + 模板下载提示。
2. 指标卡片：总销售额、总销量。
3. 趋势图：按日期销售额折线或柱线组合。
4. 产品排行：按销售额横向条形图。
5. 区域占比：饼图/环图。
6. 明细表格：原始或标准化后的数据。

---

## 4. 前后端交互流程

1. 用户进入前端页面，看到上传区与模板说明。
2. 用户上传 Excel（`multipart/form-data`）。
3. 前端调用 `POST /api/v1/sales/analyze`。
4. 后端执行：
   - 文件存在性/扩展名检查
   - sheet 名校验（`sales`）
   - 表头校验（5 列固定）
   - 数据清洗（日期转换、空值处理、类型转换）
   - 聚合统计（总额、总量、趋势、排行、占比）
5. 后端返回统一 JSON。
6. 前端一次性将数据喂给：
   - MetricCards
   - SalesTrendChart
   - ProductRankChart
   - RegionShareChart
   - DetailTable
7. 任何校验失败时，后端返回明确错误信息（如“sheet 必须为 sales”）；前端 toast 提示并保留当前页面状态。

---

## 5. 建议开发顺序（先做哪一部分）

推荐顺序：**先后端契约，再前端展示**。

### 第 1 步：先定数据契约（最高优先级）
- 先写 `docs/api-contract.md` 和 `docs/data-spec.md`。
- 明确请求、响应、错误码，避免前后端反复改字段。

### 第 2 步：实现后端最小闭环
- 先把 `POST /api/v1/sales/analyze` 跑通。
- 先不追求性能，优先保证“错误提示明确 + 聚合结果正确”。
- 同时补 2 类测试：
  - 正常模板文件
  - 常见错误模板（sheet 错、表头错、空文件）

### 第 3 步：前端搭页面骨架
- 先静态搭出上传区、卡片、图表、表格占位。
- 再接真实接口。

### 第 4 步：联调与体验优化
- 加 loading、失败提示、空态。
- 增加模板下载入口与示例文件说明。

### 第 5 步：MVP 收口
- 补 README 一键启动说明（前后端各自命令）。
- 固化“已支持/未支持”范围，避免需求蔓延。

---

## 6. MVP 范围边界（你这版暂不做）

- 不做登录/权限
- 不做数据库持久化
- 不做多用户并发隔离
- 不做云部署
- 不做复杂筛选、导出、打印

这样能确保你在最短时间内拿到可演示版本。
