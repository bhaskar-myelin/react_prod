import {
  HARD_REFRESH,
  LOGOUT,
  RESET_RECORDS,
  SET_RECORDS,
  MODIFY_RECORDS,
} from "../actions/type";
import _ from "lodash";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload, subtype } = action;

  switch (type) {
    case SET_RECORDS: {
      let records = {};
      if (subtype) {
        records = {
          [subtype]: {
            ...state[subtype],
            [payload.type]: { ...payload.data },
          },
        };
      } else if (payload.type) {
        records = {
          [payload.type]: {
            ...state[payload.type],
            ...payload.data,
          },
        };
      } else {
        records = { ...records, ...payload.data };
      }
      return {
        ...state,
        ...records,
      };
    }

    case MODIFY_RECORDS: {
      let records = {};
      if (subtype) {
        if (payload.type) {
          records = {
            [subtype]: {
              ...state[subtype],
              [payload.type]: { ...payload.data },
            },
          };
        } else {
          records = {
            [subtype]: {
              ...payload.data,
            },
          };
        }
      } else if (payload.type) {
        records = {
          [payload.type]: {
            ...state[payload.type],
            ...payload.data,
          },
        };
      } else {
        records = { ...records, ...payload.data };
      }
      return {
        ...state,
        ...records,
      };
    }

    case HARD_REFRESH: {
      return {
        hardRefresh: state.hardRefresh >= 0 ? state.hardRefresh++ : 0,
        ...state,
      };
    }

    // case RESET_RECORDS: {
    //     let newState = _.omit(state, payload)
    //     return {
    //         ...newState
    //     }
    // }

    case RESET_RECORDS:
    case LOGOUT: {
      return {};
    }

    default:
      return state;
  }
}
