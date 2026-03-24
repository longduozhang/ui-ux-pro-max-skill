# Sales Dashboard MVP（最小可运行骨架）

## 目录树

```text
sales-dashboard-mvp/
├── backend/
│   ├── main.py
│   ├── sales.py
│   ├── excel_parser.py
│   ├── aggregator.py
│   ├── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── api.ts
│       ├── types.ts
│       ├── UploadPanel.tsx
│       ├── MetricCards.tsx
│       ├── SalesTrendChart.tsx
│       ├── ProductRankChart.tsx
│       ├── RegionShareChart.tsx
│       ├── DetailTable.tsx
│       └── index.css
└── README.md
```

## 本地启动

### 1) 启动后端

```bash
cd sales-dashboard-mvp/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

接口：`POST http://127.0.0.1:8000/api/v1/sales/analyze`

### 2) 启动前端

```bash
cd sales-dashboard-mvp/frontend
npm install
npm run dev
```

页面：`http://127.0.0.1:5173`

## 当前状态（第一版）

- ✅ 前后端都可独立启动
- ✅ 前端可显示上传区、指标卡片和看板占位组件
- ✅ 后端包含 `/api/v1/sales/analyze` 路由骨架
- ⏳ 聚合逻辑与图表渲染后续逐步完善
