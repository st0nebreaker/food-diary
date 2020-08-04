import React from "react";
import { Link } from "react-router-dom";
import "./FoodLog.scss";
import PropTypes from 'prop-types';

const FoodLog = (props) => {
	return (
		<section className='entry-card'>
			<p className='card-p date'>{props.date}</p>
			<section className='card-p-info'>
				<p className='card-p'><span className='bold'>food consumed:</span> {props.food.map(f => f.food_name)}</p>
				<p className='card-p'><span className='bold'>noted symptoms:</span> {props.comment}</p>
			</section>
			<Link to={`/foodlog/${props.date}`}><img src={require("../assets/expand.svg")} alt="Expand log" className="expand" /></Link>
		</section>
	)
}

export default FoodLog;

FoodLog.propTypes = {
	date: PropTypes.string,
	comment: PropTypes.array,
	food: PropTypes.array
}