import React, { Component } from 'react';
import './App.css';
import { Route, Link } from  'react-router-dom';
import Header from '../Header/Header';
import LogHistory from '../LogHistory/LogHistory';
import EntryForm from '../EntryForm/EntryForm';
import Trends from '../Trends/Trends';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedEntries: []
		}
	}

	render () {
		return (
			<div className='App'>
				<Header />
				<LogHistory />
				<EntryForm />
				<Route 
					path='/trends' 
					render={() => (
						<Trends />
					)}
				/>
				{/* Route to LogHistoryDetails */}
				{/* Route to FoodDetails */}
			</div>
		);
	}
}

export default App;
