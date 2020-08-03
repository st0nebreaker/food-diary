import React from 'react';
import LogDetails from './LogDetails';
import '@testing-library/jest-dom';
import { mockEntry } from '../test-data';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('LogDetails', () => {
  it('Should display the date of the entry', () => {
    const { getByText } = render(
      <MemoryRouter>
					<LogDetails 
						entryLog={mockEntry} 
					/>
      </MemoryRouter>
    );

    const entryDate = getByText('Sun 07 26 2020');

    expect(entryDate).toBeInTheDocument();
	});

  it('Should display the entry information', () => {
    const { getByText } = render(
      <MemoryRouter>
					<LogDetails 
						entryLog={mockEntry} 
					/>
      </MemoryRouter>
    );

    const foodDescriptor = getByText('You reportedly ate');
    const foodInfo = getByText('hummus on this day.');
    const symptomDescriptor = getByText('You reported notable symptoms of');
    const symptomInfo = getByText('nausea on this day.');

		expect(foodDescriptor).toBeInTheDocument();
    expect(foodInfo).toBeInTheDocument();
    expect(symptomDescriptor).toBeInTheDocument();
    expect(symptomInfo).toBeInTheDocument();
	});
})