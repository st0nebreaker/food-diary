import React from "react";
import { Link } from "react-router-dom";
import "./FoodLog.scss";

const LogHistory = (props) => {
	console.log(props.date)
	return (
		<section className='entry-card'>
			{props.date.toString()}
			{props.comment}
			{props.food.map(f => f.food_name)}
		</section>
	)
}

export default LogHistory;