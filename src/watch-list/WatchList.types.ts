import { WatchListFormTypes, WatchListItemState } from "./WatchList.constants";

export interface ISecurity {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

export interface ISubscription extends ISecurity {
  subscribedAt?: string;
  state?: WatchListItemState;
  alias?: string;
}

export interface IWatchListItem extends ISubscription {
  lastUpdated: string;
  isHighlighted: boolean;
  spread: string;
  spreadPercentage?: string;
  midpointPrice: string;
  stringifiedPrice: string;
  stringifiedBid: string;
  stringifiedAsk: string;
}

export interface ISubscribeMessage {
  subscribe: ISecurity["isin"];
}

export interface IUnsubscribeMessage {
  unsubscribe: ISecurity["isin"];
}

export interface ISubscriptionWebSocketResponse {
  data: ISecurity;
}

export interface IWatchlistItem {
  isin: string;
  alias: string;
  price: number;
  bid: number;
  ask: number;
  midpointPrice?: number;
  spread?: number;
  spreadPercentage?: number;
  subscribedAt: Date;
  lastUpdated: Date;
  isActive: boolean;
  isHighlighted: boolean;
}

export type TWatchListAction =
  | { type: "SET_WATCHLIST"; payload: IWatchListItem[] }
  | { type: "SET_SELECTED_ISIN"; payload: IWatchListItem["isin"] }
  | { type: "RESET_SELECTED_ISIN" }
  | { type: "SET_FORM_TYPE"; payload: WatchListFormTypes };

export interface IWatchListState {
  watchlist: IWatchListItem[];
  selectedISIN: IWatchListItem["isin"] | null;
  formType: WatchListFormTypes | null;
}
