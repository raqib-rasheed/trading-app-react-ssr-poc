import { IApplicationState, TApplicationAction } from "@shared/types";

export const applicationStateReducer = (
  state: IApplicationState,
  action: TApplicationAction
): IApplicationState => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modalData: {
          show: true,
          title: action.payload.title,
          description: action.payload.description,
          type: action.payload.type,
        },
      };

    case "HIDE_MODAL":
      return {
        ...state,
        modalData: {
          show: false,
          title: "",
          description: "",
          type: null,
        },
      };

    case "SHOW_NOTIFICATION":
      return {
        ...state,
        notificationData: {
          show: true,
          title: action.payload.title,
          description: action.payload.description,
          type: action.payload.type,
        },
      };

    case "HIDE_NOTIFICATION":
      return {
        ...state,
        notificationData: {
          show: false,
          title: "",
          description: "",
          type: null,
        },
      };

    case "SET_DATA_STREAM_TYPE":
      return { ...state, dataStreamType: action.payload };

    default:
      return state;
  }
};
