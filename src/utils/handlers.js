import moment from "moment";
import querystring from "query-string";
import { CONSTANTS } from "./constants";
import { ACTION_LIST } from "./dataset";
import _ from "lodash";

export function handleInputChange(e, cb) {
  const target = e.target;
  let value = target.value;
  const name = target.name;

  if (e.target.files) {
    let { files } = e.target;
    value = {
      blob: "",
      binary: "",
      url: "",
    };
    value.blob = window.URL.createObjectURL(files[0]);
    value.binary = files[0];
    value.info = files[0] ? files[0].name : "";
  }

  let payload = {
    name,
    value,
    type: e.target.type,
  };
  if (e.target.type === "checkbox") {
    payload.checked = e.target.checked;
  }

  cb(payload);
}

export class GlobalHandlers {
  capitalize(string) {
    if (string === undefined || string === null) {
      return;
    }
    string = string.charAt(0).toUpperCase() + string.slice(1);
    string = string.replace(/_/g, " ");
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  normalise = (string) => {
    if (string === undefined || string === null) {
      return;
    }
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join("_");
  };

  hypenize(string) {
    if (string === undefined || string === null) {
      return;
    }
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join("-");
  }

  sanitizeNumber(value) {
    if (isNaN(value)) {
      return -1;
    }
    return value * 1;
  }
}

export const queryParamsToObject = (data) => {
  return querystring.parse(data);
};

export const queryParamsToString = (data) => {
  return querystring.stringify(data);
};

export const convertOptions = (params) => {
  let a = Object.values(params).join("-");
  let b = Object.keys(params).join("-");
  return `${a}-${b}`;
};

export const convertNormalOptions = (params) => {
  let a = Object.values(params).join("-");
  return `${a}`;
};

export const customStartWith = (value, startIndex) => {
  if (!value) return false;
  return (value + "").startsWith(startIndex + "");
};

export const payloadBuilder = (type, subtype, options = {}) => {
  let payload = {};
  switch (type) {
    case CONSTANTS.childRoutes.afterEffect:
    case CONSTANTS.analyticRoutes.afterEffectAnalysis: {
      if (subtype === ACTION_LIST.EDIT) {
        let currentSheet = _.find(
          options.data.sheetData ? options.data.sheetData.rows : [],
          { id: options.data.freshOptions.sheet }
        );
        payload["value"] =
          currentSheet && currentSheet.config ? currentSheet.config.value : "";
      }
      break;
    }
    case CONSTANTS.childRoutes.crossoverAnalysis:
    case CONSTANTS.analyticRoutes.masterCrossoverData: {
      if (subtype === ACTION_LIST.EDIT) {
        let currentSheet = _.find(
          options.data.sheetData ? options.data.sheetData.rows : [],
          { id: options.data.freshOptions.sheet }
        );
        payload["value1"] =
          currentSheet && currentSheet.config ? currentSheet.config.value1 : "";
        payload["value2"] =
          currentSheet && currentSheet.config ? currentSheet.config.value2 : "";
      }
      break;
    }
    case CONSTANTS.analyticRoutes.crossoverSuccessRatio: {
      if (subtype === ACTION_LIST.EDIT) {
        let currentSheet = _.find(
          options.data.sheetData ? options.data.sheetData.rows : [],
          { id: options.data.freshOptions.sheet }
        );
        payload["value1"] =
          currentSheet && currentSheet.config ? currentSheet.config.value1 : "";
        payload["value2"] =
          currentSheet && currentSheet.config ? currentSheet.config.value2 : "";
        payload["above"] =
          currentSheet && currentSheet.config
            ? currentSheet.config.above || 15
            : "";
      }
      break;
    }
    case CONSTANTS.analyticRoutes.allTimeHigh: {
      if (subtype === ACTION_LIST.EDIT) {
        let currentSheet = _.find(
          options.data.sheetData ? options.data.sheetData.rows : [],
          { id: options.data.freshOptions.sheet }
        );
        payload["value"] =
          currentSheet && currentSheet.config ? currentSheet.config.value : "";
        payload["value1"] =
          currentSheet && currentSheet.config ? currentSheet.config.value1 : "";
        payload["value2"] =
          currentSheet && currentSheet.config ? currentSheet.config.value2 : "";
      }
      break;
    }
    default: {
    }
  }
  switch (subtype) {
    case ACTION_LIST.DUMMY_ROWS: {
      payload = { ...options.data };
      break;
    }
    case "share": {
      payload = { ...options.data };
      break;
    }
    case ACTION_LIST.PIN_UNPIN: {
      payload = {
        scripId:
          options.payload && options.payload.scripId
            ? options.payload.scripId
            : "",
      };
      if (type === CONSTANTS.routeType.report) {
        payload = {
          id:
            options.payload && options.payload.scripId
              ? options.payload.scripId
              : "",
          reportId:
            options.payload && options.payload.reportId
              ? options.payload.reportId
              : "",
        };
      }
      break;
    }
    case ACTION_LIST.ADD_REMARK: {
      payload = {
        date:
          options.payload && options.payload.date
            ? moment(options.payload.date).format("LL")
            : "",
        data:
          options.payload && options.payload.data ? options.payload.data : "",
        scripDataId:
          options.payload && options.payload.scripDataId
            ? options.payload.scripDataId
            : "",
      };
      break;
    }
    case ACTION_LIST.EDIT_NOTE: {
      payload = {
        date:
          options.payload && options.payload.timestamp
            ? moment(options.payload.timestamp).format("YYYY-MM-DD")
            : "",
        note:
          options.payload && options.payload.data ? options.payload.data : "",
      };
      break;
    }
    case ACTION_LIST.VIEW_DOCUMENT:
    case ACTION_LIST.VIEW_NOTE: {
      payload = {
        ...options.payload,
        match: options.match,
        subtype: options.match.childRoute,
        date:
          options.payload && options.payload.date
            ? moment(options.payload.date).format("YYYY-MM-DD")
            : "",
      };
      break;
    }
    case "crossover-metrics": {
      payload = options.data;
      break;
    }
    default: {
    }
  }
  return payload;
};

export const sheetConfigBuilder = ({ childRoute, name, payload, id }) => {
  let childRouteKey = _.findKey(CONSTANTS.childRoutes, (e) => e === childRoute);
  if (childRouteKey === undefined) {
    childRouteKey = _.findKey(
      CONSTANTS.analyticRoutes,
      (e) => e === childRoute
    );
  }
  let category = CONSTANTS.category_list[childRouteKey]["index"];

  let o = {};
  if (id) {
    o.id = id;
  }

  return {
    category,
    name: name || convertNormalOptions(_.omit(payload, ["above"])),
    config: {
      ...payload,
    },
    ...o,
  };
};

/* Helper function */
export function downloadFile(fileURL, fileName) {
  // for non-IE
  if (!window.ActiveXObject) {
    var save = document.createElement("a");
    save.href = fileURL;
    save.target = "_blank";
    var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
    save.download = fileName || filename;
    if (
      navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
      navigator.userAgent.search("Chrome") < 0
    ) {
      document.location = save.href;
      // window event not working here
    } else {
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  }

  // for IE < 11
  else if (!!window.ActiveXObject && document.execCommand) {
    var _window = window.open(fileURL, "_blank");
    _window.document.close();
    _window.document.execCommand("SaveAs", true, fileName || fileURL);
    _window.close();
  }
}

export const decimalize = (value, decimal = 2) => {
  let hundred = Math.pow(10, decimal);
  return Math.round((value + Number.EPSILON) * hundred) / hundred;
};

export const sortCrossoverSequence = (crossOverSequenceRows) => {
  if (crossOverSequenceRows === undefined || crossOverSequenceRows === null)
    return;
  let findIndex = crossOverSequenceRows.findIndex(
    (a) => a?.config?.specialSheet !== undefined
  );
  let itemAtIndex = null;
  if (findIndex !== -1) {
    itemAtIndex = crossOverSequenceRows.at(itemAtIndex);
    crossOverSequenceRows.splice(itemAtIndex, 1);
  }
  crossOverSequenceRows.sort((a, b) => {
    return parseInt(a?.config?.value2) - parseInt(b?.config?.value2);
  });
  crossOverSequenceRows.sort((a, b) => {
    return (
      parseInt(a?.config?.value2) === parseInt(b?.config?.value2) &&
      parseInt(a?.config?.value1) - parseInt(b?.config?.value1)
    );
  });
  if (itemAtIndex) crossOverSequenceRows.unshift(itemAtIndex);
  return crossOverSequenceRows;
};

export const sortArrayOfObjectsBasedOnKey = (arr, key) => {
  if (arr === undefined || arr === null) return;
  arr.sort(function (a, b) {
    let dataA = a?.[key]?.toLowerCase(),
      dataB = b?.[key]?.toLowerCase();
    if (dataA < dataB) return -1;
    if (dataA > dataB) return 1;
    return 0;
  });
};
