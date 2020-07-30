import React, { Component } from "react";
import "./FoodInfo.scss";

class FoodInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodItem: {},
			active: true,
		}
	}

	componentDidMount() {
		this.setState({ foodItem: this.props.food, active: true })
	}

	handleAdd = () => {
		this.props.updateChosenFood(this.state.foodItem);
		this.props.hideResultList();
		this.setState({ active: false });
	}

	render() {
		return (
			<section className={this.state.active ? 'info-wrapper' : 'hide-comp'}>
				<h3>{this.state.foodItem.food_name}</h3>
				<section className='nutrient-info'>
					<p>Serving size: {this.state.foodItem.serving_qty} {this.state.foodItem.serving_unit} ({this.state.foodItem.serving_weight_grams}g)</p>
					<p>Calories: {this.state.foodItem.nf_calories}</p>
					<p>Total Fat: {this.state.foodItem.nf_total_fat}g</p>
					<p>Saturated Fat: {this.state.foodItem.nf_saturated_fat}g</p>
					<p>Cholesterol: {this.state.foodItem.nf_cholesterol}mg</p>
					<p>Sodium: {this.state.foodItem.nf_sodium}mg</p>
					<p>Potassium: {this.state.foodItem.nf_potassium}mg</p>
					<p>Total Carbohydrates: {this.state.foodItem.nf_total_carbohydrate}g</p>
					<p>Protein: {this.state.foodItem.nf_protein}g</p>
					<p>Fiber: {this.state.foodItem.nf_dietary_fiber}g</p>
					<p>Sugar: {this.state.foodItem.nf_sugars}g</p>
				</section>
				{console.log(this.state.foodItem.photo)}
				<button 
					className='add-btn' 
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