import { useContext } from "react";

import MilleniumFalconContext from "./MilleniumFalconContext";

import { PeopleType } from "../types";

type PeopleDropdownProps = {
    searchQuery: string;
    selections: PeopleType[] | null;
    toggleSelection: (selection: PeopleType, isSelected: boolean) => void;
    isSelectable: boolean;
    peopleList?: PeopleType[];
};

const generateAutocompleteResult = (name: string, query: string) => {
    const queryIndex = name?.toLowerCase().indexOf(query?.toLowerCase().trim());
    // If search paramater is at the beginning of the name
    if (queryIndex === 0) {
        return (
            <>
                <strong>{name.substring(queryIndex, query.length)}</strong>
                {name.substring(queryIndex + query.length)}
            </>
        );
    }
    // If search paramater is at the end of the name string
    if (queryIndex === name.length - query.length) {
        return (
            <>
                {name.substring(0, queryIndex)}
                <strong>{name.substring(queryIndex)}</strong>
            </>
        );
    }
    // If search parameter is within the book string
    if (queryIndex !== -1) {
        return (
            <>
                {name.substring(0, queryIndex)}
                <strong>{name.substring(queryIndex, queryIndex + query.length)}</strong>
                {name.substring(queryIndex + query.length)}
            </>
        );
    }
    return name;
};

function PeopleDropdownList({
    searchQuery,
    selections,
    peopleList,
    isSelectable,
    toggleSelection,
}: PeopleDropdownProps) {
    const context = useContext(MilleniumFalconContext);
    const allSelections = context?.allSelections;

    return (peopleList?.length || 0) > 0 ? (
        peopleList?.map((person) => {
            // Checks if current person has been selected within the current type
            const isSelected = Boolean(
                selections?.find((selection) => person.name === selection.name),
            );
            // Checks if current person has been selected in another type
            const isAllSelected = Boolean(
                allSelections?.find((selection) => person.name === selection.name),
            );
            const isDisabled = !isSelectable || isAllSelected;
            return (
                <li
                    key={person.name}
                    tabIndex={0}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                        // Disable selection if current person has been been saved or If current person hasn't been selected and we can't add more selections
                        if (isAllSelected || (!isSelected && !isSelectable)) {
                            return;
                        }
                        toggleSelection(person, isSelected);
                    }}
                    className={`${isSelected ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
                    aria-disabled={isDisabled ? true : false}
                >
                    {searchQuery
                        ? generateAutocompleteResult(person.name, searchQuery)
                        : person.name}
                </li>
            );
        })
    ) : (
        <li>No results found</li>
    );
}

export default PeopleDropdownList;
