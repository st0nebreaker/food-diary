import React from 'react';
import FoodLog from './FoodLog';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('FoodLog', () => {
  it('Should hold the date for the logged entry', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FoodLog 
					key={0}
					date={'Sun 07 26 2020'}
					comment={['hummus']}
					food={['bloated']}
				/>
      </MemoryRouter>
    );

    const date = getByText('Sun 07 26 2020');

    expect(date).toBeInTheDocument();
	});
	
  it('Should hold the foods consumed for the logged entry', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FoodLog 
					key={0}
					date={'Sun 07 26 2020'}
					comment={['hummus']}
					food={['bloated']}
				/>
      </MemoryRouter>
    );

    const foodsConsumed = getByText('food consumed:');
    const food = getByText('hummus');

		expect(foodsConsumed).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });
	
  it('Should have an expandable icon on the card', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <FoodLog 
					key={0}
					date={'Sun 07 26 2020'}
					comment={['hummus']}
					food={['bloated']}
				/>
      </MemoryRouter>
    );

    const foodsConsumed = getByAltText('Expand log');

		expect(foodsConsumed).toBeInTheDocument();
  });
})