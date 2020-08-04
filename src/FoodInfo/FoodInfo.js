import React from "react";
import "./FoodInfo.scss";
import PropTypes from 'prop-types';

const FoodInfo = ({ food, handleAdd, closeFoodCard }) => {
	return (
		<section className='info-wrapper'>
			<button 
				className='exit' 
				type='button'
				onClick={closeFoodCard}
			>
				X
			</button>
			<h4>{food.food_name}</h4>
			<section className='food-info'>
				<section className='nutrient-info'>
					<p className='ingred-p'><span className='bold'>Serving size:</span> {food.serving_qty} {food.serving_unit} ({food.serving_weight_grams}g)</p>
					<p className='ingred-p'><span className='bold'>Calories:</span> {food.nf_calories}</p>
					<p className='ingred-p'><span className='bold'>Total Fat:</span> {food.nf_total_fat}g</p>
					<p className='ingred-p'><span className='bold'>Saturated Fat:</span> {food.nf_saturated_fat}g</p>
					<p className='ingred-p'><span className='bold'>Cholesterol:</span> {food.nf_cholesterol}mg</p>
					<p className='ingred-p'><span className='bold'>Sodium:</span> {food.nf_sodium}mg</p>
					<p className='ingred-p'><span className='bold'>Potassium:</span> {food.nf_potassium}mg</p>
					<p className='ingred-p'><span className='bold'>Total Carbohydrates:</span> {food.nf_total_carbohydrate}g</p>
					<p className='ingred-p'><span className='bold'>Protein:</span> {food.nf_protein}g</p>
					<p className='ingred-p'><span className='bold'>Fiber:</span> {food.nf_dietary_fiber}g</p>
					<p className='ingred-p'><span className='bold'>Sugar:</span> {food.nf_sugars}g</p>
				</section>
				<img src={food.photo.thumb} alt='food item' className='food-info-pic' />
			</section>
			<button 
				className='add-btn' 
				type='button'
				onClick={handleAdd}
			>
				ADD TO FORM
			</button>
		</section>
	)
}

export default FoodInfo;

FoodInfo.propTypes = {
	food: PropTypes.object,
	handleAdd: PropTypes.func,
	closeFoodCard: PropTypes.func
}