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
    // console.log("RESPONSE", response)
    const data = await response.json()
    // console.log("DATA", data)
    dispatch(loadAllProducts(data))
    return response
}

export const loadSingleProdThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/products/${id}`)
    // console.log('RES', response)
    const data = await response.json()

    dispatch(loadOneProduct(data))
    return response
}

//initial State

const initialState = {allProducts:{}, singleProduct: {}}

//REDUCEr
export const productReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_ALL:
            newState = {...state}
            let allProductsCopy = {}
            // console.log("STATE", newState)
            action.payload.products.forEach(product => {
                // console.log(product)
                allProductsCopy[product.id] = product
            })
            newState.allProducts = allProductsCopy
            // console.log("allproductscopy", allProductsCopy)
            return newState
        case LOAD_ONE:
          newState = {...state}
          newState.singleProduct = action.payload
          return newState
        default:
            return state
    }
}

export default productReducer