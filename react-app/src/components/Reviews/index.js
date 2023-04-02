import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import './review.css'

export const ProductReviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const reviews = useSelector(state => state.reviewsReducer.productReviews)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const reviewsObj = Object.values(reviews)
    const ID = parseInt(id.id)
   

    useEffect(() => {
        dispatch(allReviewsThunk(ID))
    }, [dispatch])

    return (
        <div> 
            <div className="mainReviewsdiv">
                {reviewsObj.map(({ id, review, rating, user_id}) => {
                    return (
                        <div key={id} className="reviewId">
                            <p className="reviewRating">Rating: {rating} / 5</p>
                            <p className="reviewbody">{review}</p>
                            {user_id === userId && (
                  <button
                  className="delete-review-button"
                  onClick={() => 
                    dispatch(deleteReviewThunk(id)).then(() => {
                    dispatch(allReviewsThunk(ID))
                })
                }
                  >
                    Delete
                  </button>
                )}
                        </div>
                    )
                })}
            </div>
         </div>
    )
}

