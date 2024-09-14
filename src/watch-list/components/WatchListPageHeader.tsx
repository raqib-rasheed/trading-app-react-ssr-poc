import { useCallback, useMemo } from "react";

import Button from "@components/atoms/button/Button";

import { AppName } from "@shared/constants";
import { useApplicationStore } from "@shared/store";
import { TDataStreamType } from "@shared/types";
import { WatchListFormTypes } from "@watch-list/WatchList.constants";
import { useWatchListStore } from "@watch-list/Watchlist.store";
import Tag, { type ITagProps } from "@components/atoms/tag";

import "./WatchListPageHeader.scss";

export default function WatchListPageHeader() {
  const { appState, appDispatch } = useApplicationStore();
  const { watchListState, watchListDispatch } = useWatchListStore();

  const onAddISINInit = useCallback(() => {
    watchListDispatch({
      type: "SET_FORM_TYPE",
      payload: WatchListFormTypes.ADD,
    });
    appDispatch({
      type: "SHOW_MODAL",
      payload: {
        title: "Add ISIN",
        description: "Please add ISIN to watch list",
        type: "info",
      },
    });
  }, []);

  const dataStatusTagVariant = useMemo(() => {
    const map: Record<TDataStreamType, ITagProps["variant"]> = {
      error: "error",
      live: "success",
      retrying: "error",
      stale: "warn",
    };
    return map[appState.dataStreamType];
  }, [appState.dataStreamType]);

  return (
    <header className="WatchListPageHeader__container">
      <h1 className="WatchListPageHeader__title">Watch List</h1>
      <aside className="WatchListPageHeader__status">
        <div>
          <p>{`Currently watching ${watchListState.watchlist.length} item(s).`}</p>
        </div>
        <p className="WatchListPageHeader__status__label">Data Status :</p>
        <Tag variant={dataStatusTagVariant}>
          {appState.dataStreamType.toUpperCase()}
        </Tag>
      </aside>
      <main className="WatchListPageHeader__actions">
        <Button variant="primary" onClick={onAddISINInit}>
          ADD ISIN TO WATCH LIST
        </Button>
      </main>
    </header>
  );
}
