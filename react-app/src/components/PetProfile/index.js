import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, Switch, Route } from 'react-router-dom'


function PetProfile(){

    return (
        <div>
            <div>
                <h1>My Pets</h1>
            </div>
            <div>
                <button>Add a Pet</button>
            </div>
        </div>
    )
}

export default PetProfile