import WatchListPage from "./WatchList.page";

import WatchListNavObject from "./WatchList.constants";
import { WatchListProvider } from "./Watchlist.store";

const WatchListRouteObject = {
  path: WatchListNavObject.routePath,
  element: (
    <WatchListProvider>
      <WatchListPage />
    </WatchListProvider>
  ),
};

export default WatchListRouteObject;
