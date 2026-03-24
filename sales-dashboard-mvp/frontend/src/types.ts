export type TrendItem = {
  date: string;
  revenue: number;
};

export type ProductRankingItem = {
  product: string;
  revenue: number;
};

export type RegionShareItem = {
  region: string;
  revenue: number;
  ratio: number;
};

export type DetailRow = {
  date: string;
  product: string;
  region: string;
  quantity: number;
  revenue: number;
};

export type AnalyzeResponse = {
  summary: {
    total_revenue: number;
    total_quantity: number;
  };
  trend_by_date: TrendItem[];
  product_ranking: ProductRankingItem[];
  region_share: RegionShareItem[];
  detail_rows: DetailRow[];
};
