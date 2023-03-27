const CREATE_CART = 'cart/createCart'
const GET_CART = 'cart/getCart'
const ADD_ITEM = 'cart/addItem'
const DELETE_ITEM = 'cart/deleteItem'
const CLEAR_CART = 'cart/clearCart'

const createCart = (cart) => ({
    type:CREATE_CART,
    payload: cart
})

const getCart = (cart) => ({
    type:GET_CART,
    payload: cart
})

const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
})

const deleteItem = (item) => ({
    type: DELETE_ITEM,
    payload: item
})

const clearCart = (cart) => ({
    type: CLEAR_CART,
    payload: cart
})

//THUNKS
export const getCartThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/cart/${id}`)
    const data = await response.json()
    dispatch(getCart(data))
    return data
}

export const addItemThunk = (cartId, productId) => async (dispatch) => {
    const response = await fetch(`/api/cart/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cart_id: cartId, product_id: productId })
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(addItem(data))
    }
    return response
}

export const deleteItemThunk = (userId,productid) => async (dispatch) => {
    const response = await fetch (`/api/cart/${userId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productid)
    })
    
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteItem(data))
        return data
    }
}

//initialState
const initialState = {
    cart:{}
}

//Reducer
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
        
        case ADD_ITEM:


        case DELETE_ITEM:


        case CLEAR_CART:


        default:
            return state;
    }
}