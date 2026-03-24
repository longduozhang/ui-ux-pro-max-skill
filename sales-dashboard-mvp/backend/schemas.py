from datetime import date
from pydantic import BaseModel, Field


class TrendItem(BaseModel):
    date: date
    revenue: float


class ProductRankingItem(BaseModel):
    product: str
    revenue: float


class RegionShareItem(BaseModel):
    region: str
    revenue: float
    ratio: float = Field(description="0~1 区间占比")


class DetailRow(BaseModel):
    date: date
    product: str
    region: str
    quantity: int
    revenue: float


class Summary(BaseModel):
    total_revenue: float
    total_quantity: int


class AnalyzeResponse(BaseModel):
    summary: Summary
    trend_by_date: list[TrendItem]
    product_ranking: list[ProductRankingItem]
    region_share: list[RegionShareItem]
    detail_rows: list[DetailRow]


class ErrorResponse(BaseModel):
    detail: str
