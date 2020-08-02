import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ trends }) => {
	return (
		<section className='header'>
			{trends.length > 0 && 
				<Link to='/trends'>
					<section className='trend-btn-wrapper'>
						<button className='trend-btn'>TRENDS</button>
						<img src={require("../assets/red-circle.png")} alt="Notification" className="notification" />
					</section>
				</Link>
			}
			{trends.length === 0 && 
				<Link to='/trends'><button className='trend-btn'>TRENDS</button></Link>
			}
			<h2 className='title'><Link to={`/`}>Food Diary</Link></h2>
		</section>
	)
}

export default Header;