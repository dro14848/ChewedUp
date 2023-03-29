import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './singleProduct.css'
import { loadSingleProdThunk } from "../../../store/products";
import { addItemThunk} from "../../../store/cart";
import  {ProductReviews } from '../../Reviews'

function SingleProduct() {
    const dispatch = useDispatch()
    const id = useParams()
    const history = useHistory()
    const product = useSelector(state => state.productReducer.singleProduct)
    const user = useSelector(state => state.session.user)



        useEffect(() => {
            dispatch(loadSingleProdThunk(id.id))
        }, [dispatch])



    return (
        <div className="mainProductDiv">
            <div className="productDetails">
                <h2>{product.name}</h2>
                <h2>{product.price}</h2>
                <div className="addToCart">
                {user && user.id ? (
                    <button className="add-to-cart"
                    onClick={() => dispatch(addItemThunk( user.id,id.id)).then(() => history.push('/cart'))}
                    > Add To Cart </button>
                    ): null }
                </div>

            </div>
            <div className="prodImg">
                <div>
                    <img src={product.image} alt="image not found"></img>
                    <p>{product.description}</p>
                </div>
            </div>

         <div>
            <ProductReviews />
         </div>
        </div>
    )
}

export default SingleProduct