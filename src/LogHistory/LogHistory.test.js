import React from 'react';
import LogHistory from './LogHistory';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { data1, data2 } from '../data';

describe('LogHistory', () => {
  it('Should display log history component title and section', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LogHistory 
					loggedEntries={[data1, data2]}
				/>
      </MemoryRouter>
    );

    const title = getByText('Food History');

		expect(title).toBeInTheDocument();
	});

  it('Should display all previously logged entries', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LogHistory 
					loggedEntries={[data1, data2]}
				/>
      </MemoryRouter>
    );

    const date1 = getByText('Sun 07 26 2020');
    const food1 = getByText('hummus');
    const date2 = getByText('Mon 07 27 2020');
    const food2 = getByText('cake');

		expect(date2).toBeInTheDocument();
    expect(food1).toBeInTheDocument();
    expect(date1).toBeInTheDocument();
    expect(food2).toBeInTheDocument();
	});
})