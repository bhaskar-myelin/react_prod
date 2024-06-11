import { LOADING, LOADED } from "./../actions/type";

function Loader(state = false, action) {
  const { type } = action;

  switch (type) {
    case LOADING:
      return true;

    case LOADED:
      return false;

    default:
      return false;
  }
}

export default Loader;
