import Button from "@components/atoms/button";
import { useApplicationStore } from "@shared/store";
import { removeSubscription } from "@watch-list/WatchList.service";
import { useWatchListStore } from "@watch-list/Watchlist.store";

import "./RemoveSubcriptionConfirmForm.scss";

export default function RemoveSubcriptionConfirmForm() {
  const { appState, appDispatch } = useApplicationStore();
  const { watchListState, watchListDispatch } = useWatchListStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (watchListState.selectedISIN) {
      removeSubscription(watchListState.selectedISIN);
      watchListDispatch({
        type: "RESET_SELECTED_ISIN",
      });
      appDispatch({
        type: "HIDE_MODAL",
      });
    }
  };

  const handleCancel = () => {
    watchListDispatch({
      type: "RESET_SELECTED_ISIN",
    });
    appDispatch({
      type: "HIDE_MODAL",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="RemoveSubcriptionConfirmForm__container"
    >
      <h3>{appState.modalData.title}</h3>
      <p>{appState.modalData.description}</p>
      <p>{`ISIN: ${watchListState.selectedISIN}`}</p>
      <Button htmlType="submit" variant="danger">
        Unsubscribe
      </Button>
      <Button htmlType="button" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
}
