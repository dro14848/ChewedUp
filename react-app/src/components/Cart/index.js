import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getCartThunk } from '../../store/cart'

function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)




    if (!user){
        history.push('/login')
    }

    useEffect(() => {
        dispatch(getCartThunk(user.id))
    }, [dispatch])
    
    return (
        <div>CART PAGE</div>
    )
}

export default Cart