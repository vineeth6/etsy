export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADDTOCART ='ADDTOCART'

export function incrementCount(){
    return {
        type: INCREMENT
    }
}

export function decrementCount(){
    return {
        type: DECREMENT
    }
}

export function login(payload){
    return {
        type: LOGIN,
        payload
    }
}

export function logout(){
    console.log("inside logout")
    return{
        type: LOGOUT
    }
}

export function AddToCart(payload){
    return {
        type: ADDTOCART,
        payload
    }
}

