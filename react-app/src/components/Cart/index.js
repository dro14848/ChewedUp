import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getCartThunk, deleteItemThunk, clearCartThunk } from '../../store/cart'

function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const items = useSelector(state => state.cartReducer.cart)
    const itemsArr = Object.values(items || [])
    const [itemCount, setItemCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.00)


    if (!user){
        history.push('/login')
    }

    useEffect(() => {
        if(user){
            dispatch(getCartThunk(user.id))
        }
    }, [dispatch, user])

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
      }, [items, items.cart?.length])
      
      
      const handleDeleteItem = (itemId, itemPrice) => {
        dispatch(deleteItemThunk(user.id, itemId))
            .then(() => {
                setItemCount(prevCount => prevCount - 1);
                setTotalPrice(prevPrice => prevPrice - itemPrice);
                dispatch(getCartThunk(user.id));
            })
            .catch(error => {
                console.log('Error deleting item:', error);
            });
    }



        if(!items) {
            return <h1>THERE have no items in your cart</h1>
        }

        if (!items || items.cart?.length === 0){
            return <p>You have no items in your cart</p>
        }

    return (
        <div className='MainCartDiv'>
            <h1>Cart ({itemCount})</h1>
            {items.cart?.map(({id, name, price}) => {
                return (
                    <div key={id}>
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <div className='deleteButtonDiv'>
                        <button className='deleteItemButton' onClick={() => handleDeleteItem(id, price)}>Delete Item</button>
                    </div>
                    </div>
                
                )
            })}
            <div className='totalpricediv'>
                <p>Total:${totalPrice.toFixed(2)} </p>
            </div>
            <div className='Checkout'>
                <button className='checkoutButton' >Checkout</button>
            </div>
        </div>
    )
}

export default Cart

  