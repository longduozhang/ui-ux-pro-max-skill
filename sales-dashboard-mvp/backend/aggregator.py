import pandas as pd

from schemas import AnalyzeResponse, Summary


def build_dashboard_payload(df: pd.DataFrame) -> AnalyzeResponse:
    """把 DataFrame 聚合成看板结构。

    第一版只返回最小可运行占位数据，后续逐步替换为真实统计逻辑。
    """
    # TODO: 后续补充真实聚合逻辑
    return AnalyzeResponse(
        summary=Summary(total_revenue=0, total_quantity=0),
        trend_by_date=[],
        product_ranking=[],
        region_share=[],
        detail_rows=[],
    )
