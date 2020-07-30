import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
	return (
		<section className='header'>
			<Link to='/trends'><button className='trend-btn'>Trends</button></Link>
			<div className='title'>Food Diary</div>
			<button className='logout-btn'>Logout</button>
		</section>
	)
}

export default Header;