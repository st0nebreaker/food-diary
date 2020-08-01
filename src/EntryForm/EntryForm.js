import React, { Component } from "react";
import ResultList from '../ResultList/ResultList';
import { fetchSearch } from '../apiCalls';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import _ from 'lodash';
import "./EntryForm.scss";
import "react-datepicker/dist/react-datepicker.css";

class EntryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			query: '',
			searchQuery: '',
			comment: [],
			dataList: [],
			energetic: false,
			lethargic: false,
			moody: false,
			bowel: false,
			nausea: false,
			headache: false,
			error: '',
		}
	}
																
	handleDateChange = date => {
    this.setState({date: date});
	};
	
	handleSearchChange = ({ target: { value } }) => {
		this.props.showResultList();
		this.setState({query: value});

		const search = _.debounce(this.sendQuery, 200);

		search(value);
	}

	sendQuery = async (value) => {
		try {
			const data = await fetchSearch(value);
			return this.setState({dataList: data.common});
		} catch (error) {
			console.log(error);
		}
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: !this.state[event.target.name] })

		if (this.state.comment.includes(event.target.name)) {
			const index = this.state.comment.indexOf(event.target.name);
			this.state.comment.splice(index, 1);
			this.setState({ comment: this.state.comment })
		} else {
			this.setState({ comment: [...this.state.comment, event.target.name] })
		}
	}

	render() {
		return (
			<form className='entry-form'>
				<section>New Food Entry</section>
				<DatePicker
					selected={this.state.date}
					onChange={(this.handleDateChange)}
				/>
				<div>
					<input
						type="text"
						name="search"
						placeholder="search cocktails..."
						className="header-search"
						value={this.state.query}
						onChange={this.handleSearchChange}
						aria-label="search"
					/>
					{this.props.chosenFoods.length > 0 && <div>Selected: {this.props.chosenFoods.map(food => food.food_name)}</div>}
					{this.state.dataList && 
						<ResultList 
							items={this.state.dataList} 
							findFood={this.props.findFood} 
							resultListActive={this.props.resultListActive} 
						/>
				}
				</div>
				<label>Notable symptoms today</label>
				<label>
          Energetic:
          <input
            name="energetic"
            type="checkbox"
            checked={this.state.energetic}
            onChange={this.handleInputChange} 
					/>
        </label>
				<label>
          Lethargic:
          <input
            name="lethargic"
            type="checkbox"
            checked={this.state.lethargic}
            onChange={this.handleInputChange} 
					/>
        </label>
				<label>
          Moody:
          <input
            name="moody"
            type="checkbox"
            checked={this.state.moody}
            onChange={this.handleInputChange} 
					/>
        </label>
				<label>
          Bowel movements:
          <input
            name="bowel"
            type="checkbox"
            checked={this.state.bowel}
            onChange={this.handleInputChange} 
					/>
        </label>
				<label>
          Nausea:
          <input
            name="nausea"
            type="checkbox"
            checked={this.state.nausea}
            onChange={this.handleInputChange} 
					/>
        </label>
				<label>
          Headache/Foggy:
          <input
            name="headache"
            type="checkbox"
            checked={this.state.headache}
            onChange={this.handleInputChange} 
					/>
        </label>
				<button 
					className='submit-form'
					type='button'
					onClick={() => this.props.addToLog({food: this.props.chosenFoods, comment: this.state.comment, date: this.state.date})}
				>
					Log
				</button>
			</form>
		)
	}
}

export default EntryForm;