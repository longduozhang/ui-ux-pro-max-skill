import type { AnalyzeResponse } from "./types";

const API_BASE = "http://127.0.0.1:8000";

export async function analyzeSales(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/v1/sales/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: "请求失败" }));
    throw new Error(errorBody.detail || "请求失败");
  }

  return response.json() as Promise<AnalyzeResponse>;
}
