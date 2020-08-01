import React from "react";
import { Link } from "react-router-dom";
import "./LogDetails.scss";

const LogDetails = ({entryLog}) => {
	return (
		<section className='log-details'>
			<p className='log-details-header'>
			<Link to={`/`}><img src={require("../assets/back-arrow.svg")} alt="Back icon" className="back" /></Link>
			<span className='log-details-date'>{entryLog.date}</span>
			</p>
			{/* <section className='card-p-info'> */}
				<p className='log-details-info'><span className='bold'>You reportedly ate</span> {entryLog.food.map(f => f.food_name)} on this day.</p>
				<p className='log-details-info'><span className='bold'>You reported notable symptoms of</span> {entryLog.comment} on this day.</p>
			{/* </section> */}
		</section>
	)
}

export default LogDetails;