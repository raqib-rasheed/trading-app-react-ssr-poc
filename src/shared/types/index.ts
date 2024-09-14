export interface ILinkAriaProps {
  "aria-label": string;
  "aria-current": boolean | "page";
}

export type TModalType = "info" | "warning" | "error" | "success";
export type TNotificationType = "info" | "success" | "error";
export type TDataStreamType = "live" | "stale" | "retrying" | "error";

export interface IModalData {
  show: boolean;
  title: string;
  description: string;
  type: TModalType | null;
}

export interface INotificationData {
  show: boolean;
  title: string;
  description: string;
  type: TNotificationType | null;
}

export type TApplicationAction =
  | {
      type: "SHOW_MODAL";
      payload: { title: string; description: string; type: TModalType };
    }
  | { type: "HIDE_MODAL" }
  | {
      type: "SHOW_NOTIFICATION";
      payload: { title: string; description: string; type: TNotificationType };
    }
  | { type: "HIDE_NOTIFICATION" }
  | { type: "SET_DATA_STREAM_TYPE"; payload: TDataStreamType };

export interface IApplicationState {
  modalData: IModalData;
  notificationData: INotificationData;
  dataStreamType: TDataStreamType;
}
