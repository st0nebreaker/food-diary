import React from "react";
import FoodLog from '../FoodLog/FoodLog';
import "./LogHistory.scss";
import PropTypes from 'prop-types';

const LogHistory = (props) => {
	const entryCards = props.loggedEntries.map((entry, i) => {
		return (
			<FoodLog
				key={i}
				date={entry.date}
				comment={entry.comment}
				food={entry.food}
			/>
		)
	})

	return (
		<section className='log-history-wrapper'>
			<h3 className='food-history'>Food History</h3>
			{entryCards}
		</section>
	)
}

export default LogHistory;

LogHistory.propTypes = {
	loggedEntries: PropTypes.array,
	date: PropTypes.string,
	comment: PropTypes.array,
	food: PropTypes.array
}