import { create, all } from "mathjs";
import {
  ISubscription,
  IWatchListItem,
  IWatchListState,
  TWatchListAction,
} from "./WatchList.types";

const math = create(all);

export const prepareWatchlistItem = (
  subscription: ISubscription
): IWatchListItem => {
  const midpointPrice = math.mean(subscription.bid, subscription.ask);
  const spread = math.subtract(subscription.ask, subscription.bid);
  const spreadPercentage = math.multiply(
    math.divide(spread, subscription.bid),
    100
  );

  return {
    ...subscription,
    lastUpdated: new Date().toISOString(),
    isHighlighted: false,
    midpointPrice: math.number(midpointPrice).toFixed(4),
    spread: math.number(spread).toPrecision(4),
    spreadPercentage: math.number(spreadPercentage).toFixed(4),
    stringifiedAsk: subscription.ask.toFixed(4),
    stringifiedPrice: subscription.price.toFixed(4),
    stringifiedBid: subscription.bid.toFixed(4),
  };
};

export const watchListStateReducer = (
  state: IWatchListState,
  action: TWatchListAction
): IWatchListState => {
  switch (action.type) {
    case "SET_WATCHLIST":
      return { ...state, watchlist: action.payload };

    case "SET_SELECTED_ISIN":
      return {
        ...state,
        selectedISIN: action.payload,
      };

    case "RESET_SELECTED_ISIN":
      return {
        ...state,
        selectedISIN: null,
      };

    case "SET_FORM_TYPE":
      return {
        ...state,
        formType: action.payload,
      };

    default:
      return state;
  }
};

export const validateISIN = (
  isin: string | null,
  subscribedISINs: IWatchListItem[] = []
): string | null => {
  const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}\d$/;

  if (!isin) {
    return "Empty ISIN.";
  }
  if (!isinRegex.test(isin.toUpperCase())) {
    return "Invalid ISIN format. Must be 12 characters, start with two letters, and end with a digit.";
  }

  if (
    subscribedISINs.some(
      (watched) => isin.toUpperCase() === watched.isin.toUpperCase()
    )
  ) {
    return "ISIN already subscribed.";
  }

  return null;
};
