import "./SecurityCard.scss";

interface ISecurityCardProps {
  isin: string;
  price: number;
  bid: number;
  ask: number;
  onUnsubscribe: (isin: string) => void;
}

export default function SecurityCard(props: ISecurityCardProps) {
  const { isin, ask, bid, price, onUnsubscribe } = props;
  return (
    <article key={isin} className="stock-item">
      <p>{isin}</p>
      <p>Price: {price.toFixed(4)}</p>
      <p>Bid: {bid.toFixed(4)}</p>
      <p>Ask: {ask.toFixed(4)}</p>
      <button
        onClick={() => {
          onUnsubscribe(isin);
        }}
      >
        Unsubscribe
      </button>
    </article>
  );
}
