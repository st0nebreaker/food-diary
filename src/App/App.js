import React, { Component } from 'react';
import './App.scss';
import { Route, Link } from  'react-router-dom';
import Header from '../Header/Header';
import LogHistory from '../LogHistory/LogHistory';
import EntryForm from '../EntryForm/EntryForm';
import Trends from '../Trends/Trends';
import FoodInfo from '../FoodInfo/FoodInfo';
import { fetchFood } from '../apiCalls';
import { data1, data2 } from '../data';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedEntries: [data1, data2],
			activeFoodItem: null,
			chosenFoods: [],
			resultsActive: true,
		}
	}

	findFood = async (givenValue) => {
		try {
			const data = await fetchFood(givenValue);
			this.setState({ activeFoodItem: data });
		} catch (error) {
			console.log(error);
		}
	}

	updateChosenFoods = (givenFood) => {
		this.setState({ chosenFoods: [...this.state.chosenFoods, givenFood] });
	}

	hideResultList = () => {
		this.setState({ resultsActive: false });
	}

	showResultList = () => {
		this.setState({ resultsActive: true });
	}
	
	hideFoodDetails = () => {
		this.setState({ activeFoodItem: null });
	}

	addToLog = (givenEntry) => {
		this.setState({ loggedEntries: [...this.state.loggedEntries, givenEntry] });
	}

	handleFoodSelection = () => {
		this.updateChosenFoods(this.state.activeFoodItem);
		this.hideResultList();
		this.hideFoodDetails();
	}

	render () {
		return (
			<div className='App'>
				<Header />
				<section className='layout-body'>
					<LogHistory loggedEntries={this.state.loggedEntries} />
					<EntryForm 
						findFood={this.findFood} 
						chosenFoods={this.state.chosenFoods}
						clearChosenFood={() => this.setState({chosenFoods: []})}
						showResultList={this.showResultList}
						resultListActive={this.state.resultsActive} 
						addToLog={this.addToLog}
					/>
					<Route 
						path='/trends' 
						render={() => (
							<Trends />
						)}
					/>
					{this.state.activeFoodItem && 
						<FoodInfo
							food={this.state.activeFoodItem} 
							handleAdd={this.handleFoodSelection}
							closeFoodCard={this.hideFoodDetails} 
						/>
					}
					{/* Route to LogHistoryDetails */}
				</section>
			</div>
		);
	}
}

export default App;