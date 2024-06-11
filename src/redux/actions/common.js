// import { API_CONSTANTS, CONSTANTS } from "../../_utils/_constants"
// import { convertNormalOptions, queryParamsToString, sheetConfigBuilder } from "../../_utils/_handlers"
// import _ from 'lodash'
// import {
//     SHOW_ALERT,
//     LOADING,
//     SET_RECORDS,
//     SET_DIALOG,
//     HARD_REFRESH,
//     MODIFY_RECORDS,
//     LOADED,
//     RESET_RECORDS
// } from './type'
// import ApiBuilder from '../../_utils/_apiBuilder'
// // import { collection } from "../../_utils/classes/collection"
// import { ACTION_LIST, OPERATIONS_LIST } from "../../_utils/_dataset"
// import { BaseAnalysisFn } from "../../_utils/classes/Base"
// import moment from 'moment'
// import Axios from "axios"

// export const fetchTableOptions = (options, callback, showLoader = true) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let sheetId = options.sheetData && options.sheetData.rows && options.sheetData.rows.length ? options.sheetData.rows[0].id : ""
//         if(options.sheet) {
//             sheetId = options.sheet
//         }
//         let FETCHED_DATA = await fetchScripData({...options, sheetId}, store(), dispatch);
//         let key = convertNormalOptions(options)
//         // if (store().records && store().records[options.parentRoute] && store().records[options.parentRoute][key]) {
//         //     let data = store().records[options.parentRoute][key]
//         //     dispatch({
//         //         type: LOADED
//         //     })
//         //     return callback({ data: data })
//         // }
//         if (showLoader) {
//             dispatch({
//                 type: LOADING
//             })
//         }
//         let queryParams = {}
//         if (options.pageNumber) {
//             queryParams = { ...queryParams, pageNumber: options.pageNumber}
//         }
//         queryParams = queryParamsToString(queryParams)

//         let responsePayload = {}

//         let sheetDataValues = options.sheetData && options.sheetData.rows ? (options.sheet ? _.find(options.sheetData.rows, { id: options.sheet }) : options.sheetData.rows[0]) : {}
//         let analysedData = BaseAnalysisFn({
//             sheetConfig: sheetDataValues || {},
//             sheetData: options.sheetData || [],
//             ScripRows: FETCHED_DATA.scripList && FETCHED_DATA.scripList.adjusted ? FETCHED_DATA.scripList.adjusted : [],
//             initialIndex: (FETCHED_DATA.initialIndex || FETCHED_DATA.nearestIndex) ? (FETCHED_DATA.initialIndex || FETCHED_DATA.nearestIndex) : 0,
//             OHLCParam: options.baseType || 4,
//             bonusList: FETCHED_DATA.bonusList || [],
//             LatestScripRows: FETCHED_DATA.scripList && FETCHED_DATA.scripList.latest ? FETCHED_DATA.scripList.latest : [],
//             props: store().records && store().records.hypotheticalProps ? store().records.hypotheticalProps : {},
//             historicalConfig: store().records && store().records.historicalConfig ? store().records.historicalConfig : {}
//         })

//         responsePayload.data = {
//             data: {
//                 head: analysedData.formattedHead,
//                 originalHead: analysedData.originalHead,
//                 rows: analysedData.formattedData,
//                 hidden: sheetDataValues ? sheetDataValues.hiddenHead : [],
//                 dateMap: FETCHED_DATA.scripList.indexing ? FETCHED_DATA.scripList.indexing.reverse() : [],
//                 bonusList: FETCHED_DATA.bonusList || [],
//                 baseTable: analysedData.baseTable || {},
//                 metrics: analysedData.metrics || {}
//             }
//         }

//         dispatch({
//             type: SET_RECORDS,
//             subtype: options.parentRoute,
//             payload: {
//                 type: key,
//                 data: responsePayload.data
//             }
//         })
//         return callback(responsePayload)
//     }
//     catch (error) {
//         console.error("Fetch Records: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const fetchRecords = (options, callback, showLoader = true) => async (dispatch, store) => {
//     try {
//         let { operationType, routeType } = options
//         // let key = convertNormalOptions(_.omit(options, ["operationType", "routeType"]))
//         let key = convertNormalOptions(_.omit(options, ["routeType"]))
//         if (store().records && store().records[options.routeType] && store().records[options.routeType][key]) {
//             let data = store().records[options.routeType][key]
//             return callback(data)
//         }
//         if (showLoader) {
//             dispatch({
//                 type: LOADING
//             })
//         }

//         let queryParams = {}
//         let { pageNumber, search, scripId, list, media, startDate, endDate, reportType } = options
//         queryParams = { pageNumber, search, scripId, startsWith: list, media, startDate, endDate, reportType: reportType }
//         queryParams = _.pickBy(queryParams, e => !_.isUndefined(e) && !_.isNull(e))

//         // to find the related category for the API to fetch all the sheets
//         if (["sheets"].indexOf(options.routeType) > -1) {
//             let childRouteKey = _.findKey(CONSTANTS.childRoutes, e => e === options.childRoute)
//             if(childRouteKey === undefined) {
//                 childRouteKey = _.findKey(CONSTANTS.analyticRoutes, e => e === options.childRoute)
//             }
//             queryParams = {
//                 category: CONSTANTS.category_list[childRouteKey]['index'],
//                 scripId: options.scripId
//             }
//         }
//         queryParams = queryParamsToString(queryParams)

//         let apiInstance = new ApiBuilder(`${API_CONSTANTS[routeType][operationType]}${queryParams ? `?${queryParams}` : ""}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         let responsePayload = {}
//         if(!options.multiple) {
//             responsePayload = await apiInstance.fetchOneOrAll()
//         }
//         else {
//             let requestParams = _.map(options.routeType, o => {
//                 return { type: "GET", slug: slugBuilder(API_CONSTANTS[o], options) }
//             })
//             let currentPayload = await apiInstance.multipleRequests(requestParams)
//             _.map(options.routeType, (o, i) => {
//                 responsePayload.data = {...responsePayload.data, [o]: currentPayload[i].data}
//             })
//         }

//         dispatch({
//             type: SET_RECORDS,
//             subtype: options.routeType,
//             payload: {
//                 type: key,
//                 data: responsePayload.data
//             }
//         })

//         callback(responsePayload.data || {})
//     }
//     catch(error) {
//         console.error("Fetch Records: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const addNewSheet = (options, params, callback) => async (dispatch, store) => {
//     let key = convertNormalOptions(options)
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let p = { childRoute: params.childRoute, payload: params.payload }
//         if(params.operationType === ACTION_LIST.EDIT && params.freshOptions.sheet) {
//             p['id'] = params.freshOptions.sheet
//         }
//         let sheetPayload = sheetConfigBuilder({...p})
//         let apiInstance = new ApiBuilder(`${API_CONSTANTS[params.routeType][CONSTANTS.operation.EDIT]}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         let sheetResponse = await apiInstance.post({...sheetPayload})

//         let sheetKeys = Object.keys(store().records.sheets)
//         let sheetBaseKey = _.find(sheetKeys, e => e.startsWith(key) ? e : '')
//         let reduxPayload = {}
//         if(sheetBaseKey) {
//             reduxPayload = store().records.sheets[sheetBaseKey]
//         }
//         if (params.operationType === ACTION_LIST.EDIT) {
//             let findRowIndex = _.findIndex(reduxPayload.rows, { id: sheetResponse.data.id })
//             if(findRowIndex > -1) {
//                 reduxPayload.rows[findRowIndex] = sheetResponse.data
//             }
//         }
//         else {
//             reduxPayload.rows.push(sheetResponse.data)
//             reduxPayload.count = reduxPayload.count + 1
//         }

//         dispatch({
//             type: HARD_REFRESH
//         })

//         dispatch({
//             type: SET_RECORDS,
//             subtype: params.routeType,
//             payload: {
//                 type: sheetBaseKey,
//                 data: reduxPayload
//             }
//         })
//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Post Records: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const addEditMedia = (options, callback) => async (dispatch, store) => {
//     try {
//         let { operationType, routeType } = options

//         let payload = {
//             data: options.data.note,
//             date: options.data.date,
//             scripId: options.scripId
//         }
//         if (operationType === CONSTANTS.operation.EDIT) {
//             payload.id = options.data.id
//         }

//         if(routeType === CONSTANTS.childRoutes.documents) {
//             payload = new FormData();
//             payload.append("file", options.data.file.binary)
//             payload.append("data", JSON.stringify({
//                 scripId: options.scripId,
//                 date: options.data.date,
//                 name: options.data.name || `Doc-${options.data.date}`
//             }))
//         }
//         dispatch({
//             type: LOADING
//         })
//         let apiInstance = new ApiBuilder(API_CONSTANTS[routeType][operationType], {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         let responsePayload = await apiInstance.post(payload)
//         let key = convertNormalOptions(_.omit(options, ["data", "mediaType", "routeType", "operationType"]))
//         let explicitType = ''
//         if(responsePayload.data) {
//             let resourceKeys = Object.keys(store().records["scripDetails"])
//             let resourceBaseKey = _.find(resourceKeys, e => e.includes(key) ? e : '')
//             let reduxPayload = {}

//             if(resourceBaseKey) {
//                 explicitType = 'scripDetails'
//                 reduxPayload = store().records['scripDetails'][resourceBaseKey]
//             }
//             if (operationType === CONSTANTS.operation.EDIT) {
//                 let findRowIndex = _.findIndex(reduxPayload.media, { id: responsePayload.data.id })
//                 if(findRowIndex > -1) {
//                     reduxPayload.media[findRowIndex] = responsePayload.data
//                 }
//             }
//             else {
//                 console.log(reduxPayload)
//                 if(reduxPayload && reduxPayload.media) {
//                     reduxPayload.media.push(responsePayload.data)
//                 }
//             }

//             dispatch({
//                 type: HARD_REFRESH
//             })

//             dispatch({
//                 type: SET_RECORDS,
//                 subtype: explicitType || routeType,
//                 payload: {
//                     type: resourceBaseKey,
//                     data: reduxPayload
//                 }
//             })
//         }

//         if(routeType === CONSTANTS.childRoutes.documents) {
//             dispatch({
//                 type: SHOW_ALERT,
//                 message: "Document uploaded successfully",
//                 variant: "success"
//             })
//             dispatch({
//                 type: MODIFY_RECORDS,
//                 subtype: CONSTANTS.childRoutes.documents,
//                 payload: {
//                     data: {}
//                 }
//             })
//         }
//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Post Media: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const pushDialogOptions = options => async dispatch => {
//     dispatch({
//         type: SET_DIALOG,
//         payload: options
//     })
// }

// export const deleteHandler = (options, callback) => async (dispatch, store) => {
//     try {
//         let { operationType, routeType } = options
//         let pload = {}
//         dispatch({
//             type: LOADING
//         })
//         let queryParams = {}
//         if(options.sheetId) {
//             queryParams = { ...queryParams, sheetId: options.sheetId }
//             pload = {
//                 key: "sheets",
//                 value: options.sheetId
//             }
//         }
//         if(options.documentId) {
//             queryParams = { ...queryParams, id: options.documentId }
//             pload = {
//                 key: CONSTANTS.childRoutes.documents,
//                 value: options.documentId
//             }
//         }
//         if(_.isEmpty(queryParams)) {
//             throw Error("Undefined Params")
//         }
//         queryParams = queryParamsToString(queryParams)
//         let key = convertNormalOptions(_.omit(options, ["sheetId", "operationType", "routeType", "documentId"]))

//         let apiInstance = new ApiBuilder(`${API_CONSTANTS[routeType][operationType]}${queryParams ? `?${queryParams}` : ""}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.delete()

//         let reducePayload = {}
//         if(routeType && pload.key) {
//             let resourceKey = Object.keys(store().records[pload.key])
//             let resourceBaseKey = ''
//             let reduxPayload = {}
//             if(pload.key === "sheets") {
//                 resourceBaseKey = _.find(resourceKey, e => e.startsWith(key) ? e : '')
//                 if(resourceBaseKey) {
//                     reduxPayload = store().records[pload.key][resourceBaseKey]
//                 }
//                 reduxPayload.rows = _.map(_.pickBy(reduxPayload.rows, e => e.id !== pload.value))
//                 reduxPayload.count = reduxPayload.count - 1

//                 reducePayload = {
//                     type: resourceBaseKey,
//                     data: reduxPayload
//                 }
//             }
//             else {
//                 resourceBaseKey = _.filter(resourceKey, e => e.includes(key) ? e : '')
//                 if(resourceBaseKey.length === 1) {
//                     reduxPayload = store().records[pload.key][resourceBaseKey[0]]
//                     reduxPayload.rows = _.map(_.pickBy(reduxPayload.rows, e => e.id !== pload.value))
//                     reduxPayload.count = reduxPayload.count - 1

//                     reducePayload = {
//                         type: resourceBaseKey[0],
//                         data: reduxPayload
//                     }
//                 }
//                 else if(resourceBaseKey.length > 1) {
//                     reduxPayload = _.pickBy(store().records[pload.key], (e, j) => {
//                         return !(resourceBaseKey.indexOf(j) > -1)
//                     })
//                     reducePayload = {
//                         data: reduxPayload
//                     }
//                 }
//             }

//             dispatch({
//                 type: MODIFY_RECORDS,
//                 subtype: routeType,
//                 payload: {...reducePayload}
//             })
//         }
//         else {
//             window.location.reload()
//         }
//         dispatch({
//             type: HARD_REFRESH
//         })
//         dispatch({
//             type: SHOW_ALERT,
//             message: "Deleted Successfully",
//             variant: "success"
//         })
//         callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Delete Handler: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const RecordRemarks = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })

//         let { operationType, routeType, payload: { data: remarks, scripDataId } } = options

//         let apiInstance = new ApiBuilder(`${API_CONSTANTS[routeType][operationType]}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.post({
//             remarks, scripDataId
//         })

//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: "scripData",
//             payload: {
//                 data: {}
//             }
//         })
//         dispatch({
//             type: HARD_REFRESH
//         })
//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Post Records: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const UpdateHead = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })

//         let pair = {}
//         let { operationType, routeType, data, match } = options

//         let sheetId = data && data.freshOptions && data.freshOptions.sheet ? data.freshOptions.sheet : (data.sheetData.rows.length ? data.sheetData.rows[0].id : "")
//         let sheetConfig = {}
//         if(sheetId) {
//             sheetConfig = _.find(data.sheetData.rows, { id: sheetId })
//         }
//         let values = []
//         values = sheetConfig.dynamicHead
//         let otherOptions = {}
//         switch(operationType) {
//             case ACTION_LIST.ADD_DURATION: {
//                 values = sheetConfig.dynamicHead
//                 pair = {
//                     key: "dynamicHead"
//                 }
//                 if(values.indexOf(options.payload.duration*1) > -1) {
//                     dispatch({
//                         type: SHOW_ALERT,
//                         message: "Duration already exist",
//                         variant: "error"
//                     })
//                     return;
//                 }

//                 values.push(options.payload.duration * 1)
//                 break
//             }
//             case ACTION_LIST.DELETE_DURATION: {
//                 values = sheetConfig.dynamicHead
//                 pair = {
//                     key: "dynamicHead"
//                 }
//                 values = values.filter(e => e !== options.payload.duration * 1)
//                 break;
//             }
//             case ACTION_LIST.UNHIDE: {
//                 values = sheetConfig.hiddenHead
//                 pair = {
//                     key: "hiddenHead"
//                 }
//                 values = values.filter(e => e !== options.payload.duration * 1)
//                 otherOptions.scripId = match.scripId
//                 break;
//             }
//             case ACTION_LIST.HIDE: {
//                 values = sheetConfig.hiddenHead
//                 pair = {
//                     key: "hiddenHead"
//                 }
//                 if(values.indexOf(options.payload.duration*1) > -1) {
//                     dispatch({
//                         type: SHOW_ALERT,
//                         message: "Duration already exist",
//                         variant: "error"
//                     })
//                     return;
//                 }
//                 otherOptions.scripId = match.scripId
//                 values.push(options.payload.duration * 1)
//                 break;
//             }
//             case ACTION_LIST.UNHIDE_ALL: {
//                 values = []
//                 pair = {
//                     key: "hiddenHead"
//                 }
//                 otherOptions.scripId = match.scripId
//                 break;
//             }
//             default: {}
//         }
//         values.sort(function (a, b) {
//             return a - b;
//         })
//         let apiInstance = new ApiBuilder(`${API_CONSTANTS[routeType][operationType]}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         let responsePayload = await apiInstance.post({
//             values,
//             sheetId,
//             ...otherOptions
//         })

//         let key = convertNormalOptions(match)
//         let resourceList = Object.keys(store().records.sheets)
//         let resourceKey = _.find(resourceList, e => e.includes(key) ? e : '')
//         let resourcePayload = store().records.sheets[resourceKey]
//         if(resourcePayload) {
//             resourcePayload.rows = resourcePayload.rows.map((o, i) => {
//                 if(o.id === sheetId) {
//                     return {
//                         // ...responsePayload.data,
//                         ...o,
//                         [pair.key]: values
//                     }
//                 }
//                 return {...o}
//             })
//         }
//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: routeType,
//             payload: {
//                 type: resourceKey,
//                 data: resourcePayload
//             }
//         })
//         dispatch({
//             type: HARD_REFRESH
//         })
//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Post Records: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const BonusOperationHandler = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let { operation, operationType } = options.payload
//         let { payload } = options
//         let requestPayload = {
//             type: _.find(OPERATIONS_LIST, { value: operation}).index,
//             subtype: operationType * 1 || 1,
//             scripId: options.match.scripId,
//             announcementDate: payload.announcementDate || moment().format("YYYY-MM-DD")
//         }
//         let errLoad = {}
//         switch(requestPayload.subtype) {
//             case 1: {
//                 requestPayload.config = {
//                     value1: payload.value1 * 1,
//                     value2: payload.value2 * 1,
//                     multiplier: (1 / (payload.value1 * 1 + payload.value2 * 1))
//                 }
//                 if(isNaN(requestPayload.config.value1) || isNaN(requestPayload.config.value2)) {
//                     errLoad = {
//                         hasError: true,
//                         message: "Please enter valid input"
//                     }
//                 }
//                 break
//             }
//             case 2: {
//                 requestPayload.config = {
//                     value: payload.operationValue2 * 1,
//                     multiplier: (payload.operationValue2 * 1 / 100)
//                 }
//                 if(isNaN(requestPayload.config.value)) {
//                     errLoad = {
//                         hasError: true,
//                         message: "Please enter valid input"
//                     }
//                 }
//                 break
//             }
//             case 3: {
//                 requestPayload.config = {
//                     value: payload.operationValue3 * 1,
//                     multiplier: 1
//                 }
//                 if(isNaN(requestPayload.config.value)) {
//                     errLoad = {
//                         hasError: true,
//                         message: "Please enter valid input"
//                     }
//                 }
//                 break
//             }
//             default: {}
//         }
//         if(errLoad.hasError) {
//             dispatch({
//                 type: LOADED
//             })
//             alert(errLoad.message)
//             return callback({
//                 hasError: true
//             })
//         }

//         // API Instance
//         let apiInstance = new ApiBuilder(`${API_CONSTANTS.scripDetails.addBonus}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.post({...requestPayload})

//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: 'scripData',
//             payload: {
//                 data: {}
//             }
//         })
//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: 'dashboard',
//             payload: {
//                 data: {}
//             }
//         })

//         dispatch({
//             type: HARD_REFRESH
//         })

//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Bonus Operation Err: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const AddScripAnalytics = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })

//         let { operationType, routeType, payload: { scripGroup: group, scripId, scripIndustry: industry } } = options
//         let payload = {
//             scripId, industry, group
//         }

//         if(routeType === CONSTANTS.routeType.report) {
//             payload = { scripId }
//         }

//         let apiInstance = new ApiBuilder(`${API_CONSTANTS[routeType][operationType]}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.post({ ...payload })

//         dispatch({
//             type: LOADED
//         })

//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: 'analyticsData',
//             payload: {
//                 data: {}
//             }
//         })
//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: CONSTANTS.routeType.analytics,
//             payload: {
//                 data: {}
//             }
//         })

//         dispatch({
//             type: HARD_REFRESH
//         })

//         callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Add Analytics Err: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.data.error || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const RemoveAnalyticsScrip = (options, callback) => async (dispatch, store) => {
//     try {
//         let { operationType, routeType, payload: { scripId } } = options
//         dispatch({
//             type: LOADING
//         })
//         let queryParams = { scripId }
//         if(_.isEmpty(queryParams)) {
//             throw Error("Undefined Params")
//         }
//         queryParams = queryParamsToString(queryParams)

//         let url = 'stock/update/report'
//         let bool = true
//         if(routeType === CONSTANTS.routeType.analytics) {
//             bool = false
//             url = `${API_CONSTANTS[routeType][operationType]}${queryParams ? `?${queryParams}` : ""}`
//         }

//         let apiInstance = new ApiBuilder(`${url}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         if(!bool) {
//             await apiInstance.delete()
//         }
//         else {
//             await apiInstance.post({...options.payload})
//         }

//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: "analyticsData",
//             payload: {
//                 data: {}
//             }
//         })
//         dispatch({
//             type: HARD_REFRESH
//         })
//         dispatch({
//             type: SHOW_ALERT,
//             message: !bool ? "Deleted Successfully" : "Updated Successfully",
//             variant: "success"
//         })
//         callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Delete Handler: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const ShareDocumentOverEmail = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let { payload: { email, id: mediaId } } = options
//         let slug = `stock/documents/share`
//         let message = "Document Sent Successfully"
//         let payload = {
//             email, mediaId
//         }
//         if(options.payload.reportId) {
//             slug = `report/share`
//             payload = {
//                 email,
//                 reportId: mediaId,
//                 type: options.payload.type
//             }
//             if(options.query) {
//                 if(options.query.industry) { payload['industry'] = options.query.industry }
//                 if(options.query.group) { payload['group'] = options.query.group }
//             }
//             message = "Report Sent Successfully"
//         }
//         let apiInstance = new ApiBuilder(slug, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.post({...payload})

//         dispatch({
//             type: SHOW_ALERT,
//             message,
//             variant: "success"
//         })

//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Send Document Handler: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const UploadExcel = ({type, ...options}, callback) => async (dispatch, store) => {
//     try {
//         let formData = new FormData()
//         let URL = `stock/update-scrip-data`
//         if(!options.payload.file.binary) {
//             throw Error("File Not Present")
//         }
//         if(type === ACTION_LIST.UPLOAD_EXCEL && !options.match.scripId) {
//             throw Error("Some unknown error occurred")
//         }

//         formData.append("file", options.payload.file.binary)
//         if(type === ACTION_LIST.UPLOAD_EXCEL) {
//             URL = `stock/documents/upload/json`
//             formData.append("data", JSON.stringify({scripId: options.match.scripId}))
//         }

//         let apiInstance = new ApiBuilder(`${URL}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })

//         await apiInstance.post(formData)

//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: "scripData",
//             payload: {
//                 data: {}
//             }
//         })

//         dispatch({
//             type: HARD_REFRESH
//         })

//         dispatch({
//             type: SHOW_ALERT,
//             message: "Data Uploaded Successfully",
//             variant: "success"
//         })

//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Upload Excel Handler: ", error)
//         let message = "Some error occurred, please try again"
//         let bool = true
//         if(_.isString(error.data.error)) {
//             message = error.data.error
//             bool = false
//         }
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message
//         })

//         let t;
//         if(error && error.data && error.data.error && error.data.error.timestamp) {
//             t = Object.values(error.data.error.timestamp).map(e => {
//                 let d = moment(e).format();
//                 let actual = moment(e);
//                 if(/(23:59:50\+05:30)/.test(d)) {
//                     actual.add("10", "seconds")
//                 }
//                 return actual.format("DD-MMM-YYYY");
//             }).join(", ")
//         }

//         return callback({
//             hasError: true,
//             error: !bool ? '' : (!t ? `Data invalid in current file` : `Data invalid for following timestamp: ${t}`)
//         })
//     }
// }

// export const FetchReportDetails = (options, callback) => async (dispatch, store) => {
//     try {
//         let qp = queryParamsToString(options)
//         let apiInstance = new ApiBuilder(`report/details?${qp}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })

//         let reportDetails = await apiInstance.fetchOneOrAll()

//         return callback({...reportDetails})
//     }
//     catch(error) {
//         console.error("Fetch Report Handler: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const UpdateHomeData = callback => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let apiInstance = new ApiBuilder(`stock/evaluate`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         let response = await apiInstance.post()
//         console.log(response)
//         dispatch({
//             type: RESET_RECORDS,
//             payload: {}
//         })
//         callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Fetch Home Data: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// const fetchScripData = (params, store, dispatch) => new Promise(async (resolve, reject) => {
//     let { startDate, endDate, baseType, sheetId } = params
//     let filters = _.pickBy({ startDate, endDate, baseType, sheetId })
//     filters.baseType = filters.baseType * 1 || 4
//     let key = convertNormalOptions({
//         scripId: params.scripId,
//         scriptData: "scripData",
//         ...filters
//     })
//     if(store.records.scripData && store.records.scripData[key]) {
//         resolve(store.records.scripData[key])
//         return
//     }

//     let queryP = !_.isEmpty(filters) ? queryParamsToString({...filters}) : ""
//     let url = 'stock/history?scripId=' + params.scripId + (queryP ? ('&' + queryP) : "")
//     let keyStore = 'scripData'

//     if(params.parentRoute === CONSTANTS.routeType.analytics) {
//         url = 'stock/analytics/all' + (queryP ? ('?' + queryP) : "")
//         keyStore = 'analyticsData'
//     }

//     try {
//         let apiInstance = new ApiBuilder(url, {
//             headers: {
//                 authorization: store.auth.token
//             }
//         })
//         let historyResponse = await apiInstance.fetchOneOrAll()

//         dispatch({
//             type: SET_RECORDS,
//             subtype: keyStore,
//             payload: {
//                 type: key,
//                 data: historyResponse.data
//             }
//         })
//         resolve(historyResponse.data)
//     }
//     catch(error) {
//         reject(error)
//     }
// })

// const slugBuilder = (type, options) => {
//     switch(type) {
//         case API_CONSTANTS.scripDetails: {
//             return `${API_CONSTANTS.scripDetails}?scripId=${options.scripId}&media=true`
//         }
//         case API_CONSTANTS.sheets: {
//             let childRouteKey = -1
//             if ([..._.map(CONSTANTS.childRoutes)].indexOf(options.childRoute) > -1) {
//                 childRouteKey = _.findKey(CONSTANTS.childRoutes, e => e === options.childRoute)
//             }
//             return `${API_CONSTANTS.sheets}?category=${CONSTANTS.category_list[childRouteKey]['index']}`
//         }
//         default: {}
//     }
//     return {}
// }

// export const SetHypotheticalProps = (data, callback) => async (dispatch, store) => {
//     try {
//         if(_.isEmpty(data)) {
//             dispatch({
//                 type: MODIFY_RECORDS,
//                 subtype: 'hypotheticalProps',
//                 payload: {
//                     data: {}
//                 }
//             })
//             return callback({
//                 hasError: false
//             });
//         }
//         dispatch({
//             type: SET_RECORDS,
//             payload: {
//                 type: 'hypotheticalProps',
//                 data
//             }
//         })
//         dispatch({
//             type: HARD_REFRESH
//         })
//         return callback({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error(error)
//         dispatch({
//             type: SHOW_ALERT,
//             message: "Some error occurred"
//         })
//         return callback({
//             hasError: true
//         })
//     }
// }

// export const toggleDrawer = () => async (dispatch, store) => {
//     let drawer = store().auth.toggleDrawer
//     dispatch({
//         type: 'DRAWER',
//         payload: {
//             toggleDrawer: drawer ? false : true
//         }
//     })
// }

// export const AddEditStockHandler = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let formData = {}
//         let url = 'add'
//         let meta = { message: "Successfully Added" }

//         if(options.operation === CONSTANTS.operation.ADD) {
//             formData = new FormData()
//             options.operationType = options.operationType*1
//             formData.append("file", options.file && options.file.binary ? options.file.binary : "")
//             if(typeof options.reportType === "string") {
//                 options.reportType = {
//                     title: options.reportType
//                 }
//             }
//             formData.append("data", JSON.stringify({..._.omit(options, ["file", "operation", "errorMessage", "scripTypeList"])}))
//         }
//         else if (options.operation === CONSTANTS.operation.SEARCH) {
//             url = 'update/report'
//             formData = _.pick(options, ["reportType"])
//             formData.id = options.id
//             meta.message = "Successfully Added"
//         }
//         else {
//             url = 'edit'
//             const reg = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
//             if(reg.test(options.reportType)) {
//                 options.reportType = {
//                     value: options.reportType,
//                     title: options.reportType
//                 }
//             }
//             else if(typeof options.reportType === "string") {
//                 options.reportType = {
//                     title: options.reportType
//                 }
//             }
//             formData = _.pick(options, ["scripName", "scripGroup", "scripIndustry", "reportType", "shortName", "exchange"])
//             formData.id = options.id
//             meta.message = "Successfully Updated"
//         }

//         let apiInstance = new ApiBuilder(`stock/${url}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         let response = await apiInstance.post(formData)
//         if(response) {
//             dispatch({
//                 type: MODIFY_RECORDS,
//                 subtype: CONSTANTS.routeType.dashboard,
//                 payload: {}
//             })
//             dispatch({
//                 type: MODIFY_RECORDS,
//                 subtype: "scripDetails",
//                 payload: {}
//             })
//             dispatch({
//                 type: HARD_REFRESH
//             })
//             dispatch({
//                 type: SHOW_ALERT,
//                 variant: "success",
//                 message: meta.message
//             })
//             if (options.operation === CONSTANTS.operation.SEARCH) {
//                 dispatch({
//                     type: MODIFY_RECORDS,
//                     subtype: 'analyticsData',
//                     payload: {
//                         data: {}
//                     }
//                 })
//                 dispatch({
//                     type: MODIFY_RECORDS,
//                     subtype: CONSTANTS.routeType.analytics,
//                     payload: {
//                         data: {}
//                     }
//                 })
//             }
//             return callback({
//                 hasError: false,
//                 message: (response.data ? response.data.response : 0) || response.renderMessage || response.globalMessage || "Some error occurred, please try again"
//             })
//         }
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (response.data ? response.data.response : 0) || response.renderMessage || response.globalMessage || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true,
//             message: (response.data ? response.data.response : 0) || response.renderMessage || response.globalMessage || "Some error occurred, please try again"
//         })
//     }
//     catch(error) {
//         console.error("Stock Data: ", error)
//         let message = "Some error occurred, please try again"
//         let bool = true
//         if(error.data.error && _.isString(error.data.error)) {
//             message = error.data.error
//             bool = false
//         }
//         if (_.isEmpty(error.data)) {
//             bool = false
//             message = error.data?.error || "Some error occurred, please try again"
//         }
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: bool ? `Invalid Data - Please check the file` : message
//         })
//         return callback({
//             hasError: true,
//             message: bool ? `Data Not present for following timestamp: ${Object.values(error.data.error.timestamp).map(e => new Date(e).toLocaleDateString()).join(", ")}` : message
//         })
//     }
// }

// export const DeleteStockHandlerFn = options => async (dispatch, store) => new Promise(async (resolve, reject) => {
//     dispatch({
//         type: LOADING
//     })

//     try {
//         if(!options.id) {
//             dispatch({
//                 type: SHOW_ALERT,
//                 message: "Please try again",
//                 variant: "error"
//             })
//             return reject({
//                 hasError: true,
//                 message: "ID not present"
//             })
//         }
//         let apiInstance = new ApiBuilder(`stock/delete/?id=${options.id}`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.delete()
//         dispatch({
//             type: SHOW_ALERT,
//             message: "Successfully Deleted",
//             variant: "success"
//         })
//         return resolve({
//             hasError: false
//         })
//     }
//     catch(error) {
//         console.error("Delete Stock Handler: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return reject({
//             hasError: true
//         })
//     }
// })

// export const DefaultExportTable = options => async (dispatch, store) => new Promise(async (resolve, reject) => {
//     dispatch({
//         type: LOADING
//     })

//     try {
//         let formData = {}
//         formData['data'] = JSON.stringify(options.data)

//         Axios.post(`stock/default-export`, formData, {
//             responseType: 'arraybuffer',
//             headers: {
//                 authorization: localStorage.getItem(process.env.REACT_APP_TOKEN)
//             }
//         }).then(response => {
//             const url = window.URL.createObjectURL(new Blob([response.data, { type: "application/vnd.ms-excel" }]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${options.type}-${new Date().toLocaleDateString()}.xlsx`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove()

//             dispatch({
//                 type: LOADED
//             })
//             return resolve({
//                 hasError: false
//             })
//         }).catch(error => {
//             dispatch({
//                 type: LOADED
//             })
//         })
//     }
//     catch(error) {
//         console.error("Export Handler: ", error)
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: (error.data ? error.data.error : 0) || error.renderMessage || error.globalMessage || "Some error occurred, please try again"
//         })
//         return reject({
//             hasError: true
//         })
//     }
// })

// export const FetchScripTypeList = callback => async (dispatch, store) => {
//     if(!store().auth.token) {
//         return;
//     }
//     dispatch({
//         type: LOADING
//     })
//     try {
//         const response = await Axios.get(`stock/scrip-type-list`, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })

//         let formattedData = _.map(response.data.data, d => {
//             return {
//                 title: d.name,
//                 value: d.id,
//                 name: d.name
//             }
//         });

//         dispatch({
//             type: LOADED
//         })
//         return callback({
//             hasError: false,
//             data: formattedData
//         })
//     }
//     catch (error) {
//         dispatch({
//             type: LOADED
//         })
//         dispatch({
//             type: SHOW_ALERT,
//             variant: "error",
//             message: error.message || error?.data?.message || "Some error occurred, please try again"
//         })
//         return callback({
//             hasError: true,
//             error
//         })
//     }
// }

// export const setHistoricalConfig = data => async (dispatch, store) => {
//     dispatch({
//         type: LOADING
//     })
//     dispatch({
//         type: SET_RECORDS,
//         payload: {
//             type: 'historicalConfig',
//             data
//         }
//     })
//     dispatch({
//         type: HARD_REFRESH
//     })
// }
