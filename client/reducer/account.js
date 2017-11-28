import {ACCOUNT} from "../constant/constant";

const initialState = {
    user: {}
};

function accountReducer (initialState) {
    return function accountReducerFn(state = initialState, action = {}) {
        switch (action.type) {
            case ACCOUNT.LOGIN: {
                return {
                    user: action.payload
                }
            }
            case ACCOUNT.LOGOUT: {
                return initialState;
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}

export default accountReducer(initialState);