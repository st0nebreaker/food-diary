import React, { Component } from 'react';
import './App.scss';
import { Route } from  'react-router-dom';
import Header from '../Header/Header';
import LogHistory from '../LogHistory/LogHistory';
import EntryForm from '../EntryForm/EntryForm';
import Trends from '../Trends/Trends';
import FoodInfo from '../FoodInfo/FoodInfo';
import LogDetails from '../LogDetails/LogDetails';
import ResultList from '../ResultList/ResultList';
import { fetchFood } from '../apiCalls';
import { data1, data2, data3 } from '../data';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedEntries: [data1, data2, data3],
			activeFoodItem: null,
			chosenFoods: [],
			resultsActive: true,
			trends: []
		}
	}

	componentDidMount() {
		window.addEventListener('click', (event) => {
			if (this.state.resultsActive && event.target !== ResultList) {
				this.setState({ resultsActive: false })
			}
		});

		this.findTrends();
	}

	componentDidUpdate() {
		this.findTrends();
	}

	findTrends = () => {
		let matchingBySymptom = [];
		let matchingByFood = [];

		this.state.loggedEntries.forEach(entry => {
			entry.comment.forEach(c => {
				const foundMatch = this.state.loggedEntries.filter(e => e.comment.includes(c));
				foundMatch.forEach(m => matchingBySymptom.push(m));
			})
		});
		
		if (matchingBySymptom.length >= 2) {
			matchingBySymptom.forEach((entry) => {
				entry.food.forEach(f => {

					const foundMatch = matchingBySymptom.filter(symptomMatch => {
						const values = symptomMatch.food.map(food => (Object.values(food)));
						if (values[0].includes(f.food_name))
							return symptomMatch;
					});

					if (foundMatch.length >= 2) {
						foundMatch.forEach(m => matchingByFood.push(m));
					}
				})
			})
		}

		const removedDuplicates = matchingByFood.reduce((acc, entry) => {
			const foodMatch = acc.find(item => item.reoccuringFood[0].food_name === entry.food[0].food_name);
			const symptomMatch = acc.find(item => item.comment[0] === entry.comment[0]);
			if (matchingByFood.length >= 2 && foodMatch === undefined && symptomMatch === undefined) {
				acc.push({matchedTrend: [entry], reoccuringFood: entry.food, comment: entry.comment})
			}
			return acc;
		}, []);

		if (removedDuplicates.length > this.state.trends.length) {
			this.setState({ trends: removedDuplicates });
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
				<Header trends={this.state.trends} />
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
							<Trends trends={this.state.trends} />
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