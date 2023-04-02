import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Cart from '../Cart';
import './Navigation.css';
import CartIcon from '../icons/cart';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navBarUL'>
			<li className='navBarHomeButton'>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li className='navBarCartButton'>
				<NavLink exact to='/cart'><CartIcon/></NavLink>
			</li>
			{isLoaded && (
				<li className='navBarProfileButton'>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;