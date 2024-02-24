import { PeopleType } from "../types";

type PeopleDropdownProps = {
    searchQuery: string;
    selections: PeopleType[] | null;
    toggleSelection: (selection: PeopleType, isSelected: boolean) => void;
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
    toggleSelection,
}: PeopleDropdownProps) {
    return (peopleList?.length || 0) > 0 ? (
        peopleList?.map((person) => {
            const isSelected = Boolean(
                selections?.find((selection) => person.name === selection.name),
            );
            return (
                <li key={person.name} role="option" aria-selected={isSelected}>
                    <button
                        onClick={() => toggleSelection(person, isSelected)}
                        className={isSelected ? "active" : ""}
                    >
                        {searchQuery
                            ? generateAutocompleteResult(person.name, searchQuery)
                            : person.name}
                    </button>
                </li>
            );
        })
    ) : (
        <li>
            <p>No results found</p>
        </li>
    );
}

export default PeopleDropdownList;
