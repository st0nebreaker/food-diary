import * as sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import EntryForm from '../EntryForm/EntryForm';
import { returnedSearch, fetchedFood2 } from '../test-data';
import { fetchFood, fetchSearch } from '../apiCalls';
import userEvent from '@testing-library/user-event';

jest.mock('../apiCalls');
// jest.mock('../EntryForm/EntryForm');

describe('App', () => {
	beforeEach(() => {
		fetchSearch.mockResolvedValue(() => {
			return returnedSearch
		});
	
		fetchFood.mockResolvedValue(() => {
			return fetchedFood2
		});
	})

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Landing page contains the Header, LogHistory, and EntryForm components', () => {
		const { getByLabelText, getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const appTitle = getByText('Food Diary');
		const headerBtn = getByText('TRENDS');
		const foodHistoryTitle = getByText('Food History');
		const searchInput = getByLabelText('search');
		const entryForm = getByText('New Food Entry');
		
		expect(appTitle).toBeInTheDocument();
		expect(headerBtn).toBeInTheDocument();
		expect(foodHistoryTitle).toBeInTheDocument();
		expect(searchInput).toBeInTheDocument();
		expect(entryForm).toBeInTheDocument();
	});

	it('When Trends button is clicked, the Trends component renders', () => {
		const { getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const trendsBtn = getByText('TRENDS');

		fireEvent.click(trendsBtn);

		const trendsTitle = getByText('Trends');
	
		expect(trendsTitle).toBeInTheDocument();
	});

	it('On the Trends page, the back button takes user back to Home', () => {
		const { getByAltText, getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const trendsBtn = getByText('TRENDS');

		fireEvent.click(trendsBtn);

		const backBtn = getByAltText('Back icon');

		fireEvent.click(backBtn)

		const entryFormTitle = getByText('New Food Entry');

		expect(entryFormTitle).toBeInTheDocument();
	});

	it('When food log is expanded, the LogDetails component renders', () => {
		const { getAllByAltText, getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const trendsBtn = getAllByAltText('Expand log');

		fireEvent.click(trendsBtn[0])

		const foodLogInfo1 = getByText('You reportedly ate');
		const foodLogInfo2 = getByText('hummus on this day.');

		expect(foodLogInfo1).toBeInTheDocument();
		expect(foodLogInfo2).toBeInTheDocument();
	});

	it('On the LogDetails page, the back button takes user back to Home', () => {
		const { getAllByAltText, getByAltText, getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const trendsBtn = getAllByAltText('Expand log');

		fireEvent.click(trendsBtn[0])

		const backBtn = getByAltText('Back icon');

		fireEvent.click(backBtn);

		const entryFormTitle = getByText('New Food Entry');

		expect(entryFormTitle).toBeInTheDocument();
	});

	it('The application title brings the user back to Home', () => {
		const { getAllByAltText, getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const trendsBtn = getAllByAltText('Expand log');

		fireEvent.click(trendsBtn[0])

		const appTitle = getByText('Food Diary');

		fireEvent.click(appTitle);

		const entryFormTitle = getByText('New Food Entry');

		expect(entryFormTitle).toBeInTheDocument();
	});

	it.skip('On the EntryForm, the search input retrieves data actively', async () => {
		const { getByLabelText, getByText } = render(
			<MemoryRouter><App /></MemoryRouter>
			);

		jest.mock(EntryForm.handleSearchChange).mockResolvedValue(() => {
			return returnedSearch
		});
		
		const searchInput = getByLabelText('search');
		
		await waitFor(() => fireEvent.keyDown(searchInput))
		// fireEvent.keyPress(searchInput) //try user event type dependency
		
		// userEvent.type(searchInput, 'appl')
		// await waitFor(() => userEvent.type(searchInput, 'appl'));

		const searchResult1 = await waitFor(() => getByText('apple'));

		expect(searchResult1).toBeInTheDocument();
	});
})