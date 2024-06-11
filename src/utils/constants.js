// import { ACTION_LIST } from "./_dataset"

export const CONSTANTS = {
  operation: {
    ADD: `add`,
    EDIT: `edit`,
    VIEW: `view`,
    BLOCK: `block`,
    REMOVE: `remove`,
    ROADBLOCK: `roadblock`,
    SEARCH: `search`,
    LIST: `list`,
    FETCH: `fetch`,
  },
  routeType: {
    dashboard: "dashboard",
    report: "report",
    analytics: "analytics",
    login: "login",
    forgotPassword: "forgot-password",
  },
  childRoutes: {
    historicalAnalysis: "historical-analysis",
    periodicAnalysis: "periodic-analysis",
    simpleMovingAverage: "sma",
    crossoverAnalysis: "crossover",
    afterEffect: "after-effect",
    documents: "documents",
  },
  analyticRoutes: {
    crossoverSuccessRatio: "crossover-success-ratio",
    periodPerformance: "periodic-performance",
    allTimeHigh: "52-week-high",
    masterSMA: "master-sma",
    afterEffectAnalysis: "after-effect-analysis",
    masterCrossoverData: "master-crossover-data",
  },
  regex: {
    url: new RegExp(
      "^(((ftp|http|https):\\/\\/)?[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)+.*)$"
    ),
    password: new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
    ),
    email: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
    voucherRegex: new RegExp("^(dd_voucher_).*$"),
    phoneRegex: new RegExp("^\\+(?:[0-9] ?){6,14}[0-9]$"),
  },
  sidebar: {
    options: ["Market Data", "Dashboard Analytics", "Daily Reports"],
    icons: ["list_alt", "pie_chart", "content_copy"],
    link: ["dashboard", "analytics", "report"],
  },
  category_list: {
    historicalAnalysis: { index: 0 },
    periodicAnalysis: { index: 1 },
    simpleMovingAverage: { index: 2 },
    crossoverAnalysis: { index: 3 },
    afterEffect: { index: 4 },
    crossoverSuccessRatio: { index: 5 },
    periodPerformance: { index: 6 },
    allTimeHigh: { index: 7 },
    masterSMA: { index: 8 },
    afterEffectAnalysis: { index: 9 },
    masterCrossoverData: { index: 10 },
  },
};

export const API_CONSTANTS = {
  dashboard: {
    [CONSTANTS.operation.FETCH]: `stock/all`,
    [CONSTANTS.operation.SEARCH]: `stock/search`,
    ADD_REMARK: `stock/remarks`,
  },
  sheets: {
    [CONSTANTS.operation.FETCH]: `sheets`,
    [CONSTANTS.operation.EDIT]: `sheets/addEdit`,
    [CONSTANTS.operation.REMOVE]: `sheets/delete`,
    duration: `sheets/updateDuration`,
    delete_duration: `sheets/updateDuration`,
    hide: `sheets/hiddenHead`,
    unhide: `sheets/hiddenHead`,
    unhide_all: `sheets/hiddenHead`,
  },
  scripDetails: {
    [CONSTANTS.operation.FETCH]: `stock/details`,
    addBonus: `stock/bonus`,
  },
  notes: {
    [CONSTANTS.operation.ADD]: `stock/notes`,
    [CONSTANTS.operation.EDIT]: `stock/notes`,
  },
  documents: {
    [CONSTANTS.operation.FETCH]: `stock/documents`,
    upload: `stock/documents/upload`,
    [CONSTANTS.operation.REMOVE]: `stock/documents/delete`,
  },
  report: {
    [CONSTANTS.operation.FETCH]: `report`,
    changeStatus: `report/status`,
    [CONSTANTS.operation.ADD]: `report/addScrip`,
  },
  [CONSTANTS.routeType.analytics]: {
    [CONSTANTS.operation.ADD]: `stock/update`,
    PIN_UNPIN: `stock/analytics/delete`,
  },
};
