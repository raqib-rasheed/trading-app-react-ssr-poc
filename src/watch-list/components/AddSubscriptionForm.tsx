import { useState } from "react";

import Button from "@components/atoms/button";
import InputText from "@components/atoms/input-text";
import { useApplicationStore } from "@shared/store";
import {
  useWatchListStore,
  addSubscription,
} from "@watch-list/Watchlist.store";
import { validateISIN } from "@watch-list/WatchList.utils";

import "./AddSubscriptionForm.scss";

export default function AddSubscriptionForm() {
  const [error, setError] = useState<string>("");
  const { appState, appDispatch } = useApplicationStore();
  const { watchListState, watchListDispatch } = useWatchListStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateISIN(
      watchListState.selectedISIN,
      watchListState.watchlist
    );
    if (watchListState.selectedISIN && !error) {
      addSubscription(watchListState.selectedISIN);
      watchListDispatch({
        type: "RESET_SELECTED_ISIN",
      });
      appDispatch({
        type: "HIDE_MODAL",
      });
    } else if (error) {
      setError(error);
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
    <form onSubmit={handleSubmit} className="AddSubscriptionForm__container">
      <h3>{appState.modalData.title}</h3>
      <p>{appState.modalData.description}</p>
      <InputText
        error={error}
        name={"isin"}
        onChange={(value) => {
          watchListDispatch({
            type: "SET_SELECTED_ISIN",
            payload: value.toUpperCase(),
          });
        }}
        placeholder="Enter ISIN"
        aria-label="ISIN input"
        label="ISIN"
        value={watchListState.selectedISIN || ""}
      />
      <p className="AddSubscriptionForm__error">{error ?? " "}</p>
      <Button htmlType="submit" variant="primary">
        Subscribe
      </Button>
      <Button htmlType="reset" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
}
