import React from "react";
import { Link } from "react-router-dom";
import "./FoodInfo.scss";

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
			<h3>{food.food_name}</h3>
			<section className='nutrient-info'>
				<p>Serving size: {food.serving_qty} {food.serving_unit} ({food.serving_weight_grams}g)</p>
				<p>Calories: {food.nf_calories}</p>
				<p>Total Fat: {food.nf_total_fat}g</p>
				<p>Saturated Fat: {food.nf_saturated_fat}g</p>
				<p>Cholesterol: {food.nf_cholesterol}mg</p>
				<p>Sodium: {food.nf_sodium}mg</p>
				<p>Potassium: {food.nf_potassium}mg</p>
				<p>Total Carbohydrates: {food.nf_total_carbohydrate}g</p>
				<p>Protein: {food.nf_protein}g</p>
				<p>Fiber: {food.nf_dietary_fiber}g</p>
				<p>Sugar: {food.nf_sugars}g</p>
			</section>
			{console.log(food.photo)}
			<button 
				className='add-btn' 
				type='button'
				onClick={handleAdd}
			>
				Add to form
			</button>
			{/* <img src={this.state.foodItem.photo.thumb} alt='food item' className='food-info-pic' /> */}
		</section>
	)
}

export default FoodInfo;