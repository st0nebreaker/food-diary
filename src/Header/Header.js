import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
	return (
		<section className='header'>
			<Link to='/trends'><button className='trend-btn'>TRENDS</button></Link>
			<h2 className='title'>Food Diary</h2>
		</section>
	)
}

export default Header;