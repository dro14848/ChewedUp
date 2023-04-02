import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { addReviewThunk, allReviewsThunk } from "../../../store/reviews";
import { loadSingleProdThunk } from "../../../store/products";
import './addreview.css'

export const AddReview = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state.productReducer.singleProduct.id)
    const ID = parseInt(id.id)
    const {closeModal} = useModal()
    // console.log(id)
    const user = useSelector(state => state.session.user)
    const reviewsObj = useSelector(state => state.reviewsReducer.productReviews)
    const reviews = Object.values(reviewsObj)
    const product = useSelector(state => state.productReducer.singleProduct)
    const userId = user?.id
    const [review, setReviews] = useState()
    const [rating, setRating] = useState(5)
    const [errors, setErrors] = useState([])
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (!review || review.length < 3) {
            setErrors(["Please enter a valid review with at least 3 charachters"])
            return
        }
        return dispatch(addReviewThunk(id, { userId, id, review, rating }))
            .then(() => {dispatch(allReviewsThunk(id))})
            .then(() => {dispatch(loadSingleProdThunk(product.id))})
            .then(closeModal)

            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  setErrors(data.errors);
                } else if (data && data.message) {
                  setErrors([data.message]);
                }
           
              });
    }

    const userHasReview = reviews.some(({user_id}) => user_id === userId)

    const loggedIn = () => {
        if(!user) {
           return <p>Please log in to post a review.</p>
        } else {
            return null;
        }
    }
    return (
        <div>
        <form className="reviewsform" onSubmit={handleSubmit} noValidate>
          <ul className="ul">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <textarea
            className="reviewtextbox"
            type="textbox"
            defaultValue="Post a review here!"
            onFocus={(e) => {
              if (e.target.defaultValue === "Post a review here!") {
                setReviews("");
              }
            }}
            value={review}
            maxLength={255}
            onChange={(e) => {
              setReviews(e.target.value);
            }}
            required
          ></textarea>
          <select
            className="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="submitbutton" type="submit">
            Submit
          </button>
        </form>
        <button className="cancelbutton" onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    )

}