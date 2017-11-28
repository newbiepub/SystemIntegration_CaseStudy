import {ACCOUNT} from "../constant/constant";

function loginAction(payload) {
    return {
        type: ACCOUNT.LOGIN,
        payload
    }
}

function logoutAction () {
    return {
        type: ACCOUNT.LOGOUT
    }
}

export function login(user) {
    return (dispatch, getState) => {
        dispatch(loginAction(user));
    }
}

export function logout() {
    return (dispatch, getState) => {
        dispatch(logoutAction());
    }
}