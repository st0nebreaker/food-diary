import React, { Component } from 'react';
import './App.css';
import { Route, Link } from  'react-router-dom';
import Header from '../Header/Header';
import LogHistory from '../LogHistory/LogHistory';
import EntryForm from '../EntryForm/EntryForm';
import Trends from '../Trends/Trends';
import FoodInfo from '../FoodInfo/FoodInfo';
import { fetchFood } from '../apiCalls';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedEntries: [],
			foodClicked: null,
			chosenFood: null,
			resultsActive: true,
		}
	}

	findFood = async (givenValue) => {
		try {
			const data = await fetchFood(givenValue);
			this.setState({ foodClicked: data });
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

	addToLog = (givenEntry) => {
		// debugger;
		this.setState({ loggedEntries: [...this.state.loggedEntries, givenEntry] });
	}

	render () {
		return (
			<div className='App'>
				<Header />
				<section className='layout-body'>
					<LogHistory />
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
					{this.state.foodClicked && 
						<Route 
							path='/food/:name'
							render={() => 
								<FoodInfo 
									food={this.state.foodClicked} 
									updateChosenFood={this.updateChosenFood} 
									hideResultList={this.hideResultList} 
								/>}
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
