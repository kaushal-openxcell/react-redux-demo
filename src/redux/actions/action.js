import { REDUX_ACTIONS_TYPES } from "./types";

export function register(values) {
    return {
        type: REDUX_ACTIONS_TYPES.REGISTER,
        payload: values,
    };
}

export function login(values) {
    return {
        type: REDUX_ACTIONS_TYPES.LOGIN,
        payload: values,
    }
}

export function logout() {
    return {
        type: REDUX_ACTIONS_TYPES.LOGOUT
    }
}

export function addPost(values) {
    return {
        type: REDUX_ACTIONS_TYPES.POST.CREATE,
        payload: values,
    }
}

export function setOtp(values) {
    return {
        type: REDUX_ACTIONS_TYPES.OTP.SET,
        payload: values,
    }
}

export function resentOtp(values) {
    return {
        type: REDUX_ACTIONS_TYPES.OTP.REGENERATE,
        payload: values,
    }
}

export function verifyOtp(values) {
    return {
        type: REDUX_ACTIONS_TYPES.OTP.VERIFY,
        payload: values,
    }
}

export function resetPassword(values) {
    return {
        type: REDUX_ACTIONS_TYPES.PASSWORD.RESET,
        payload: values,
    }
}

export function changePassword(values) {
    return {
        type: REDUX_ACTIONS_TYPES.PASSWORD.CHANGE,
        payload: values,
    }
}

export function updateProfile(values) {
    return {
        type: REDUX_ACTIONS_TYPES.UPDATE_PROFILE,
        payload: values,
    }
}

export function removeError() {
    return {
        type: REDUX_ACTIONS_TYPES.REMOVE_ERROR,
    }
}
