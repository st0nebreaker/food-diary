import React from 'react';
import { Link } from "react-router-dom";
import "./ResultList.scss";

const ResultList = (props) => {
	return (
		<ul className={props.resultListActive ? 'result-list' : 'hide-comp'}>
			{props.items.map((elem, i) => {
				return (
					<Link to={`/food/${elem.food_name}`} key={i}>
						<li 
							key={i} 
							className='result-item' 
							onClick={() => props.findFood(elem.food_name)}
						>
							<img src={elem.photo.thumb} alt='food item' className='item-pic' />
							{elem.food_name}
						</li>
					</Link>
				)
			})}
		</ul>
	)
}

export default ResultList;