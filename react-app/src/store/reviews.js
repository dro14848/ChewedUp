const ALL_REVIEWS = 'reviews/allReviews'


const allReviews = (reviews) => ({
    type: ALL_REVIEWS,
    payload: reviews
})


// THUNKS
export const allReviewsThunk = (productID) => async (dispatch) => {
    const response = await fetch (`/api/products/${productID}`)
    const data = await response.json()
    console.log("DATA", data)
    dispatch(allReviews(data))
}


// INITIAL STATE

const initialState = {
    productReviews:{}
}

//REDUCER

export const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type){
        case ALL_REVIEWS:
            newState = { ...state}
            let reviewsCopy = {}
            action.payload.reviews.forEach(review => {
                reviewsCopy[review.id] = review
            })
            newState.productReviews = reviewsCopy
            return newState

        default:
            return state
    }
}


