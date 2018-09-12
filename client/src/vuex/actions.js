// src/vuex/actions.js
import {UID, IS_AUTH, ERROR_STATE} from './mutation-types'
import api from '../services'

let setUID = ({commit}, data) => {
    commit(UID, data)
}

let setErrorState = ({commit}, data) => {
    commit(ERROR_STATE, data)
}

let setIsAuth = ({commit}, data) => {
    commit(IS_AUTH, data)
}

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
let processResponse = (store, loginResponse) => {
    switch (loginResponse) {
        case 'noAuth':
            setErrorState(store, 'Wrong ID or Password')
            setIsAuth(store, false)
            break
        case 'done':
            setErrorState(store, 'No period')
            setIsAuth(store, false)
            break
        default:
            setUID(store, loginResponse.UID)
            setErrorState(store, '')
            setIsAuth(store, true)
    }
}

export default {
    async login (uid, password) {
        try {
            const getUserInfoPromise = await getUserInfo(uid, password)
            const isFinishedPromise = await isFinished(uid)
            const [userInfoResponse, isFinishedResponse] = await Promise.all([getUserInfoPromise, isFinishedPromise])
            if (userInfoResponse.data.length === 0) return 'noAuth'
            if (isFinishedResponse.data[0].CNT > 0) return 'done'
            axios.defaults.headers.common['Authorization'] = userInfoResponse.jwt // Json Web Token을 request header에 넣는다
            return userInfoResponse
        } catch (err) {
            console.error(err)
        }
    }
}