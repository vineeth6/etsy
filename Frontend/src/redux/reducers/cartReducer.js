import {ADDTOCART} from '../actions/index'

const initState = {
    cartDetails:[]
}

function cartReducer(state=initState, action){
    switch(action.type){
        case ADDTOCART:
            console.log("inside")
            console.log(action.payload)
            console.log(state.cartDetails)
            return Object.assign({}, state, {
                cartDetails: state.cartDetails.concat(action.payload)
              });

        default:
            return state
    }
}

export default cartReducer

