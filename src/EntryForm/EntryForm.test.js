import React from "react";
import EntryForm from "./EntryForm";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("CocktailDetails", () => {
  it("Should render the form inputs correctly", () => {
    const mockFindFood = jest.fn();
		const mockClearChosenFood = jest.fn();
		const mockShowResults = jest.fn();
		const mockAdd = jest.fn();

    const { getByPlaceholderText, getAllByLabelText } = render(
      <MemoryRouter>
        <EntryForm
					findFood={mockFindFood} 
					chosenFoods={[]}
					clearChosenFood={mockClearChosenFood}
					showResultList={mockShowResults}
					resultListActive={true} 
					addToLog={mockAdd}
        />
      </MemoryRouter>
    );

		const foodSearch = getByPlaceholderText('search food items...');
    const symptomCheckBoxes = getAllByLabelText('symptom-picker');

		expect(foodSearch).toBeInTheDocument();
		expect(symptomCheckBoxes.length).toEqual(6);
	});
	
  it("Should display form title", () => {
    const mockFindFood = jest.fn();
		const mockClearChosenFood = jest.fn();
		const mockShowResults = jest.fn();
		const mockAdd = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <EntryForm
					findFood={mockFindFood} 
					chosenFoods={[]}
					clearChosenFood={mockClearChosenFood}
					showResultList={mockShowResults}
					resultListActive={true} 
					addToLog={mockAdd}
        />
      </MemoryRouter>
    );

		const formTitle = getByText('New Food Entry');

		expect(formTitle).toBeInTheDocument();
  });

  it("Should fire addToLog when form is submitted", () => {
    const mockFindFood = jest.fn();
		const mockClearChosenFood = jest.fn();
		const mockShowResults = jest.fn();
		const mockAdd = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <EntryForm
					findFood={mockFindFood} 
					chosenFoods={[]}
					clearChosenFood={mockClearChosenFood}
					showResultList={mockShowResults}
					resultListActive={true} 
					addToLog={mockAdd}
        />
      </MemoryRouter>
    );

		const submitBtn = getByText('LOG')

		fireEvent.click(submitBtn)

		expect(mockAdd).toHaveBeenCalled();
  });
});