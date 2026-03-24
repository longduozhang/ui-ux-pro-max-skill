import type { DetailRow } from "./types";

type DetailTableProps = {
  rows: DetailRow[];
};

export default function DetailTable({ rows }: DetailTableProps) {
  return (
    <section className="card">
      <h3>明细表格</h3>
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>product</th>
            <th>region</th>
            <th>quantity</th>
            <th>revenue</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5}>暂无数据</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={`${row.date}-${row.product}-${index}`}>
                <td>{row.date}</td>
                <td>{row.product}</td>
                <td>{row.region}</td>
                <td>{row.quantity}</td>
                <td>{row.revenue}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
