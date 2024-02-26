import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";

import MilleniumFalconContext, {
    MilleniumFalconContextType,
} from "../components/MilleniumFalconContext";
import PeopleDropdownList from "../components/PeopleDropdownList";

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
const mockedIsSelectable = true;

describe("PeopleDropdownList", () => {
    test("should not have basic accessibility issues", async () => {
        const mockedToggleSelection = jest.fn();

        const { container } = render(
            <ul role="listbox" aria-label="Select">
                <PeopleDropdownList
                    searchQuery=""
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                    isSelectable={mockedIsSelectable}
                    peopleList={mockedPeopleList}
                />
            </ul>,
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test('renders "No results found" when peopleList is empty', () => {
        const mockedToggleSelection = jest.fn();

        const { getByText } = render(
            <PeopleDropdownList
                searchQuery=""
                selections={mockedSelections}
                toggleSelection={mockedToggleSelection}
                isSelectable={mockedIsSelectable}
                peopleList={[]}
            />,
        );
        expect(getByText("No results found")).toBeInTheDocument();
    });

    test("renders correctly with results", () => {
        const mockedToggleSelection = jest.fn();

        const { getByText } = render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdownList
                    searchQuery=""
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                    isSelectable={mockedIsSelectable}
                    peopleList={mockedPeopleList}
                />
            </MilleniumFalconContext.Provider>,
        );
        // Ensure all names are rendered
        mockedPeopleList.forEach((person) => {
            expect(getByText(person.name)).toBeInTheDocument();
        });
    });

    test("triggers toggleSelection when a person is clicked", async () => {
        const mockedToggleSelection = jest.fn();

        const { getByText } = render(
            <PeopleDropdownList
                searchQuery=""
                selections={mockedSelections}
                toggleSelection={mockedToggleSelection}
                isSelectable={mockedIsSelectable}
                peopleList={mockedPeopleList}
            />,
        );
        // Click on a person
        await userEvent.click(getByText("Luke Skywalker"));
        expect(mockedToggleSelection).toHaveBeenCalledWith(mockedPeopleList[0], false);
    });

    test("does not allow selection of options already saved in the context", async () => {
        const mockedToggleSelection = jest.fn();

        const { getByText } = render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdownList
                    searchQuery=""
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                    isSelectable={mockedIsSelectable}
                    peopleList={mockedPeopleList}
                />
            </MilleniumFalconContext.Provider>,
        );
        // Click on a person that is already saved in allSelections
        const darthVaderOption = getByText("Darth Vader");
        await userEvent.click(darthVaderOption);

        expect(darthVaderOption).toHaveAttribute("aria-selected", "false");

        expect(mockedToggleSelection).not.toHaveBeenCalled();
    });

    test("disables selection of already selected persons", async () => {
        const mockedToggleSelection = jest.fn();

        const { getByText } = render(
            <MilleniumFalconContext.Provider value={mockContextValue}>
                <PeopleDropdownList
                    searchQuery=""
                    selections={mockedSelections}
                    toggleSelection={mockedToggleSelection}
                    isSelectable={mockedIsSelectable}
                    peopleList={mockedPeopleList}
                />
            </MilleniumFalconContext.Provider>,
        );
        // Check if Darth Vader is disabled
        const darthVaderOption = getByText("Darth Vader");
        expect(darthVaderOption).toHaveAttribute("aria-disabled", "true");

        // Ensure that clicking does not trigger selection
        await userEvent.click(darthVaderOption);
        expect(mockedToggleSelection).not.toHaveBeenCalled();
    });
});
