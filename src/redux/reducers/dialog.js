import { LOGOUT, RESET_DIALOG, SET_DIALOG } from "../actions/type";

const initialState = {
  show: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DIALOG: {
      return {
        ...payload,
      };
    }

    case LOGOUT:
    case RESET_DIALOG: {
      return {
        show: false,
      };
    }

    default:
      return state;
  }
}
