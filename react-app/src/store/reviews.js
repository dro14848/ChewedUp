const ALL_REVIEWS = 'reviews/allReviews'
const ADD_REVIEW = 'reviews/addReview'
const DELETE_REVIEW = 'reviews/deleteReview'


const allReviews = (reviews) => ({
    type: ALL_REVIEWS,
    payload: reviews
})

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})


// THUNKS
export const allReviewsThunk = (productID) => async (dispatch) => {
    const response = await fetch (`/api/products/${productID}`)
    const data = await response.json()
    console.log("DATA", data)
    dispatch(allReviews(data))
}

export const addReviewThunk = (id, review) =>  async (dispatch) => {
      const response = await fetch(`/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: review.userId,
            product_id: id,
            review: review.review,
            rating: review.rating
        })
      })

      if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
      }
}

export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(data))
        return data
    }
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
        
        case ADD_REVIEW:
            newState = { ...state}
            let reviewCopy = { ...newState.productReviews}
            reviewCopy[action.payload.id] = action.payload
            newState.allProducts = reviewCopy
            return newState
        
        case DELETE_REVIEW:
            newState = { ...state}
            let reviewCopyA = {...newState.productReviews}
            delete reviewCopyA[action.payload.id]
            newState.productReviews = reviewCopyA
            return newState
        default:
            return state
    }
}


