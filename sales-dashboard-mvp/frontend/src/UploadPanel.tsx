import type { ChangeEvent } from "react";

type UploadPanelProps = {
  loading: boolean;
  onUpload: (file: File) => Promise<void>;
};

export default function UploadPanel({ loading, onUpload }: UploadPanelProps) {
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await onUpload(file);
    event.target.value = "";
  };

  return (
    <section className="card">
      <h2>上传 Excel</h2>
      <p>请上传固定模板（sheet: sales，表头: date/product/region/quantity/revenue）</p>
      <input type="file" accept=".xlsx" onChange={handleChange} disabled={loading} />
    </section>
  );
}
