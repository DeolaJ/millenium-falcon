import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";

import MilleniumFalconContext, {
    MilleniumFalconContextType,
} from "../components/MilleniumFalconContext";
import PeopleDropdown from "../components/PeopleDropdown";

import peopleMock from "../mocks/people";

import { PeopleType } from "../types";

expect.extend(toHaveNoViolations);

// Mocked context provider
const mockContextValue: MilleniumFalconContextType = {
    allSelections: [{ ...peopleMock[0] }, { ...peopleMock[1] }], // Luke Skywalker, Darth Vader
};

// Mocked props
const mockedPeopleList = peopleMock;
const mockedSelections: PeopleType[] = [];

describe("PeopleDropdown", () => {
    test("should not have basic accessibility issues", async () => {
        const mockedToggleSelection = jest.fn();
        const mockedSetSearchString = jest.fn();

        const { container } = render(
            <PeopleDropdown
                type="crew members"
                setSearchString={mockedSetSearchString}
                peopleList={mockedPeopleList}
                maxSelections={5}
                isLoading={false}
                selections={mockedSelections}
                toggleSelection={mockedToggleSelection}
            >
                test children
            </PeopleDropdown>,
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("toggles dropdown visibility on button click", async () => {
        const mockedToggleSelection = jest.fn();
        const mockedSetSearchString = jest.fn();

        render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdown
                    type="crew members"
                    setSearchString={mockedSetSearchString}
                    peopleList={mockedPeopleList}
                    maxSelections={4}
                    isLoading={false}
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                >
                    test children
                </PeopleDropdown>
            </MilleniumFalconContext.Provider>,
        );

        // Click dropdown button
        await userEvent.click(screen.getByRole("button", { name: /Select 4 crew members/i }));

        // Check if the input field is visible
        expect(screen.getByLabelText(/Search crew members/i)).toBeInTheDocument();

        // Click the close dropdown menu button
        await userEvent.click(screen.getByLabelText("Close dropdown menu"));

        // Check if the input field is no longer visible and the dropdown button is visible
        expect(screen.queryByLabelText(/Search crew members/i)).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Select 4 crew members/i })).toBeInTheDocument();

        // Check if the dropdown button receives focus after
        expect(screen.getByRole("button", { name: /Select 4 crew members/i })).toHaveFocus();
    });

    test("closes dropdown menu on Escape key", async () => {
        const mockedToggleSelection = jest.fn();
        const mockedSetSearchString = jest.fn();

        render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdown
                    type="crew members"
                    setSearchString={mockedSetSearchString}
                    peopleList={mockedPeopleList}
                    maxSelections={4}
                    isLoading={false}
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                >
                    test children
                </PeopleDropdown>
            </MilleniumFalconContext.Provider>,
        );

        // Click dropdown button
        await userEvent.click(screen.getByRole("button", { name: /Select 4 crew members/i }));

        // Check if the input field is visible
        expect(screen.getByLabelText(/Search crew members/i)).toBeInTheDocument();

        // Press the Escape key
        await userEvent.keyboard("{Escape}");

        // Check if the input field is no longer visible and the dropdown is visible
        expect(screen.queryByLabelText(/Search crew members/i)).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Select 4 crew members/i })).toBeInTheDocument();

        // Check if the dropdown button receives focus after
        expect(screen.getByRole("button", { name: /Select 4 crew members/i })).toHaveFocus();
    });

    test("allows selecting a person that has not been selected in the context", async () => {
        const mockedToggleSelection = jest.fn();
        const mockedSetSearchString = jest.fn();

        render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdown
                    type="crew members"
                    setSearchString={mockedSetSearchString}
                    peopleList={mockedPeopleList}
                    maxSelections={4}
                    isLoading={false}
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                >
                    test children
                </PeopleDropdown>
            </MilleniumFalconContext.Provider>,
        );

        // Click dropdown button
        await userEvent.click(screen.getByRole("button", { name: /Select 4 crew members/i }));

        // Select new options
        await userEvent.click(screen.getByText("Leia Organa"));
        await userEvent.click(screen.getByText("Han Solo"));

        expect(mockedToggleSelection).toHaveBeenCalled();
        expect(mockedToggleSelection).toHaveBeenCalledTimes(2);
    });

    test("does not allow selecting a person that has been selected in the context", async () => {
        const mockedToggleSelection = jest.fn();
        const mockedSetSearchString = jest.fn();

        render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdown
                    type="crew members"
                    setSearchString={mockedSetSearchString}
                    peopleList={mockedPeopleList}
                    maxSelections={4}
                    isLoading={false}
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                >
                    test children
                </PeopleDropdown>
            </MilleniumFalconContext.Provider>,
        );

        // Open dropdown
        await userEvent.click(screen.getByRole("button", { name: /Select 4 crew members/i }));

        // Select 2 people that are saved in the context
        await userEvent.click(screen.getByText("Luke Skywalker"));
        await userEvent.click(screen.getByText("Darth Vader"));

        expect(mockedToggleSelection).not.toHaveBeenCalled();
    });

    test("does not allow selecting more than the maximum allowed selections", async () => {
        const mockedToggleSelection = jest.fn();
        const mockedSetSearchString = jest.fn();

        const selections = peopleMock.slice(2, 6); // 4 selections

        render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdown
                    type="crew members"
                    setSearchString={mockedSetSearchString}
                    peopleList={mockedPeopleList}
                    maxSelections={4}
                    isLoading={false}
                    selections={selections}
                    toggleSelection={mockedToggleSelection}
                >
                    test children
                </PeopleDropdown>
            </MilleniumFalconContext.Provider>,
        );

        // Open dropdown button
        await userEvent.click(screen.getByRole("button"));

        // Select the 5th person
        await userEvent.click(screen.getByText("Yoda"));

        expect(mockedToggleSelection).not.toHaveBeenCalled();
    });
});
