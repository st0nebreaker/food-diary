import React, { Component } from "react";
import ResultList from '../ResultList/ResultList';
import { fetchSearch } from '../apiCalls';
import DatePicker from "react-datepicker";
import _ from 'lodash';
import "./EntryForm.scss";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';

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

	handleSubmit = () => {
		this.clearComponent();
		this.props.clearChosenFood();
		this.props.addToLog({
				food: this.props.chosenFoods, 
				comment: this.state.comment, 
				date: (this.state.date.toString()).slice(0, 15)
		});
	}

	clearComponent = () => {
		this.setState({
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
			date: new Date(),
		})
	}

	render() {
		return (
			<form className='entry-form'>
				<h3 className='form-title'>New Food Entry</h3>
				<section className='input-container'>
					Choose date:
					<DatePicker
						selected={this.state.date}
						onChange={(this.handleDateChange)}
					/>
				</section>
				<section className='input-container'>
					Search food:
					<input
						type="text"
						name="search"
						placeholder="search food items..."
						className="header-search"
						value={this.state.query}
						onChange={this.handleSearchChange}
						aria-label="search"
					/>
				</section>
				<section className='input-container'>
					{this.props.chosenFoods.length > 0 && <div><span className='subtitle'>Selected:</span> {this.props.chosenFoods.map(food => `${food.food_name}, `)}</div>}
				</section>
				{this.state.dataList && 
					<ResultList 
						items={this.state.dataList} 
						findFood={this.props.findFood} 
						resultListActive={this.props.resultListActive} 
					/>
				}
				<section className='input-container'>
					<label>Mark notable symptoms today:</label>
					<label>
						<input
							name="energetic"
							type="checkbox"
							className='checkbox'
							aria-label='symptom-picker'
							checked={this.state.energetic}
							onChange={this.handleInputChange} 
						/>
						Energetic
					</label>
					<label>
						<input
							name="lethargic"
							type="checkbox"
							className='checkbox'
							aria-label='symptom-picker'
							checked={this.state.lethargic}
							onChange={this.handleInputChange} 
						/>
						Lethargic
					</label>
					<label>
						<input
							name="moody"
							type="checkbox"
							className='checkbox'
							aria-label='symptom-picker'
							checked={this.state.moody}
							onChange={this.handleInputChange} 
						/>
						Moody
					</label>
					<label>
						<input
							name="bowel"
							type="checkbox"
							className='checkbox'
							aria-label='symptom-picker'
							checked={this.state.bowel}
							onChange={this.handleInputChange} 
						/>
						Bowel movements
					</label>
					<label>
						<input
							name="nausea"
							type="checkbox"
							className='checkbox'
							aria-label='symptom-picker'
							checked={this.state.nausea}
							onChange={this.handleInputChange} 
						/>
						Nausea
					</label>
					<label>
						<input
							name="headache"
							type="checkbox"
							className='checkbox'
							aria-label='symptom-picker'
							checked={this.state.headache}
							onChange={this.handleInputChange} 
						/>
						Headache/Foggy
					</label>
				</section>
				<button 
					className='submit-form'
					type='button'
					onClick={this.handleSubmit}
				>
					LOG
				</button>
			</form>
		)
	}
}

export default EntryForm;

EntryForm.propTypes = {
	findFood: PropTypes.func,
	chosenFoods: PropTypes.array,
	clearChosenFood: PropTypes.func,
	showResultList: PropTypes.func,
	resultListActive: PropTypes.bool,
	addToLog: PropTypes.func,
	items: PropTypes.array,
}