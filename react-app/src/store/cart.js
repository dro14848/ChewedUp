const CREATE_CART = 'cart/createCart'
const GET_CART = 'cart/getCart'

const createCart = (cart) => ({
    type:CREATE_CART,
    payload: cart
})

const getCart = (cart) => ({
    type:GET_CART,
    payload: cart
})

//THUNKS




//initialState
const initialState = {
    Cart:{}
}

//Recuer
export const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case CREATE_CART:

        case GET_CART:
        
        default:
            return state;
    }
}