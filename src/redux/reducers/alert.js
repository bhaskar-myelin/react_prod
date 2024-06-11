import { SHOW_ALERT, HIDE_ALERT } from "./../actions/type";

const initialState = {
  show: false,
  message: "",
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        show: true,
        message: action.message,
        variant: action.variant || "default",
      };

    case HIDE_ALERT:
      return {
        ...state,
        show: false,
        message: "",
      };

    default:
      return state;
  }
}
