import React, { Component } from 'react';
import './App.css';
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
			chosenFood: null,
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

	updateChosenFood = (givenFood) => {
		this.setState({ chosenFood: givenFood });
	}

	hideResultList = () => {
		this.setState({ resultsActive: false });
	}
	
	hideFoodDetails = () => {
		this.setState({ activeFoodItem: null });
	}

	addToLog = (givenEntry) => {
		this.setState({ loggedEntries: [...this.state.loggedEntries, givenEntry] });
	}

	render () {
		return (
			<div className='App'>
				<Header />
				<section className='layout-body'>
					<LogHistory loggedEntries={this.state.loggedEntries} />
					<EntryForm 
						findFood={this.findFood} 
						chosenFood={this.state.chosenFood}
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
							// updateChosenFood={this.updateChosenFood} 
							handleAdd={() => {
								this.updateChosenFood(this.state.activeFoodItem);
								this.hideResultList();
								this.hideFoodDetails();
							}}
							closeFoodCard={() => {
								// this.hideResultList();
								this.hideFoodDetails();
							}} 
						/>
					}
					{/* Route to LogHistoryDetails */}
					{/* Route to FoodDetails */}
				</section>
			</div>
		);
	}
}

export default App;