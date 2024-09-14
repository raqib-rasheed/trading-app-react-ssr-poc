import {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { subscriptionsWebSocket$ } from "@shared/service";
import { applicationStateReducer } from "@shared/utils";
import { initialApplicationState } from "@shared/constants";
import { IApplicationState, TApplicationAction } from "@shared/types";

interface IApplicationContext {
  appState: IApplicationState;
  appDispatch: Dispatch<TApplicationAction>;
}

const ApplicationContext = createContext<IApplicationContext | undefined>(
  undefined
);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, appDispatch] = useReducer(
    applicationStateReducer,
    initialApplicationState
  );

  const setDataStreamLive = useCallback(() => {
    if (appState.dataStreamType !== "live") {
      appDispatch({ type: "SET_DATA_STREAM_TYPE", payload: "live" });
    }
  }, [appState.dataStreamType]);

  const setDataStreamStale = useCallback(() => {
    appDispatch({ type: "SET_DATA_STREAM_TYPE", payload: "stale" });
  }, []);

  const setDataStreamError = useCallback(() => {
    appDispatch({ type: "SET_DATA_STREAM_TYPE", payload: "error" });
  }, []);

  useEffect(() => {
    const wsConnectionSub = subscriptionsWebSocket$.subscribe({
      error: setDataStreamError,
      complete: setDataStreamStale,
      next: setDataStreamLive,
    });

    return () => {
      wsConnectionSub.unsubscribe();
    };
  }, []);

  return (
    <ApplicationContext.Provider value={{ appState, appDispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationStore = (): IApplicationContext => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationProvider"
    );
  }
  return context;
};
