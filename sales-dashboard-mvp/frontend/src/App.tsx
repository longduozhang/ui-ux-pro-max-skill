import { useState } from "react";
import { analyzeSales } from "./api";
import DetailTable from "./DetailTable";
import MetricCards from "./MetricCards";
import ProductRankChart from "./ProductRankChart";
import RegionShareChart from "./RegionShareChart";
import SalesTrendChart from "./SalesTrendChart";
import type { AnalyzeResponse } from "./types";
import UploadPanel from "./UploadPanel";

const EMPTY_DATA: AnalyzeResponse = {
  summary: { total_revenue: 0, total_quantity: 0 },
  trend_by_date: [],
  product_ranking: [],
  region_share: [],
  detail_rows: [],
};

export default function App() {
  const [data, setData] = useState<AnalyzeResponse>(EMPTY_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError("");
    try {
      const result = await analyzeSales(file);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "上传失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>销售看板 MVP（第一版骨架）</h1>
      <UploadPanel loading={loading} onUpload={handleUpload} />

      {error && <p className="error">错误：{error}</p>}

      <MetricCards
        totalRevenue={data.summary.total_revenue}
        totalQuantity={data.summary.total_quantity}
      />

      <SalesTrendChart />
      <ProductRankChart />
      <RegionShareChart />
      <DetailTable rows={data.detail_rows} />
    </main>
  );
}
