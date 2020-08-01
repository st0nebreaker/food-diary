import React from "react";
import { Link } from "react-router-dom";
import FoodLog from '../FoodLog/FoodLog';
import "./LogHistory.scss";

const LogHistory = (props) => {
	const entryCards = props.loggedEntries.map((entry, i) => {
		console.log(entry)
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
			Food History
			{entryCards}
		</section>
	)
}

export default LogHistory;