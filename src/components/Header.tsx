import React from 'react'
import './Header.css'
import logo from '../assets/logo.png';

const Header = () => (
	<div className='header'>
		<div className='header__logo'>Student List</div>
		<div className='header__nav'>
			<img src={logo} alt='Logo' className='header__logo-img' />
		</div>
	</div>
)

export default Header
