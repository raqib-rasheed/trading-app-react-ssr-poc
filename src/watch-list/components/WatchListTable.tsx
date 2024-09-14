import { useMemo } from "react";
import Button from "@components/atoms/button";
import Table, { type IColumn } from "@components/organisms/table";
import { useApplicationStore } from "@shared/store";
import { WatchListFormTypes } from "@watch-list/WatchList.constants";
import { useWatchListStore } from "@watch-list/Watchlist.store";
import { IWatchListItem } from "@watch-list/WatchList.types";

export default function WatchListVirtualized() {
  const { watchListState, watchListDispatch } = useWatchListStore();
  const { appDispatch } = useApplicationStore();

  const watchListColumns = useMemo(() => {
    const columns: IColumn<IWatchListItem>[] = [
      { key: "isin", label: "ISIN" },
      { key: "stringifiedPrice", label: "Price" },
      { key: "stringifiedBid", label: "Bid" },
      { key: "stringifiedAsk", label: "Ask" },
      { key: "midpointPrice", label: "Midpoint" },
      { key: "spreadPercentage", label: "Spread%" },
      {
        key: "actions",
        cellRenderer: ({ isin }) => {
          return (
            <Button
              variant="danger"
              size="small"
              onClick={() => {
                watchListDispatch({ type: "SET_SELECTED_ISIN", payload: isin });
                watchListDispatch({
                  type: "SET_FORM_TYPE",
                  payload: WatchListFormTypes.UNSUBSCRIBE,
                });
                appDispatch({
                  type: "SHOW_MODAL",
                  payload: {
                    title: "Unsubscribe ISIN",
                    description:
                      "Please confirm unsubscribing of ISIN from watch list",
                    type: "warning",
                  },
                });
              }}
            >
              remove
            </Button>
          );
        },
        label: "Actions",
      },
    ];
    return columns;
  }, []);

  return (
    <main>
      {watchListState.watchlist.length > 0 ? (
        <Table<IWatchListItem>
          columns={watchListColumns}
          data={watchListState.watchlist}
        />
      ) : (
        <aside>
          <p>
            No ISIN being watched. Please add ISIN(s) to to watch list using the
            button above.
          </p>
        </aside>
      )}
    </main>
  );
}
