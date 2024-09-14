import {
  createContext,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  IWatchListItem,
  IWatchListState,
  TWatchListAction,
} from "./WatchList.types";
import {
  watchListItem$,
  subscriptions$,
  addSubscription,
  removeSubscription,
} from "./WatchList.service";
import { initialWatchListState } from "./WatchList.constants";
import { watchListStateReducer } from "./WatchList.utils";

// Create context types
interface IWatchListContext {
  watchListState: IWatchListState;
  watchListDispatch: Dispatch<TWatchListAction>;
}

// Create the context
const WatchListContext = createContext<IWatchListContext | undefined>(
  undefined
);

// Create a provider component
export const WatchListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [watchListState, watchListDispatch] = useReducer(
    watchListStateReducer,
    initialWatchListState
  );

  const setWatchList = useCallback((updatedWatchList: IWatchListItem[]) => {
    watchListDispatch({ type: "SET_WATCHLIST", payload: updatedWatchList });
  }, []);

  useEffect(() => {
    const sub = watchListItem$.subscribe(setWatchList);
    const subscriptionsMapSub = subscriptions$.subscribe();
    return () => {
      sub.unsubscribe();
      subscriptionsMapSub.unsubscribe();
    };
  }, [setWatchList]);

  return (
    <WatchListContext.Provider value={{ watchListState, watchListDispatch }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchListStore = (): IWatchListContext => {
  const context = useContext(WatchListContext);
  if (!context) {
    throw new Error(
      "useWatchListContext must be used within a WatchListProvider"
    );
  }
  return context;
};

export { addSubscription, removeSubscription };
