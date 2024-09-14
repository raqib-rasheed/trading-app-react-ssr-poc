interface Stock {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

interface WatchlistProps {
  stocks: Stock[];
  onUnsubscribe: (isin: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({
  stocks = [],
  onUnsubscribe,
}) => {
  return (
    <div className="watchlist">
      {stocks.map((stock) => (
        <article key={stock.isin} className="stock-item">
          <p>{stock.isin}</p>
          <p>Price: {stock.price.toFixed(2)}</p>
          <p>Bid: {stock.bid.toFixed(2)}</p>
          <p>Ask: {stock.ask.toFixed(2)}</p>
          <button
            onClick={() => {
              onUnsubscribe(stock.isin);
            }}
          >
            Unsubscribe
          </button>
        </article>
      ))}
    </div>
  );
};

export default Watchlist;
