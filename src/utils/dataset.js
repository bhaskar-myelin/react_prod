// import { CONSTANTS } from "./constants";
// import _ from "lodash";
// import React from "react";
// import { DURATION_LIST, FETCH_OHLC_HEADER } from "./classes/Base";
// import { decimalize } from "./handlers";
// import moment from "moment-timezone";
// // import moment from 'moment'

// const optionsFilterList = [
//   { name: "Closing price", value: "4" },
//   { name: "Opening price", value: "1" },
//   { name: "High price", value: "2" },
//   { name: "Low price", value: "3" },
//   { name: "VWAP price", value: "5" },
// ];

// const operationSubtypeList = (type, format = false, data = {}) => {
//   let list = [
//     { name: "Ratio", value: 1 },
//     { name: "Percentage", value: 2 },
//     { name: "Value", value: 3 },
//   ];
//   if (format) {
//     if (type === 1) {
//       return `${data.value1}:${data.value2}`;
//     }
//     if (type === 2) {
//       return `${data.value}%`;
//     }
//     if (type === 1) {
//       return `${data.value} value`;
//     }
//   }
// };

// export const ACTION_LIST = {
//   NEW_ANALYSIS: "new-analysis",
//   EDIT: "edit",
//   HIDE: "hide",
//   UNHIDE: "unhide",
//   UNHIDE_ALL: "unhide_all",
//   ADD_DURATION: "duration",
//   CONFIRM: "confirm",
//   ADD_DOCUMENT: "add_document",
//   VIEW_DOCUMENT: "view_document",
//   ADD_NOTE: "add_note",
//   EDIT_NOTE: "edit_note",
//   VIEW_NOTE: "view_note",
//   ADD_OPERATION: "add_operation",
//   DELETE: "delete_analysis",
//   DELETE_DURATION: "delete_duration",
//   ADD_SCRIP: "ADD_SCRIP",
//   ADD_REMARK: "ADD_REMARK",
//   PIN_UNPIN: "PIN_UNPIN",
//   UPLOAD_EXCEL: "UPLOAD_EXCEL",
//   DUMMY_ROWS: "HYPOTHETICAL_ROWS",
//   EXPORT_TABLE: "EXPORT_TABLE",
//   UPLOAD_EDIT_EXCEL: "EDIT_SCRIP_DATA",
// };

// export const OPERATIONS_LIST = [
//   { name: "Bonus", value: "bonus", index: 0 },
//   { name: "Demerger", value: "demerger", index: 1 },
//   { name: "Splitting", value: "splitting", index: 2 },
// ];

// const analyticsObject = {
//   title: "Dashboard Analytics",
//   subtitle: "Find the Success Ratio of Crossovers below",
//   hasSubtitle: true,
//   filter: true,
//   filterList: [
//     {
//       type: "button",
//       name: "add_scrip",
//       placeholder: "Add Script",
//       renderButtonHTML: (
//         <div className="d-flex align-items-center">
//           <i className="material-icons" style={{ fontSize: "15pt" }}>
//             add
//           </i>
//           <span className="mx-2">Add Script</span>
//         </div>
//       ),
//     },
//   ],
//   [ACTION_LIST.NEW_ANALYSIS]: {
//     btnName: "Apply",
//     hasButton: true,
//   },
//   [ACTION_LIST.EDIT]: {
//     btnName: "Apply",
//     hasButton: true,
//   },
// };

// export const DATASET = {
//   [CONSTANTS.routeType.dashboard]: {
//     title: "Browse Companies Alphabetically",
//     renderElements: [
//       { name: "A", link: { to: "a" } },
//       { name: "B", link: { to: "b" } },
//       { name: "C", link: { to: "c" } },
//       { name: "D", link: { to: "d" } },
//       { name: "E", link: { to: "e" } },
//       { name: "F", link: { to: "f" } },
//       { name: "G", link: { to: "g" } },
//       { name: "H", link: { to: "h" } },
//       { name: "I", link: { to: "i" } },
//       { name: "J", link: { to: "j" } },
//       { name: "K", link: { to: "k" } },
//       { name: "L", link: { to: "l" } },
//       { name: "M", link: { to: "m" } },
//       { name: "N", link: { to: "n" } },
//       { name: "O", link: { to: "o" } },
//       { name: "P", link: { to: "p" } },
//       { name: "Q", link: { to: "q" } },
//       { name: "R", link: { to: "r" } },
//       { name: "S", link: { to: "s" } },
//       { name: "T", link: { to: "t" } },
//       { name: "U", link: { to: "u" } },
//       { name: "V", link: { to: "v" } },
//       { name: "W", link: { to: "w" } },
//       { name: "X", link: { to: "x" } },
//       { name: "Y", link: { to: "y" } },
//       { name: "Z", link: { to: "z" } },
//     ],
//     hasSubtitle: false,
//     paramOption: "list",
//     linkType: "queryParam",
//     filter: false,
//     table: {
//       columns: [
//         {
//           id: "companyName",
//           numeric: false,
//           disablePadding: false,
//           label: "Company Name",
//         },
//         {
//           id: "open",
//           numeric: false,
//           disablePadding: false,
//           label: "Today's Open ",
//         },
//         {
//           id: "closing",
//           numeric: false,
//           disablePadding: false,
//           label: "Today's Closing",
//         },
//         {
//           id: "high",
//           numeric: false,
//           disablePadding: false,
//           label: "Today's High",
//         },
//         {
//           id: "low",
//           numeric: false,
//           disablePadding: false,
//           label: "Today's Low",
//         },
//         { id: "vwap", numeric: false, disablePadding: false, label: "VWAP" },
//         {
//           id: "action",
//           numeric: false,
//           disablePadding: false,
//           label: "Action",
//         },
//       ],
//     },
//     [CONSTANTS.operation.ADD]: {
//       btnName: "Add",
//       hasButton: true,
//     },
//   },
//   [CONSTANTS.routeType.analytics]: {
//     title: "Dashboard Analytics",
//     subtitle: "Find detailed analytics of listed stocks",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "search",
//         name: "search",
//         placeholder: "Search for stocks, performance",
//       },
//       {
//         type: "filter",
//         icon: "filter_list",
//         name: "sort",
//         placeholder: "Filter By",
//         default: 0,
//       },
//     ],
//   },
//   [CONSTANTS.routeType.report]: {
//     title: "Daily Reports",
//     subtitle: "Find Daily Reports of stocks below",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "search",
//         name: "search",
//         placeholder: "Search for report by date, type",
//       },
//       {
//         type: "modifyDate",
//         renderButtonHTML: (
//           <div className="d-flex align-items-center">
//             <i className="material-icons" style={{ fontSize: "15pt" }}>
//               swap_vert
//             </i>
//             <span className="mx-2">Sort By</span>
//             <i className="material-icons" style={{ fontSize: "15pt" }}>
//               keyboard_arrow_down
//             </i>
//           </div>
//         ),
//         format: "report",
//       },
//     ],
//     table: {
//       columns: [
//         { id: "name", numeric: false, disablePadding: false, label: "Name" },
//         { id: "date", numeric: false, disablePadding: false, label: "Date" },
//         { id: "type", numeric: false, disablePadding: false, label: "Type" },
//       ],
//     },
//   },
//   [CONSTANTS.childRoutes.historicalAnalysis]: {
//     title: "Historical Data for %scripName%",
//     subtitle: "Currency in INR",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "dropdown",
//         name: "baseType",
//         placeholder: "Select type",
//         default: optionsFilterList[0].value,
//         option: [...optionsFilterList],
//       },
//       {
//         type: "modifyDate",
//       },
//     ],
//     [ACTION_LIST.ADD_DURATION]: {
//       btnName: "Add",
//       hasButton: true,
//     },
//     [ACTION_LIST.ADD_OPERATION]: {
//       hasButton: false,
//     },
//     [ACTION_LIST.ADD_NOTE]: {
//       hasButton: false,
//     },
//   },
//   [CONSTANTS.childRoutes.periodicAnalysis]: {
//     title: "Periodic Analysis for %scripName%",
//     subtitle: "Currency in INR",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "dropdown",
//         name: "baseType",
//         placeholder: "Select type",
//         default: optionsFilterList[0].value,
//         option: [...optionsFilterList],
//       },
//       {
//         type: "modifyDate",
//       },
//     ],
//     [ACTION_LIST.NEW_ANALYSIS]: {
//       btnName: "Apply",
//       hasButton: true,
//     },
//   },
//   [CONSTANTS.childRoutes.simpleMovingAverage]: {
//     title: "Simple Moving Average for %scripName%",
//     subtitle: "Currency in INR",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "dropdown",
//         name: "baseType",
//         placeholder: "Select type",
//         default: optionsFilterList[0].value,
//         option: [...optionsFilterList],
//       },
//       ,
//       {
//         type: "modifyDate",
//       },
//     ],
//     [ACTION_LIST.NEW_ANALYSIS]: {
//       btnName: "Apply",
//       hasButton: true,
//     },
//   },
//   [CONSTANTS.childRoutes.crossoverAnalysis]: {
//     title: "Crossover Analysis for %scripName%",
//     subtitle: "Currency in INR",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "dropdown",
//         name: "baseType",
//         placeholder: "Select type",
//         default: optionsFilterList[0].value,
//         option: [...optionsFilterList],
//       },
//       {
//         type: "modifyDate",
//       },
//     ],
//     [ACTION_LIST.NEW_ANALYSIS]: {
//       btnName: "Apply",
//       hasButton: true,
//     },
//     [ACTION_LIST.EDIT]: {
//       btnName: "Apply",
//       hasButton: true,
//     },
//   },
//   [CONSTANTS.childRoutes.afterEffect]: {
//     title: "After Effect Analysis for %scripName%",
//     subtitle: "Currency in INR",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "dropdown",
//         name: "baseType",
//         placeholder: "Select type",
//         default: optionsFilterList[0].value,
//         option: [...optionsFilterList],
//       },
//       {
//         type: "modifyDate",
//       },
//     ],
//     [ACTION_LIST.NEW_ANALYSIS]: {
//       btnName: "Apply",
//       hasButton: true,
//     },
//     [ACTION_LIST.EDIT]: {
//       btnName: "Apply",
//       hasButton: true,
//     },
//   },
//   [CONSTANTS.childRoutes.documents]: {
//     title: "Documents for %scripName%",
//     subtitle: "Find your files below",
//     hasSubtitle: true,
//     filter: true,
//     filterList: [
//       {
//         type: "search",
//         name: "search",
//         placeholder: "Search for files, reports, documents",
//         icon: "search",
//       },
//       {
//         type: "modifyDate",
//         renderButtonHTML: (
//           <div className="d-flex align-items-center">
//             <i className="material-icons" style={{ fontSize: "15pt" }}>
//               filter_list
//             </i>
//             <span className="mx-2">Filter By</span>
//             <i className="material-icons" style={{ fontSize: "15pt" }}>
//               keyboard_arrow_down
//             </i>
//           </div>
//         ),
//       },
//     ],
//     table: {
//       columns: [
//         { id: "name", numeric: false, disablePadding: false, label: "Name" },
//         { id: "date", numeric: false, disablePadding: false, label: "Date" },
//         {
//           id: "uploaddate",
//           numeric: false,
//           disablePadding: false,
//           label: "Upload Date",
//         },
//         { id: "type", numeric: false, disablePadding: false, label: "Type" },
//         { id: "action", numeric: false, disablePadding: false, label: "" },
//       ],
//     },
//   },
//   [CONSTANTS.analyticRoutes.crossoverSuccessRatio]: {
//     ...analyticsObject,
//     filterList: [
//       // {
//       //     type: "sorting",
//       //     renderButtonHTML: <div className="d-flex align-items-center">
//       //         <i className="material-icons color-primary" style={{fontSize: "15pt"}}>swap_vert</i>
//       //         <span className="mx-2">Sort By</span>
//       //     </div>,
//       //     option: [
//       //         { name: "High to Low", value: "DESC" },
//       //         { name: "Low to High", value: "ASC" },
//       //         { name: "A to Z", value: "0" },
//       //         { name: "Z to A", value: "1" }
//       //     ],
//       //     dividerIndex: 2
//       // },
//       ...analyticsObject.filterList,
//     ],
//   },
//   [CONSTANTS.analyticRoutes.periodPerformance]: {
//     ...analyticsObject,
//     filterList: [{ type: "modifyDate" }, ...analyticsObject.filterList],
//   },
//   [CONSTANTS.analyticRoutes.allTimeHigh]: {
//     ...analyticsObject,
//     filterList: [{ type: "modifyDate" }, ...analyticsObject.filterList],
//   },
//   [CONSTANTS.analyticRoutes.masterSMA]: {
//     ...analyticsObject,
//     filterList: [{ type: "modifyDate" }, ...analyticsObject.filterList],
//   },
//   [CONSTANTS.analyticRoutes.afterEffectAnalysis]: {
//     ...analyticsObject,
//     filterList: [{ type: "modifyDate" }, ...analyticsObject.filterList],
//   },
//   [CONSTANTS.analyticRoutes.masterCrossoverData]: {
//     ...analyticsObject,
//     filterList: [{ type: "modifyDate" }, ...analyticsObject.filterList],
//   },
// };

// export const fetchReportStatusType = (type, subtype = 0) => {
//   if (subtype == 0) {
//     switch (type) {
//       case 1:
//         return "Active";
//       case 2:
//         return "Horizon";
//       default:
//         return "Focus";
//     }
//   }
//   return [
//     { name: "Active", value: "1" },
//     { name: "Focus", value: "0" },
//     { name: "Horizon", value: "2" },
//   ];
// };

// export const stockExchangeList = [
//   { name: "NSE", value: "nse" },
//   { name: "BSE", value: "bse" },
// ];

// const generateBaseTableConfig = (
//   title,
//   dataKey,
//   width,
//   sortable = false,
//   align = "left"
// ) => {
//   return { key: dataKey, title, dataKey, width, sortable, align };
// };

// export const generateBaseTableData = (type, data, config = {}) => {
//   let p = [];
//   switch (type) {
//     case CONSTANTS.childRoutes.historicalAnalysis: {
//       let { name, durationList, bonusList } = config;
//       let l = durationList.length;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           // date: e[0] ? moment(e[0]).tz("Asia/Kolkata").format("DD MMM, YYYY") : "",
//           date: e[0]
//             ? moment.utc(e[0]).local().tz("Asia/Kolkata").format("DD MMM YYYY")
//             : "",
//           ...bonusList.reduce((obj, o, u) => {
//             return { ...obj, [`${o.id}`]: e[u + 1] };
//           }, {}),
//           // [name]: Number(e[bonusList.length + 1]).toFixed(2),
//           [name]: e[bonusList.length + 1],
//           ...durationList.reduce((obj, o, u) => {
//             return {
//               ...obj,
//               [`${o}Days`]: decimalizeUpto(e[bonusList.length + u + 2]),
//             };
//           }, {}),
//           "10-100PriceHighest": e[l + 1 + bonusList.length + 1],
//           "10-100PriceRising": decimalizeUpto(e[l + 1 + bonusList.length + 2]),
//           max: e[l + 1 + bonusList.length + 3],
//           "10-3500PriceHighest": decimalizeUpto(
//             e[l + 1 + bonusList.length + 4]
//           ),
//           volume: e[l + 1 + bonusList.length + 5],
//           delivery: e[l + 1 + bonusList.length + 6],
//           remarks: e[l + 1 + bonusList.length + 7],
//         });
//       });
//       break;
//     }
//     case CONSTANTS.childRoutes.periodicAnalysis: {
//       let { name } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           [`${name}`]: e[0],
//           [`${name}High`]: decimalizeUpto(e[1]),
//           [`${name}Low`]: decimalizeUpto(e[2]),
//           [`${name}Opening`]: decimalizeUpto(e[4]),
//           [`${name}Close`]: decimalizeUpto(e[3]),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.childRoutes.simpleMovingAverage: {
//       let { name, durationList } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           // [name]: e[0],
//           [name]: e[0],
//           ...durationList.reduce((obj, o, u) => {
//             return { ...obj, [`${o}Days`]: decimalizeUpto(e[u + 1]) };
//           }, {}),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.childRoutes.crossoverAnalysis: {
//       let { name, value1, value2 } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           date: e[0]
//             ? moment.utc(e[0]).local().tz("Asia/Kolkata").format("DD MMM YYYY")
//             : "",
//           // [name]: e[1],
//           [name]: Number(e[1]).toFixed(2),
//           [`${value1}Day`]: decimalizeUpto(e[2]),
//           [`${value2}Day`]: decimalizeUpto(e[3]),
//           impact: e[4],
//           dayCount: e[5],
//           cHigh: decimalizeUpto(e[6]),
//           cLow: decimalizeUpto(e[7]),
//           return: e[8] === "-" ? e[8] : decimalizeUpto(e[8]),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.childRoutes.afterEffect: {
//       let { name, durationList } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           date: e[0]
//             ? moment.utc(e[0]).local().tz("Asia/Kolkata").format("DD MMM YYYY")
//             : "",
//           // [name]: e[1],
//           [name]: Number(e[1]).toFixed(2),
//           ...durationList.reduce((obj, o, u) => {
//             return { ...obj, [`${o}Days`]: e[u + 2] };
//           }, {}),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.analyticRoutes.crossoverSuccessRatio: {
//       let { special, duration } = config;
//       if (special) {
//         _.forEach(data, (e, i) => {
//           p.push({
//             id: i,
//             sno: i + 1,
//             scrip: e[0],
//             industry: e[2],
//             group: e[1],
//             // price: e[3],
//             ...duration.reduce((obj, o, u) => {
//               return { ...obj, [`${u}`]: e[u + 4] };
//             }, {}),
//           });
//         });
//       } else {
//         _.forEach(data, (e, i) => {
//           p.push({
//             id: i,
//             sno: i + 1,
//             scrip: e[0],
//             industry: e[2],
//             group: e[1],
//             price: decimalizeUpto(e[3]),
//             totalCount: e[4],
//             above: e[5],
//             ratio: e[6],
//             greenDays: e[7],
//             redDays: e[8],
//           });
//         });
//       }
//       break;
//     }
//     case CONSTANTS.analyticRoutes.periodPerformance: {
//       let { name } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           scrip: e[0],
//           [`${name}`]: e[1],
//           [`${name}High`]: decimalizeUpto(e[2]),
//           [`${name}Low`]: decimalizeUpto(e[3]),
//           [`${name}Opening`]: decimalizeUpto(e[5]),
//           [`${name}Close`]: decimalizeUpto(e[4]),
//           return: e[6],
//         });
//       });
//       break;
//     }
//     case CONSTANTS.analyticRoutes.allTimeHigh: {
//       const { value1, value2, value3 } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           id: i,
//           sno: i + 1,
//           scrip: e[0],
//           industry: e[1],
//           group: e[2],
//           startDate: e[3],
//           endDate: e[4],
//           days: e[5],
//           priceStartDate: decimalizeUpto(e[6]),
//           priceEndDate: decimalizeUpto(e[7]),
//           [`${value1}Day`]: decimalizeUpto(e[8]),
//           [`${value2}Day`]: decimalizeUpto(e[9]),
//           [`${value3}Day`]: decimalizeUpto(e[10]),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.analyticRoutes.masterSMA: {
//       let { name, durationList } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           scrip: e[0],
//           [name]: e[1],
//           ...durationList.reduce((obj, o, u) => {
//             return { ...obj, [`${o}Days`]: decimalizeUpto(e[u + 2]) };
//           }, {}),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.analyticRoutes.afterEffectAnalysis: {
//       let { name, durationList } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           scrip: e[0],
//           // date: e[1] ? moment(e[1]).tz("Asia/Kolkata").format("DD MMM, YYYY") : "",
//           date: e[1]
//             ? moment.utc(e[1]).local().tz("Asia/Kolkata").format("DD MMM YYYY")
//             : "",
//           // date: e[1],
//           // [name]: e[2],
//           [name]: Number(e[2]).toFixed(2),
//           ...durationList.reduce((obj, o, u) => {
//             return { ...obj, [`${o}Days`]: e[u + 3] };
//           }, {}),
//         });
//       });
//       break;
//     }
//     case CONSTANTS.analyticRoutes.masterCrossoverData: {
//       let { name, value1, value2 } = config;
//       _.forEach(data, (e, i) => {
//         p.push({
//           sno: i + 1,
//           id: i,
//           scrip: e[0],
//           date: e[1]
//             ? moment.utc(e[1]).local().tz("Asia/Kolkata").format("DD MMM YYYY")
//             : "",
//           [name]: e[2],
//           [value1]: decimalizeUpto(e[3]),
//           [value2]: decimalizeUpto(e[4]),
//           impact: e[5],
//           dayCount: e[6],
//           cHigh: decimalizeUpto(e[7]),
//           cLow: decimalizeUpto(e[8]),
//           return: e[9] === "-" ? e[9] : decimalizeUpto(e[9]),
//         });
//       });
//       break;
//     }
//     default: {
//     }
//   }
//   return p;
// };

// export const BaseTableConfig = (type, data, config = {}) => {
//   const colorCodingExpressionValidator = (value) => {
//     if (/.*\<.*\>/.test(value)) {
//       // console.log({ color: /.*\<(.*)\>/.exec(value), value })
//       return { color: /.*\<(.*)\>/.exec(value)[1], value: value.split("<")[0] };
//     }
//     return { value };
//   };

//   switch (type) {
//     case CONSTANTS.childRoutes.historicalAnalysis: {
//       let { durationList, OHLCParam, bonusList } = config;
//       let ohlcHead = FETCH_OHLC_HEADER(OHLCParam);
//       let lastBonus =
//         bonusList && bonusList.length ? bonusList[bonusList.length - 1] : {};
//       let reversedList = JSON.parse(JSON.stringify(bonusList));
//       let bonusListMap = [
//         ...reversedList.reverse().map((e, i) => {
//           if (i == 0) {
//             return {
//               ...generateBaseTableConfig(
//                 `Price`,
//                 `${e.id}`,
//                 10,
//                 false,
//                 "center"
//               ),
//               frozen: true,
//               key: "Price",
//             };
//           }
//           return {
//             ...generateBaseTableConfig(
//               `${
//                 _.find(OPERATIONS_LIST, { index: e.type * 1 }).name || "Bonus"
//               } ${operationSubtypeList(e.subtype, true, { ...e.value })}`,
//               `${e.id}`,
//               10,
//               false,
//               "center"
//             ),
//             frozen: true,
//             key: `${
//               _.find(OPERATIONS_LIST, { index: e.type * 1 }).name
//             } - ${operationSubtypeList(e.subtype, true, {
//               ...e.value,
//             })} (${new Date(e.announcementDate).toLocaleDateString()})`,
//           };
//         }),
//       ];
//       return {
//         heads: [
//           {
//             ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center"),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(`Date`, `date`, 120, false, "center"),
//             frozen: true,
//           },
//           ...bonusListMap,
//           {
//             ...generateBaseTableConfig(
//               `${ohlcHead.name}`,
//               `${ohlcHead.short}`,
//               80,
//               false,
//               "center"
//             ),
//             key: _.find(OPERATIONS_LIST, { index: lastBonus.type * 1 })
//               ? `${
//                   _.find(OPERATIONS_LIST, { index: lastBonus.type * 1 }).name
//                 } - ${operationSubtypeList(lastBonus.subtype, true, {
//                   ...lastBonus.value,
//                 })} (${new Date(
//                   lastBonus.announcementDate
//                 ).toLocaleDateString()})`
//               : ohlcHead.short,
//             frozen: true,
//             cellRenderer: ({ cellData: d }) => {
//               let c = colorCodingExpressionValidator(d);
//               return (
//                 <div
//                   className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                 >
//                   {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                   <span className="ml-auto my-auto pr-2">
//                     {c.value * 1 == 0 ? "" : Number(c.value).toFixed(2)}
//                   </span>
//                 </div>
//               );
//             },
//           },
//           ...durationList.map((e) => {
//             return {
//               ...generateBaseTableConfig(
//                 `${e} Days`,
//                 `${e}Days`,
//                 60,
//                 false,
//                 "center"
//               ),
//               key: e,
//               cellRenderer: ({ cellData: d }) => {
//                 let c = colorCodingExpressionValidator(d);
//                 return (
//                   <div
//                     className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                   >
//                     {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                     <span className="ml-auto my-auto pr-2">
//                       {c.value * 1 == 0 ? "" : c.value}
//                     </span>
//                   </div>
//                 );
//               },
//             };
//           }),
//           {
//             ...generateBaseTableConfig(
//               `10-100 Price Highest`,
//               "10-100PriceHighest",
//               100,
//               false,
//               "center"
//             ),
//             cellRenderer: ({ cellData: d }) => {
//               let c = colorCodingExpressionValidator(d);
//               return (
//                 <div
//                   className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                 >
//                   {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                   <span className="ml-auto my-auto pr-2">{c.value}</span>
//                 </div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(
//               `10-100 Price Rising`,
//               "10-100PriceRising",
//               100,
//               false,
//               "center"
//             ),
//             cellRenderer: ({ cellData: d }) => {
//               let c = colorCodingExpressionValidator(d);
//               return (
//                 <div
//                   className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                 >
//                   {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                   <span className="ml-auto my-auto pr-2">
//                     {c.value * 1 == 0 ? "" : c.value}
//                   </span>
//                 </div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(`Max.`, "max", 80, false, "center"),
//             cellRenderer: ({ cellData: d }) => decimalize(d, 0),
//           },
//           {
//             ...generateBaseTableConfig(
//               `10-3500 Price Highest`,
//               "10-3500PriceHighest",
//               100,
//               false,
//               "center"
//             ),
//             cellRenderer: ({ cellData: d }) => {
//               let c = colorCodingExpressionValidator(d);
//               return (
//                 <div
//                   className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                 >
//                   {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                   <span className="ml-auto my-auto pr-2">
//                     {c.value * 1 == 0 ? "" : c.value}
//                   </span>
//                 </div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(`Volume`, "volume", 80, false, "center"),
//             cellRenderer: ({ cellData: d }) => {
//               let c = colorCodingExpressionValidator(d);
//               return (
//                 <div
//                   className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                 >
//                   {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                   <span className="ml-auto my-auto pr-2">
//                     {c.value * 1 == 0 ? "" : c.value}
//                   </span>
//                 </div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(
//               `Delivery`,
//               "delivery",
//               80,
//               false,
//               "center"
//             ),
//             cellRenderer: ({ cellData: d }) => {
//               let c = colorCodingExpressionValidator(d);
//               return (
//                 <div
//                   className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                 >
//                   {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                   <span className="ml-auto my-auto pr-2">
//                     {c.value * 1 == 0 ? "" : c.value}
//                   </span>
//                 </div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(
//               `Remarks`,
//               "remarks",
//               120,
//               false,
//               "left"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data, {
//           durationList,
//           name: ohlcHead.short,
//           bonusList,
//         }),
//       };
//     }
//     case CONSTANTS.childRoutes.periodicAnalysis: {
//       let durationIndex = _.find(DURATION_LIST, { duration: config.duration });
//       return {
//         heads: [
//           { ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center") },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name}`,
//               `${durationIndex.name}`,
//               180,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Highest`,
//               `${durationIndex.name}High`,
//               200,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Lowest`,
//               `${durationIndex.name}Low`,
//               200,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Opening`,
//               `${durationIndex.name}Opening`,
//               200,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Closing`,
//               `${durationIndex.name}Close`,
//               200,
//               false,
//               "center"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data, { name: durationIndex.name }),
//       };
//     }
//     case CONSTANTS.childRoutes.simpleMovingAverage: {
//       let durationIndex = _.find(DURATION_LIST, { duration: config.duration });
//       let smaHeads = [10, 20, 30, 50, 100, 150, 200, 250];
//       if (config.duration == 365) {
//         smaHeads = [
//           10, 20, 30, 50, 100, 150, 200, 250, 500, 750, 1000, 1250, 1500, 2000,
//           2500, 3000, 3500,
//         ];
//       }
//       return {
//         heads: [
//           {
//             ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center"),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name}`,
//               `${durationIndex.name}`,
//               120,
//               false,
//               "center"
//             ),
//             frozen: true,
//           },
//           ...smaHeads.map((e) => {
//             return {
//               ...generateBaseTableConfig(
//                 `${e} Days`,
//                 `${e}Days`,
//                 100,
//                 false,
//                 "center"
//               ),
//               cellRenderer: ({ cellData: d }) => {
//                 let c = colorCodingExpressionValidator(d);
//                 return (
//                   <div
//                     className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                   >
//                     <span className="ml-auto my-auto pr-2">
//                       {c.value * 1 == 0 ? "" : c.value}
//                     </span>
//                   </div>
//                 );
//               },
//             };
//           }),
//         ],
//         data: generateBaseTableData(type, data, {
//           name: durationIndex.name,
//           durationList: smaHeads,
//         }),
//       };
//     }
//     case CONSTANTS.childRoutes.crossoverAnalysis: {
//       let { OHLCParam, value1, value2 } = config;
//       let ohlcHead = FETCH_OHLC_HEADER(OHLCParam);
//       return {
//         heads: [
//           {
//             ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center"),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover Date`,
//               `date`,
//               140,
//               false,
//               "center"
//             ),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(
//               ohlcHead.name,
//               ohlcHead.short,
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${value1} Days`,
//               `${value1}Day`,
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${value2} Days`,
//               `${value2}Day`,
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Impact`,
//               "impact",
//               100,
//               false,
//               "center"
//             ),
//             cellRenderer: ({ cellData: d }) => {
//               let color = colorCodingExpressionValidator(d).color;
//               return (
//                 <div className={`d-flex ${type} w-100 h-100 ${color}Bg`}></div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover Day Count`,
//               "dayCount",
//               130,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover High`,
//               "cHigh",
//               130,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover Low`,
//               "cLow",
//               130,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Return (%)`,
//               "return",
//               100,
//               false,
//               "center"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data, {
//           value1,
//           value2,
//           name: ohlcHead.short,
//         }),
//       };
//     }
//     case CONSTANTS.childRoutes.afterEffect: {
//       let { OHLCParam } = config;
//       const aeHeads = [7, 15, 30, 45, 60];
//       let ohlcHead = FETCH_OHLC_HEADER(OHLCParam);
//       return {
//         heads: [
//           {
//             ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center"),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(`Date`, `date`, 150, false, "center"),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(
//               ohlcHead.name,
//               ohlcHead.short,
//               150,
//               false,
//               "center"
//             ),
//           },
//           ...aeHeads.map((e) => {
//             return {
//               ...generateBaseTableConfig(
//                 `${e} Days`,
//                 `${e}Days`,
//                 140,
//                 false,
//                 "center"
//               ),
//               cellRenderer: ({ cellData: d }) => {
//                 let c = colorCodingExpressionValidator(d);
//                 return (
//                   <div
//                     className={`d-flex text-center w-100 h-100 ${type} ${c.color}Bg`}
//                   >
//                     {/* <span className="ml-auto my-auto pr-2">{c.value}</span> */}
//                     <span className="ml-auto my-auto pr-2">
//                       {c.value * 1 == 0 ? "" : c.value}
//                     </span>
//                   </div>
//                 );
//               },
//             };
//           }),
//         ],
//         data: generateBaseTableData(type, data, {
//           durationList: aeHeads,
//           name: ohlcHead.short,
//         }),
//       };
//     }
//     case CONSTANTS.analyticRoutes.crossoverSuccessRatio: {
//       let { special, duration } = config;
//       if (special) {
//         return {
//           heads: [
//             {
//               ...generateBaseTableConfig("SN", "sno", 50),
//               cellRenderer: ({ cellData }) => {
//                 return (
//                   <div className={`d-flex w-100 h-100`}>
//                     <span className="m-auto">{cellData}</span>
//                   </div>
//                 );
//               },
//             },
//             { ...generateBaseTableConfig("Scrip", "scrip", 150, true) },
//             {
//               ...generateBaseTableConfig(
//                 "Industry",
//                 "industry",
//                 120,
//                 false,
//                 "center"
//               ),
//             },
//             {
//               ...generateBaseTableConfig(
//                 "Group",
//                 "group",
//                 120,
//                 false,
//                 "center"
//               ),
//             },
//             ...duration.map((e, j) => {
//               return {
//                 ...generateBaseTableConfig(
//                   `${e[0]}-${e[1]}`,
//                   `${j}`,
//                   100,
//                   false,
//                   "right"
//                 ),
//                 sortable: true,
//               };
//             }),
//           ],
//           data: generateBaseTableData(type, data, { special, duration }),
//         };
//       }
//       return {
//         heads: [
//           {
//             ...generateBaseTableConfig("SN", "sno", 50),
//             cellRenderer: ({ cellData }) => {
//               return (
//                 <div className={`d-flex w-100 h-100`}>
//                   <span className="m-auto">{cellData}</span>
//                 </div>
//               );
//             },
//           },
//           { ...generateBaseTableConfig("Scrip", "scrip", 150, true) },
//           {
//             ...generateBaseTableConfig(
//               "Industry",
//               "industry",
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig("Group", "group", 120, false, "center"),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Closing Price",
//               "price",
//               120,
//               true,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Total Count",
//               "totalCount",
//               100,
//               true,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Above ${config.above}%`,
//               "above",
//               100,
//               true,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Success Ratio",
//               "ratio",
//               100,
//               true,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Av Green Days",
//               "greenDays",
//               120,
//               true,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Av Red Days",
//               "redDays",
//               120,
//               true,
//               "center"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data),
//       };
//     }
//     case CONSTANTS.analyticRoutes.periodPerformance: {
//       let durationIndex = _.find(DURATION_LIST, { duration: config.duration });
//       return {
//         heads: [
//           { ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center") },
//           { ...generateBaseTableConfig("Scrip", "scrip", 150) },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name}`,
//               `${durationIndex.name}`,
//               150,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Highest`,
//               `${durationIndex.name}High`,
//               150,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Lowest`,
//               `${durationIndex.name}Low`,
//               150,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Opening`,
//               `${durationIndex.name}Opening`,
//               150,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name} Closing`,
//               `${durationIndex.name}Close`,
//               150,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Return % from Opening`,
//               `return`,
//               170,
//               false,
//               "right"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data, { name: durationIndex.name }),
//       };
//     }
//     case CONSTANTS.analyticRoutes.allTimeHigh: {
//       let { value1, value2, value3 } = config;
//       return {
//         heads: [
//           {
//             ...generateBaseTableConfig("SN", "sno", 50),
//             cellRenderer: ({ cellData }) => {
//               return (
//                 <div className={`d-flex w-100 h-100`}>
//                   <span className="m-auto">{cellData}</span>
//                 </div>
//               );
//             },
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig("Scrip", "scrip", 150, true),
//             frozen: true,
//           },
//           {
//             ...generateBaseTableConfig(
//               "Industry",
//               "industry",
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig("Group", "group", 120, false, "center"),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Start Date yellow & Blue",
//               "startDate",
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "End date Yellow & Blue",
//               "endDate",
//               120,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "No. of Days",
//               "days",
//               100,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Closing Price Start Date",
//               "priceStartDate",
//               100,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               "Closing Price End Date",
//               "priceEndDate",
//               100,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Impact ${value1} Days`,
//               `${value1}Day`,
//               80,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Impact ${value2} Days`,
//               `${value2}Day`,
//               80,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Impact ${value3} Days`,
//               `${value3}Day`,
//               80,
//               false,
//               "right"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data, { ...config }),
//       };
//     }
//     case CONSTANTS.analyticRoutes.masterSMA: {
//       let durationIndex = _.find(DURATION_LIST, { duration: config.duration });
//       const masterSmaHeads = [10, 20, 30, 50, 100, 150, 200];
//       return {
//         heads: [
//           { ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center") },
//           { ...generateBaseTableConfig("Scrip", "scrip", 150) },
//           {
//             ...generateBaseTableConfig(
//               `${durationIndex.name}`,
//               `${durationIndex.name}`,
//               120,
//               false,
//               "center"
//             ),
//           },
//           ...masterSmaHeads.map((e) => {
//             return {
//               ...generateBaseTableConfig(
//                 `${e} Days`,
//                 `${e}Days`,
//                 120,
//                 false,
//                 "right"
//               ),
//             };
//           }),
//         ],
//         data: generateBaseTableData(type, data, {
//           name: durationIndex.name,
//           durationList: masterSmaHeads,
//         }),
//       };
//     }
//     case CONSTANTS.analyticRoutes.afterEffectAnalysis: {
//       let { OHLCParam } = config;
//       const aeHeads = [7, 15, 30, 45, 60];
//       let ohlcHead = FETCH_OHLC_HEADER(OHLCParam);
//       return {
//         heads: [
//           { ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center") },
//           { ...generateBaseTableConfig("Scrip", "scrip", 150) },
//           { ...generateBaseTableConfig(`Date`, `date`, 150, false, "center") },
//           {
//             ...generateBaseTableConfig(
//               ohlcHead.name,
//               ohlcHead.short,
//               150,
//               false,
//               "center"
//             ),
//           },
//           ...aeHeads.map((e) => {
//             return {
//               ...generateBaseTableConfig(
//                 `${e} Days`,
//                 `${e}Days`,
//                 120,
//                 false,
//                 "right"
//               ),
//             };
//           }),
//         ],
//         data: generateBaseTableData(type, data, {
//           durationList: aeHeads,
//           name: ohlcHead.short,
//         }),
//       };
//     }
//     case CONSTANTS.analyticRoutes.masterCrossoverData: {
//       let { OHLCParam, value1, value2 } = config;
//       let ohlcHead = FETCH_OHLC_HEADER(OHLCParam);
//       return {
//         heads: [
//           { ...generateBaseTableConfig(`Sno`, `sno`, 50, false, "center") },
//           { ...generateBaseTableConfig("Scrip", "scrip", 140) },
//           {
//             ...generateBaseTableConfig(
//               `Crossover Date`,
//               `date`,
//               150,
//               false,
//               "center"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               ohlcHead.name,
//               ohlcHead.short,
//               120,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${value1} Days`,
//               value1,
//               100,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `${value2} Days`,
//               value2,
//               100,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Impact`,
//               "impact",
//               100,
//               false,
//               "center"
//             ),
//             cellRenderer: ({ cellData: d }) => {
//               let color = colorCodingExpressionValidator(d).color;
//               return (
//                 <div className={`d-flex w-100 h-100 default ${color}Bg`}></div>
//               );
//             },
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover Day Count`,
//               "dayCount",
//               100,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover High`,
//               "cHigh",
//               100,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Crossover Low`,
//               "cLow",
//               100,
//               false,
//               "right"
//             ),
//           },
//           {
//             ...generateBaseTableConfig(
//               `Return (%)`,
//               "return",
//               80,
//               false,
//               "right"
//             ),
//           },
//         ],
//         data: generateBaseTableData(type, data, {
//           value1,
//           value2,
//           name: ohlcHead.short,
//         }),
//       };
//     }
//   }
// };

// const decimalizeUpto = (value, decimal = 2) => {
//   const colorCodingExpressionValidator = (value) => {
//     if (/.*\<.*\>/.test(value)) {
//       // console.log({ color: /.*\<(.*)\>/.exec(value), value })
//       return { color: /.*\<(.*)\>/.exec(value)[1], value: value.split("<")[0] };
//     }
//     return { value };
//   };

//   if (decimal == 3) {
//     decimal = 2;
//   }
//   let hundred = Math.pow(10, decimal);

//   let v = colorCodingExpressionValidator(value);
//   v.value = +v.value;
//   let color = v.color ? `<${v.color}>` : "";

//   return `${(
//     Math.round((v.value + Number.EPSILON) * hundred) / hundred
//   ).toFixed(decimal)}${color}`;
// };
