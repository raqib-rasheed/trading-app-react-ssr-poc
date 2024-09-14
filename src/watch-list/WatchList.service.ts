import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

import {
  ISubscribeMessage,
  ISubscription,
  IUnsubscribeMessage,
  IWatchListItem,
} from "./WatchList.types";
import { WatchListItemState } from "./WatchList.constants";
import { prepareWatchlistItem } from "./WatchList.utils";
import { subscriptionsWebSocket$ } from "@shared/service";

const subscriptionsMap = new Map<string, ISubscription>();
export const subscriptions$ = new BehaviorSubject<Map<string, ISubscription>>(
  subscriptionsMap
);

export const watchListItem$ = new BehaviorSubject<IWatchListItem[]>([]);

subscriptionsWebSocket$
  .pipe(
    tap((message) => {
      const currentSubscriptions = subscriptions$.value;
      let updatedSubscription: ISubscription = { ...message };
      if (currentSubscriptions.has(message.isin)) {
        const prevSubscription = currentSubscriptions.get(message.isin);
        updatedSubscription = {
          ...prevSubscription,
          ...message,
        };
        currentSubscriptions.set(message.isin, updatedSubscription);
      } else {
        updatedSubscription = {
          ...updatedSubscription,
          state: WatchListItemState.Active,
          subscribedAt: new Date().toISOString(),
        };
        currentSubscriptions.set(message.isin, updatedSubscription);
      }

      subscriptions$.next(currentSubscriptions);
    })
  )
  .subscribe();

subscriptions$
  .pipe(
    map((subscriptionsMap) => {
      const watchlistItems: IWatchListItem[] = Array.from(
        subscriptionsMap.values()
      ).map((subscription) => prepareWatchlistItem(subscription));
      watchListItem$.next(watchlistItems);
    })
  )
  .subscribe();

export const addSubscription = (isin: string): void => {
  const subscribeMessage: ISubscribeMessage = { subscribe: isin };
  //@ts-ignore
  subscriptionsWebSocket$.next(subscribeMessage);
};

export const removeSubscription = (isin: string): void => {
  const currentSubscriptions = subscriptions$.value;

  if (currentSubscriptions.has(isin)) {
    const unsubscribeMessage: IUnsubscribeMessage = {
      unsubscribe: isin,
    };
    //@ts-ignore
    subscriptionsWebSocket$.next(unsubscribeMessage);
    currentSubscriptions.delete(isin);
    subscriptions$.next(currentSubscriptions);
  }
};
