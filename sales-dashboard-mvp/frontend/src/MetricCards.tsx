type MetricCardsProps = {
  totalRevenue: number;
  totalQuantity: number;
};

export default function MetricCards({ totalRevenue, totalQuantity }: MetricCardsProps) {
  return (
    <section className="metrics">
      <div className="card">
        <h3>总销售额</h3>
        <p>{totalRevenue.toLocaleString()}</p>
      </div>
      <div className="card">
        <h3>总销量</h3>
        <p>{totalQuantity.toLocaleString()}</p>
      </div>
    </section>
  );
}
