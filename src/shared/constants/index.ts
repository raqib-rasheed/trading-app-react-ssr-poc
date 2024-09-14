import { IApplicationState } from "@shared/types";

export const AppName = import.meta.env.VITE_APP_NAME || "TR investoDash";

export const SUBSCRIPTIONS_WS_URL =
  import.meta.env.VITE_SUBSCRIPTIONS_WS_URL || "";

export const WS_MAX_RETRY_COUNT =
  parseInt(import.meta.env.VITE_WS_MAX_RETRY_COUNT, 10) || 5;

export const WS_MAX_RETRY_DELAY =
  parseInt(import.meta.env.VITE_WS_MAX_RETRY_DELAY, 10) || 2000;

export const initialApplicationState: IApplicationState = {
  modalData: {
    show: false,
    title: "",
    description: "",
    type: null,
  },
  notificationData: {
    show: false,
    title: "",
    description: "",
    type: null,
  },
  dataStreamType: "live",
};
