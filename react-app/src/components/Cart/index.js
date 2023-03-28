import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getCartThunk, deleteItemThunk } from '../../store/cart'

function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const items = useSelector(state => state.cartReducer.cart)
    console.log("CART ITEMS", items)
    const [itemCount, setItemCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.00)


    if (!user){
        history.push('/login')
    }

    useEffect(() => {
        dispatch(getCartThunk(user?.id))
    }, [dispatch])

    useEffect(() => {
        if (items) {
          let itemCount = 0
          let price = 0.00
          items.cart?.forEach(({ id, price: itemPrice }) => {
            itemCount += 1
            price += itemPrice
          })
          setItemCount(itemCount)
          setTotalPrice(price)
        }
      }, [items])

    const handleDeleteItem = (itemId, itemPrice) => {
        dispatch(deleteItemThunk(user.id, itemId))
        setItemCount(prevCount => prevCount - 1)
        setTotalPrice(prevPrice => prevPrice - itemPrice)
      }


    return (
        <div className='MainCartDiv'>
            <h1>Cart</h1>
            {items.cart?.map(({id, name, price}) => {
                return (
                    <div key={id}>
                    <h2>{name}</h2>
                    <p>Quantity: {items.quantity}</p>
                    <p>${price}</p>
                    <div className='deleteButtonDiv'>
                        <button className='deleteItemButton' onClick={() => handleDeleteItem(id, price)}>Delete Item</button>
                    </div>
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