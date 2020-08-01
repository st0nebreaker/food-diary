import React from "react";
import FoodInfo from "./FoodInfo";
import "@testing-library/jest-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { fetchFood } from "../apiCalls";
import { fetchedFood } from '../test-data';
jest.mock("../apiCalls");

describe("FoodInfo", () => {
  fetchFood.mockResolvedValue(() => {
		return fetchedFood
	});

  it("Should display the fetched food title", () => {
    const { getByText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
        />
      </MemoryRouter>
    );

    const detailTitle = getByText("hummus");

    expect(detailTitle).toBeInTheDocument();
  });

  it("Should display the fetched food nutrient info", () => {
    const { getByText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
        />
      </MemoryRouter>
    );

    const serving = getByText("Serving size:");
    const servingQuantity = getByText("0.25 cup (60g)");
    const calories = getByText("Calories:");
    const caloriesNum = getByText("99.6");
    const fat = getByText("Total Fat:");
    const fatQuantity = getByText("5.76g");

		expect(serving).toBeInTheDocument();
    expect(servingQuantity).toBeInTheDocument();
    expect(calories).toBeInTheDocument();
    expect(caloriesNum).toBeInTheDocument();
    expect(fat).toBeInTheDocument();
    expect(fatQuantity).toBeInTheDocument();
  });

  it("Should display the food image", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
        />
      </MemoryRouter>
    );

    const foodImg = getByAltText("food item");

		expect(foodImg).toBeInTheDocument();
  });

  it("Should display the exit and add to form buttons", () => {
    const { getByText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
        />
      </MemoryRouter>
    );

    const exitBtn = getByText("X");
    const addBtn = getByText("ADD TO FORM");

		expect(exitBtn).toBeInTheDocument();
		expect(addBtn).toBeInTheDocument();
  });

  it("Should display the exit and add to form buttons", () => {
    const { getByText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
        />
      </MemoryRouter>
    );

    const exitBtn = getByText("X");
    const addBtn = getByText("ADD TO FORM");

		expect(exitBtn).toBeInTheDocument();
		expect(addBtn).toBeInTheDocument();
  });

  it("If clicked, the exit button should fire off event to hide the modal", () => {
		const mockClose = jest.fn();
		const mockAddFood = jest.fn();

		const { getByText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
					handleAdd={mockAddFood}
					closeFoodCard={mockClose}
        />
      </MemoryRouter>
    );

    const exitBtn = getByText("X");

		fireEvent.click(exitBtn);

		expect(mockClose).toHaveBeenCalled();
  });

  it("If clicked, the add button should fire off event to add the food item to the form", () => {
		const mockClose = jest.fn();
		const mockAddFood = jest.fn();

		const { getByText } = render(
      <MemoryRouter>
        <FoodInfo
					food={fetchedFood} 
					handleAdd={mockAddFood}
					closeFoodCard={mockClose}
        />
      </MemoryRouter>
    );

    const addBtn = getByText("ADD TO FORM");

		fireEvent.click(addBtn);

		expect(mockAddFood).toHaveBeenCalled();
  });
});
