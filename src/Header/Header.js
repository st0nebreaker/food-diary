import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
	return (
		<>
			<Link to='/trends'><button>Trends</button></Link>
			Food Diary
			<button>Logout</button>
		</>
	)
}

export default Header;