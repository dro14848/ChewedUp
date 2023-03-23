import { bindActionCreators } from "redux"

const LOAD_ALL = 'product/loadAll'
const LOAD_ONE = 'product/loadOne'

const loadAllProducts = (product) => ({
    type: LOAD_ALL,
    payload: product
})

const loadOneProduct = (product) => ({
    type: LOAD_ONE,
    payload: product
})

//THUNK

export const loadProductsThunk = () => async (dispatch) => {
    const response = await fetch (`api/products/`)
    const data = await response.json()
    dispatch(loadAllProducts(data))
    return response
}

export const loadSingleProdThunk = (id) => async (dispatch) => {
    const response = await fetch (`api/products/${id}`)
    const data = await response.json()

    dispatch(loadSingleProdThunk(data))
    return response
}

//initial State

const initialState = {allProducts:{}, singleProduct: {}}

//REDUCEr
export const productReducers = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_ALL:
            newState = {...state}
            let newStateCopy = {...newState.allProducts}
            newStateCopy[action.payload.id] = action.payload
            newState.allProducts = newStateCopy
            return newState
        case LOAD_ONE:
            newState = {...state}
            // console.log("Action", action)
            newState.singleProduct = action.payload
            return newState
        default:
            return state
    }
}