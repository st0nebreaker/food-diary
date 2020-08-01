import React from "react";
import { Link } from "react-router-dom";
import "./FoodLog.scss";

const FoodLog = (props) => {
	return (
		<section className='entry-card'>
			<p className='card-p date'>{props.date}</p>
			<section className='card-p-info'>
				<p className='card-p'><span className='bold'>food consumed:</span> {props.food.map(f => f.food_name)}</p>
				<p className='card-p'><span className='bold'>noted symptoms:</span> {props.comment}</p>
			</section>
			<img src={require("../assets/expand.svg")} alt="Expand log" className="expand" />
		</section>
	)
}

export default FoodLog;