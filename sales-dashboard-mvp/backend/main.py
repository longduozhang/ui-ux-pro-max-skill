from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sales import router as sales_router

app = FastAPI(title="Sales Dashboard MVP API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(sales_router)
