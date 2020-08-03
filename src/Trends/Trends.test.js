import React from 'react';
import Trends from './Trends';
import '@testing-library/jest-dom';
import { mockTrends } from '../test-data';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Trends', () => {
  it('Should display section Trends title', () => {
    const { getByText } = render(
      <MemoryRouter>
					<Trends 
						trends={mockTrends} 
					/>
      </MemoryRouter>
    );

    const title = getByText('Trends');

    expect(title).toBeInTheDocument();
	});

  it('Should display the calculated trends', () => {
    const { getByText } = render(
      <MemoryRouter>
					<Trends 
						trends={mockTrends} 
					/>
      </MemoryRouter>
    );

    const trendInfo1 = getByText('nausea');
    const trendInfo2 = getByText('hummus');

    expect(trendInfo1).toBeInTheDocument();
    expect(trendInfo2).toBeInTheDocument();
	});

  it('Should display buttons for each trend', () => {
    const { getByText } = render(
      <MemoryRouter>
					<Trends 
						trends={mockTrends} 
					/>
      </MemoryRouter>
    );

    const clearBtn = getByText('CLEAR');
    const takeALookBtn = getByText('TAKE A LOOK');

		expect(clearBtn).toBeInTheDocument();
    expect(takeALookBtn).toBeInTheDocument();
	});

  it('Should display the back button', () => {
    const { getByAltText } = render(
      <MemoryRouter>
					<Trends 
						trends={mockTrends} 
					/>
      </MemoryRouter>
    );

    const clearBtn = getByAltText('Back icon');

		expect(clearBtn).toBeInTheDocument();
	});
})