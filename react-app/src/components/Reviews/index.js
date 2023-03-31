import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allReviewsThunk } from "../../store/reviews";


export const ProductReviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const reviews = useSelector(state => state.reviewsReducer.productReviews)
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
                            <p>Rating: {rating}</p>
                            <p>{review}</p>
                        </div>
                    )
                })}
            </div>
         </div>
    )
}

