import { useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './singleProduct.css'
import { loadSingleProdThunk } from "../../../store/products";


function SingleProduct() {
    const dispatch = useDispatch()
    const id = useParams()
    const history = useHistory()
    const product = useSelector(state => state.productReducer.singleProduct)
    console.log('PRODUCT', product)

        useEffect(() => {
            dispatch(loadSingleProdThunk(id.id))
        }, [dispatch])



    return (
        <div className="mainProductDiv">
            <div className="productDetails">
                <h2>{product.name}</h2>
                <h2>{product.price}</h2>
                <div className="addToCart">
                    <button className="addToCartButton">Add to Cart</button>
                </div>

            </div>
            <div className="prodImg">
                <div>
                    <img src={product.image} alt="image not found"></img>
                    <p>{product.description}</p>
                </div>
            </div>

        </div>
    )
}

export default SingleProduct