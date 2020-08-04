import React from "react";
import { Link } from "react-router-dom";
import "./Trends.scss";
import PropTypes from 'prop-types';

const Trends = ({ trends }) => {
	return (
		<section className='trends-wrapper'>
			<span className='trend-title'>
				<Link to={`/`}><img src={require("../assets/back-arrow.svg")} alt="Back icon" className="back" /></Link>
				<h3 className='trends'>Trends</h3>
			</span>
			{trends.map((trend, i) => {
				return (
					<section className='trend-card' key={i}>
						<p className='trend-detail'>You've reported <span className='trend-bold'>{trend.comment}</span> symptom 2 or more times in association with consuming <span className='trend-bold'>{trend.reoccuringFood[0].food_name}</span>.</p>
						<section className='trend-btns'>
							<button className='t-btn'>CLEAR</button>
							<button className='t-btn'>TAKE A LOOK</button>
						</section>
					</section>
				)
			})}
		</section>
	)
}

export default Trends;

Trends.propTypes = {
	trends: PropTypes.array
}