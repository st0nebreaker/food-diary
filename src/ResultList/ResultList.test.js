import React from 'react';
import ResultList from './ResultList';
import '@testing-library/jest-dom';
import { returnedSearch } from '../test-data';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ResultList', () => {
  it('Should display the search results from the users typed search', () => {
    const mockFindFood = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
					<ResultList 
						items={returnedSearch.common} 
						findFood={mockFindFood} 
						resultListActive={true} 
					/>
      </MemoryRouter>
    );

    const searchResult1 = getByText('apple');
    const searchResult2 = getByText('apples');

    expect(searchResult1).toBeInTheDocument();
    expect(searchResult2).toBeInTheDocument();
	});

  it('Should display the images of search results', () => {
    const mockFindFood = jest.fn();

    const { getAllByAltText } = render(
      <MemoryRouter>
					<ResultList 
						items={returnedSearch.common} 
						findFood={mockFindFood} 
						resultListActive={true} 
					/>
      </MemoryRouter>
    );

    const searchResultPictures = getAllByAltText('food item');

		expect(searchResultPictures.length).toEqual(2);
	});
	
	it('If a result is clicked on, findFood function should fire', () => {
    const mockFindFood = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
					<ResultList 
						items={returnedSearch.common} 
						findFood={mockFindFood} 
						resultListActive={true} 
					/>
      </MemoryRouter>
    );

    const searchResult1 = getByText('apple');

		fireEvent.click(searchResult1);

    expect(mockFindFood).toHaveBeenCalled();
	});
})