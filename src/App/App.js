import React, { Component } from 'react';
import './App.scss';
import { Route, Link } from  'react-router-dom';
import Header from '../Header/Header';
import LogHistory from '../LogHistory/LogHistory';
import EntryForm from '../EntryForm/EntryForm';
import Trends from '../Trends/Trends';
import FoodInfo from '../FoodInfo/FoodInfo';
import LogDetails from '../LogDetails/LogDetails';
import ResultList from '../ResultList/ResultList';
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

	componentDidMount() {
		window.addEventListener('click', (event) => {
			if (this.state.resultsActive && event.target !== ResultList) {
				this.setState({ resultsActive: false })
			}
		})
		//add event listener that listens to click on the body
		//run a fn to check if results is showing
		//& event target isn't resultsList
		//then set resultsActive to false
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
					<Route 
						exact
						path='/'
						render={() => (
							<EntryForm 
								findFood={this.findFood} 
								chosenFoods={this.state.chosenFoods}
								clearChosenFood={() => this.setState({chosenFoods: []})}
								showResultList={this.showResultList}
								resultListActive={this.state.resultsActive} 
								addToLog={this.addToLog}
							/>
							
						)}
					/>
						
					{this.state.activeFoodItem && 
						<FoodInfo
							food={this.state.activeFoodItem} 
							handleAdd={this.handleFoodSelection}
							closeFoodCard={this.hideFoodDetails} 
						/>
					}
					<Route 
						path='/trends' 
						render={() => (
							<Trends />
						)}
					/>
					<Route 
						path='/foodlog/:date' 
						render={({ match }) => {
							const { date } = match.params;
							const foundLog = this.state.loggedEntries.find(entry => entry.date === date);
							return (
								<LogDetails entryLog={foundLog} />
							)
						}}
					/>
				</section>
			</div>
		);
	}
}

export default App;