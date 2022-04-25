import {combineReducers} from 'redux'
import counterReducer from './counterReducer'
import loginReducer from './LoginReducer'
import cartReducer from './cartReducer'

export default combineReducers({
    count: counterReducer,
    login: loginReducer,
    cart: cartReducer
})