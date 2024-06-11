import { 
    LOGOUT, 
    SHOW_ALERT,
    LOADING,
    SET_AUTH_SESSION
} from "./type"
import ApiBuilder from '../../_utils/_apiBuilder'

export const userLogin = (payload = {}, callback) => async (dispatch, store) => {
    try {
        dispatch({
            type: LOADING
        })

        let loginPayload = {
            email: payload.email,
            password: payload.password
        }
        let apiInstance = new ApiBuilder(`login`)
        let response = await apiInstance.post({
            ...loginPayload
        })
        if(response) {
            const responsePayload = {
                token: response.data && response.data.token ? response.data.token : ""
            }
            // const responsePayload = payloadOrganizer(response.data && response.data.token ? response.data.token : "", response)
            dispatch({
                type: SET_AUTH_SESSION,
                payload: responsePayload
            })
            localStorage.setItem(process.env.REACT_APP_TOKEN, responsePayload.token)
            dispatch({
                type: SHOW_ALERT,
                message: "Logged In Successfully",
                variant: "success"
            })
            return callback({
                ...responsePayload,
                hasError: false
            })
        }
        return callback({
            hasError: true
        })
    }
    catch(e) {
        dispatch({
            type: SHOW_ALERT,
            message: e.renderMessage || e.globalMessage || "Some error occurred, please try again"
        })
        return callback(e)
    }
}

export const forgotPassword = (payload = {}, callback) => async (dispatch, store) => {
    try {
        dispatch({
            type: LOADING
        })

        let apiInstance = new ApiBuilder(`login/forgot-password/otp/send?email=${payload.email}`)
        let response = await apiInstance.fetchOneOrAll()
        if(response) {
            const responsePayload = {
                otpSessionId: response.data && response.data.otpSessionId ? response.data.otpSessionId : ""
            }
            // const responsePayload = payloadOrganizer(response.data && response.data.token ? response.data.token : "", response)
            dispatch({
                type: SET_AUTH_SESSION,
                payload: responsePayload
            })
            dispatch({
                type: SHOW_ALERT,
                message: "OTP Sent Successfully",
                variant: "success"
            })
            return callback({
                ...responsePayload,
                hasError: false
            })
        }
        return callback({
            hasError: true
        })
    }
    catch(e) {
        dispatch({
            type: SHOW_ALERT,
            message: e.renderMessage || e.globalMessage || "Some error occurred, please try again"
        })
        return callback(e)
    }
}

export const resetPassword = (payload = {}, callback) => async (dispatch, store) => {
    try {
        dispatch({
            type: LOADING
        })

        if(payload.password != payload['confirm-password']) {
            dispatch({
                type: SHOW_ALERT,
                message: "Password doesn't match"
            })
            return callback({
                hasError: true
            })
        }

        let { otpSessionId, otp, password: newPassword } = payload
        let apiInstance = new ApiBuilder(`login/forgot-password/reset`)
        await apiInstance.post({
            otpSessionId, otp, newPassword
        })
        dispatch({
            type: SHOW_ALERT,
            message: "Password reset successfully"
        })
        return callback({
            hasError: false
        })
    }
    catch(e) {
        dispatch({
            type: SHOW_ALERT,
            message: e.renderMessage || e.globalMessage || "Some error occurred, please try again"
        })
        return callback(e)
    }
}

export const loadUser = (callback, showLoader = true) => async (dispatch, store) => {
    try {
        let token = localStorage.getItem(process.env.REACT_APP_TOKEN)
        if(!token) {
            return callback(false)
        }
        if(showLoader) {
            dispatch({
                type: LOADING
            })
        }
        const apiInstance = new ApiBuilder(`login/me`, {
            headers: {
                Authorization:`${token}`
            }
        })
        const response = await apiInstance.fetchOneOrAll()

        dispatch({
            type: SET_AUTH_SESSION,
            payload: {
                token,
                data: response
            }
        })
        return callback({token})
    }
    catch(e) {
        // localStorage.removeItem(process.env.REACT_APP_TOKEN)
        dispatch({
            type: SHOW_ALERT,
            variant: "error",
            message: e.renderMessage || e.globalMessage || "Some error occurred, please try again"
        })
        return callback(e)
    }
}

export const logoutHandler = () => async (dispatch, store) => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN)
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: SHOW_ALERT,
        message: "Logout Successfully",
        variant: "success"
    })
}