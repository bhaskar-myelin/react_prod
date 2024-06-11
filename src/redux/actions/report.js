// import ApiBuilder from "../../_utils/_apiBuilder"
// import { API_CONSTANTS, CONSTANTS } from "../../_utils/_constants"
// import { HARD_REFRESH, LOADING, MODIFY_RECORDS, SHOW_ALERT } from "./type"

// export const ChangeReportStatus = (options, callback) => async (dispatch, store) => {
//     try {
//         dispatch({
//             type: LOADING
//         })
//         let payload = {
//             reportId: options.id,
//             status: options.type
//         }
//         let apiInstance = new ApiBuilder(API_CONSTANTS.report.changeStatus, {
//             headers: {
//                 authorization: store().auth.token
//             }
//         })
//         await apiInstance.post({...payload})
//         dispatch({
//             type: MODIFY_RECORDS,
//             subtype: CONSTANTS.routeType.report,
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
//         console.error("Change Report Status Err: ", error)
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
