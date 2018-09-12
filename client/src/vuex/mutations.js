// src/vuex/mutation.js
import * as types from './mutation-types'

export default {
    [types.UID] (state, uid) {
        state.uid = uid
    },
    [types.ERROR_STATE] (state, errorState) {
        state.errorState = errorState
    },
    [types.IS_AUTH] (state, isAuth) {
        state.isAuth = isAuth
    }
}
