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
export const getCartThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/cart/${id}`)
    const data = await response.json()
    dispatch(getCart(data))
    return data
}



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
            newState = {...state}
            action.payload.cart.forEach(items => {
                newState.cart = items
            })
            return newState
        
        default:
            return state;
    }
}