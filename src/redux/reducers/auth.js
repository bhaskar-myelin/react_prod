import { LOGOUT, SET_AUTH_SESSION } from "./../actions/type";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH_SESSION: {
      return {
        toggleDrawer: true,
        ...payload,
      };
    }

    case "DRAWER": {
      return {
        ...state,
        ...payload,
      };
    }

    case LOGOUT: {
      return {};
    }

    default:
      return state;
  }
}
