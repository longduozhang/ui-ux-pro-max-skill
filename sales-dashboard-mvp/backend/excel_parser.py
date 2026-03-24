from pathlib import Path
from typing import BinaryIO

import pandas as pd

EXPECTED_SHEET_NAME = "sales"
EXPECTED_COLUMNS = ["date", "product", "region", "quantity", "revenue"]


class ExcelTemplateError(ValueError):
    pass


def parse_sales_excel(file_obj: BinaryIO | str | Path) -> pd.DataFrame:
    """读取并校验 Excel 模板。

    第一版仅实现基础校验，后续可继续补充数据清洗规则。
    """
    df = pd.read_excel(file_obj, sheet_name=EXPECTED_SHEET_NAME, engine="openpyxl")

    if list(df.columns) != EXPECTED_COLUMNS:
        raise ExcelTemplateError(
            f"表头必须为: {', '.join(EXPECTED_COLUMNS)}"
        )

    return df
