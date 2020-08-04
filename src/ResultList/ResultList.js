import React from 'react';
import "./ResultList.scss";
import PropTypes from 'prop-types';

const ResultList = (props) => {
	return (
		<ul className={props.resultListActive ? 'result-list' : 'hide-comp'}>
			{props.items.map((elem, i) => {
				return (
						<li 
							key={i} 
							className='result-item' 
							onClick={() => props.findFood(elem.food_name)}
						>
							<img src={elem.photo.thumb} alt='food item' className='item-pic' />
							{elem.food_name}
						</li>
				)
			})}
		</ul>
	)
}

export default ResultList;

ResultList.propTypes = {
	items: PropTypes.array,
	resultListActive: PropTypes.bool,
	findFood: PropTypes.func
}