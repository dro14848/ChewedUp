import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getCartThunk, deleteItemThunk, clearCartThunk } from '../../store/cart'
import TrashIcon from '../icons/trash'
import './cart.css'

function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const items = useSelector(state => state.cartReducer.cart)
    const itemsArr = Object.values(items || [])
    const [itemCount, setItemCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.00)

    console.log('items', items)
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

        const handleCheckout = async () => {
            dispatch(clearCartThunk(items.id))
            .then(() => {
                history.push('/order')
            })
        }

    return (
        <div className='MainCartDiv'>
            {/* <div className='cartItemDiv'>
            <h1 classname= 'cartItemCount'>Cart ({itemCount})</h1>
            {items.cart?.map(({id, name, price, productimages}) => {
                return (
                    <div key={id}>
                    <h2 className='cartItemName'>{name}</h2>
                    <p className='cartPrice'>${price}</p>
                    {productimages?.map(image => (
                        <img className="cart-image" src={image.image} alt="no image" key={image.id} />
                        ))}
                    <div className='deleteButtonDiv'>
                        <button className='deleteItemButton' onClick={() => handleDeleteItem(id, price)}>Delete Item</button>
                    </div>
                    </div>
                
                )
            })}
            </div> */}
            <div className='cartItemDiv'>
  {items.cart?.map(({id, name, price, productimages}) => {
    return (
      <div key={id} className="cart-item">
        <div className="cart-item-image">
          {productimages?.map(image => (
            <img className="cart-image" src={image.image} alt="no image" key={image.id} />
          ))}
        </div>
        <div className="cart-item-details">
          <h2 className='cartItemName'>{name}</h2>
          <p className='cartPrice'>${price}</p>
          <div className='deleteButtonDiv'>
            <button className='deleteItemButton' onClick={() => handleDeleteItem(id, price)}><TrashIcon /></button>
          </div>
        </div>
      </div>
    )
  })}
</div>
            <div className='totalpricediv'>
                <p className='cartTotalPrice'>Total:${totalPrice.toFixed(2)} </p>
            </div>
            <div className='Checkout'>
                <button className='checkoutButton' onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    )
}

export default Cart

  