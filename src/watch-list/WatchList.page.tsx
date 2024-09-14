import WatchListPageHeader from "./components/WatchListPageHeader";
import WatchListVirtualized from "./components/WatchListTable";
import SubscriptionModal from "./components/SubscriptionModal";
import SubscriptionNotification from "./components/SubscriptionNotification";

import "./WatchList.scss";

export default function HomePage() {
  return (
    <section className="WatchList__container">
      <WatchListPageHeader />
      <WatchListVirtualized />
      <SubscriptionModal />
      <SubscriptionNotification />
    </section>
  );
}
