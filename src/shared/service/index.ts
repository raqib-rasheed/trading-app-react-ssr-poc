import { webSocket } from "rxjs/webSocket";
import { retry } from "rxjs/operators";

import {
  SUBSCRIPTIONS_WS_URL,
  WS_MAX_RETRY_COUNT,
  WS_MAX_RETRY_DELAY,
} from "@shared/constants";

import { ISecurity } from "@watch-list/WatchList.types";

if (!SUBSCRIPTIONS_WS_URL) {
  throw new Error("SUBSCRIPTIONS_WS_URL is not defined properly");
}

export const subscriptionsWebSocket$ =
  webSocket<ISecurity>(SUBSCRIPTIONS_WS_URL);

subscriptionsWebSocket$.pipe(
  retry({ count: WS_MAX_RETRY_COUNT, delay: WS_MAX_RETRY_DELAY })
);
