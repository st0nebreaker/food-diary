import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "./EntryForm.scss";
import "react-datepicker/dist/react-datepicker.css";


class EntryForm extends Component {
	constructor() {
		super();
		this.state = {
			date: new Date()
		}
	}

	handleChange = date => {
    this.setState({
			date: date,
			searchInput: 'food search...'
    });
  };

	render() {
		return (
			<form className='entry-form'>
				<section>New Food Entry</section>
				<DatePicker
					selected={this.state.date}
					// onSelect={this.handleSelect} //when day is clicked
					onChange={this.handleChange} //only when value has changed
				/>
				<div><input
					type="text"
					name="search"
					placeholder="search cocktails..."
					className="header-search"
					value={this.state.searchInput}
					// onChange={(e) => setSearchInput(e.target.value)}
					aria-label="search"
				/>
				<button className='search-btn'>
					search
				</button></div>
			</form>
		)
	}
}

export default EntryForm;