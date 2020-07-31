import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./FoodInfo.scss";

class FoodInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
		} 
	}

	handleAdd = () => {
		this.props.updateChosenFood(this.props.food.foodItem);
		this.props.hideResultList();
		this.setState({ active: false });
	}

	render() {
		const { food } = this.props;
		return (
			<section className={this.state.active ? 'info-wrapper' : 'hide-comp'}>
				<Link to='/'><button 
					className='exit' 
					type='button'
					onClick={() => this.setState({ active: false })}
				>
					X
				</button></Link>
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
					onClick={this.handleAdd}
				>
					Add to form
				</button>
				{/* <img src={this.state.foodItem.photo.thumb} alt='food item' className='food-info-pic' /> */}
			</section>
		)
	}
}

export default FoodInfo;