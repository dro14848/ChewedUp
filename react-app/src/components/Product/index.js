import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { loadProductsThunk } from '../../store/products'
import { NavLink, Switch, Route } from 'react-router-dom'


function AllProducts (){
    const dispatch = useDispatch()
    const products = useSelector(state => state.productReducer.allProducts)
    const productsArr = Object.values(products || [])
    console.log("PRODUCTS", productsArr)

    useEffect(() => {
        dispatch(loadProductsThunk())
    }, [])
    return (
        <div className="products-container">
            {productsArr?.map(({ id, name, price, productImages }) => {
                return (
                    <div key={id}>
                    <NavLink to={`/products/${id}`}>
                     <div className="productDetails">
                    {productImages?.map(pic => {
                        return (
                            <div>
                    <img className='preview-image' src={pic?.image} alt="image not found"></img>
                        <p className="nameprice"> $ {price}</p>
                        </div>)})}
                    </div>
                    </NavLink>
                </div>
                )
            })}
            </div>
    )
}

export default AllProducts