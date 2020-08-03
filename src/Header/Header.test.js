import React from 'react';
import Header from './Header';
import { mockTrends } from '../test-data';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('Should display the application title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header trends={mockTrends} />
      </MemoryRouter>
    );

    const title = getByText('Food Diary');

    expect(title).toBeInTheDocument();
  });

  it('Should display the Trends button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header trends={mockTrends} />
      </MemoryRouter>
    );

    const trendsBtn = getByText('TRENDS');

    expect(trendsBtn).toBeInTheDocument();
  });
})