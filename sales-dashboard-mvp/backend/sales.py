from fastapi import APIRouter, File, HTTPException, UploadFile

from aggregator import build_dashboard_payload
from excel_parser import ExcelTemplateError, parse_sales_excel
from schemas import AnalyzeResponse

router = APIRouter(prefix="/api/v1/sales", tags=["sales"])


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_sales_excel(file: UploadFile = File(...)) -> AnalyzeResponse:
    if not file.filename or not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="仅支持 .xlsx 文件")

    try:
        dataframe = parse_sales_excel(file.file)
        return build_dashboard_payload(dataframe)
    except ExcelTemplateError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="解析失败，请检查文件格式") from exc
