import {LOGIN,LOGOUT} from '../actions/index'

const initState = {
    username:"",
    auth:false
}

function loginReducer(state=initState, action){
    switch(action.type){
        case LOGIN:
            return Object.assign({}, state, {
                username:action.payload.username,
                auth:true
              })

        case LOGOUT:
            return Object.assign({}, state, {
                username:"",
                auth:false
              })

        default:
            return state
    }
}

export default loginReducer