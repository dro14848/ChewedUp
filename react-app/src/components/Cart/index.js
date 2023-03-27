import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getCartThunk } from '../../store/cart'

function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const items = useSelector(state => state.cartReducer.cart)
    console.log("CART ITEMS", items)



    if (!user){
        history.push('/login')
    }

    useEffect(() => {
        dispatch(getCartThunk(user?.id))
    }, [dispatch])

    return (
        <div className='MainCartDiv'>
            <h1>Cart</h1>
            {items.cart?.map(({id, name, price }) => {
                return (
                    <div key={id}>
                    <h2>{name}</h2>
                    <p>${price}</p>
                    </div>
                
                )
            })}
            <div className='totalpricediv'>
                <p>Total: </p>
            </div>
            <div className='Checkout'>
                <button className='checkoutButton' >Checkout</button>
            </div>
        </div>
    )
}

export default Cart