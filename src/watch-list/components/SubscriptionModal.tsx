import { useCallback } from "react";

import Modal from "@components/molecules/modal";
import AddSubscriptionForm from "./AddSubscriptionForm";

import { useApplicationStore } from "@shared/store";
import { WatchListFormTypes } from "@watch-list/WatchList.constants";
import { useWatchListStore } from "@watch-list/Watchlist.store";

import "./SubscriptionModal.scss";
import RemoveSubcriptionConfirmForm from "./RemoveSubcriptionConfirmForm";

export default function SubscriptionModal() {
  const { appState, appDispatch } = useApplicationStore();
  const { watchListState, watchListDispatch } = useWatchListStore();

  const handleModalClose = useCallback(() => {
    watchListDispatch({ type: "RESET_SELECTED_ISIN" });
    appDispatch({ type: "HIDE_MODAL" });
  }, []);

  const renderContent = () => {
    let formElement;
    switch (watchListState.formType) {
      case WatchListFormTypes.ADD:
        formElement = <AddSubscriptionForm />;
        break;
      case WatchListFormTypes.UNSUBSCRIBE:
        formElement = <RemoveSubcriptionConfirmForm />;
        break;

      default:
        break;
    }

    return <main className="SubscriptionModal__content">{formElement}</main>;
  };

  return (
    <aside>
      <Modal isOpen={appState.modalData.show} onClose={handleModalClose}>
        {renderContent()}
      </Modal>
    </aside>
  );
}
