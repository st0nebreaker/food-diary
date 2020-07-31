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
			comment: '',
			dataList: [],
			error: '',
		}
	}
																
	handleDateChange = date => {
    this.setState({date: date});
	};
	
	handleSearchChange = ({ target: { value } }) => {
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

	render() {
		return (
			<form className='entry-form'>
				<section>New Food Entry</section>
				<DatePicker
					selected={this.state.date}
					// onSelect={this.handleSelect} //when day is clicked
					onChange={(this.handleDateChange)} //only when value has changed
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
					{this.props.chosenFood && <div>Selected: {this.props.chosenFood.food_name}</div>}
					{this.state.dataList && 
						<ResultList 
							items={this.state.dataList} 
							findFood={this.props.findFood} 
							resultListActive={this.props.resultListActive} 
						/>
				}
				</div>
				<input 
				type='text' 
				name='comment' 
				placeholder='noteable comments or symptoms' 
				className='comment-box'
				value={this.state.comment}
				onChange={(e) => this.setState({ comment: e.target.value })}
				aria-label='comment'
				/>
				<button 
					className='submit-form'
					type='button'
					onClick={() => this.props.addToLog({food: this.props.chosenFood, comment: this.state.comment, date: this.state.date})}
				>
					Log
				</button>
			</form>
		)
	}
}

export default EntryForm;