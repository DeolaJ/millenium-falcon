import { useCallback, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import PeopleDropdown from "./PeopleDropdown";
import PeopleCard from "./PeopleCard";
import Pagination from "./Pagination";
import PeopleSelectPagination from "./PeopleSelectPagination";

import usePeople from "../hooks/usePeople";
import usePeopleImages from "../hooks/usePeopleImages";

import { MilleniumFalconCharacters, PeopleType } from "../types";

import { selectionRevealVariant } from "../constants/variants";

import "./PeopleSelect.scss";

type PeopleSelectProps = {
    type: MilleniumFalconCharacters;
    maxSelections: number;
    next: () => void;
    updateForm: (peopleList: PeopleType[], type: MilleniumFalconCharacters) => void;
    saveSelections: PeopleType[] | null;
    previous?: () => void;
    nextText?: string;
    canPreviousStage?: boolean;
};

function PeopleSelect({
    type,
    maxSelections,
    next,
    updateForm,
    saveSelections,
    ...props
}: PeopleSelectProps) {
    const { data: images } = usePeopleImages();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, isFetching } = usePeople(search, page);

    const [isEntry, setIsEntry] = useState(true);
    const [selections, setSelections] = useState<PeopleType[] | null>(saveSelections);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleSelection = useCallback(
        (selection: PeopleType, isSelected?: boolean) => {
            if (isSelected) {
                // Remove selection
                setIsEntry(false);
                setSelections((prevSelections) =>
                    prevSelections
                        ? prevSelections?.filter(
                              (prevSelection) => prevSelection.name !== selection.name,
                          )
                        : null,
                );
                return;
            }
            // If maximum has been reached, no selection is made
            if ((selections?.length || 0) >= maxSelections) {
                return;
            }
            // Add selection
            setIsEntry(true);
            setSelections((prevSelections) => [...(prevSelections || []), selection]);
        },
        [selections],
    );

    useEffect(() => {
        // Reset page when search param changes
        setPage(1);
    }, [search]);

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => setErrorMessage(""), 3000);
        }
    }, [errorMessage]);

    return (
        <section className="people-select">
            {(selections?.length || 0) > 0 && (
                <div className="people-select--display">
                    <h2>Selected {type}</h2>

                    <div className="people-select--display-list">
                        <AnimatePresence mode="sync" custom={isEntry}>
                            {selections?.map((selection) => (
                                <motion.div
                                    key={selection.name}
                                    custom={isEntry}
                                    initial="initial"
                                    exit="exit"
                                    variants={selectionRevealVariant}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="people-select--card-wrapper"
                                >
                                    <button
                                        className="people-select--remove-button"
                                        onClick={() => toggleSelection(selection, true)}
                                        aria-label="Remove selection"
                                    >
                                        <IoIosCloseCircle />
                                    </button>
                                    <PeopleCard
                                        people={selection}
                                        avatarUrl={images[selection.name]}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            <div className="people-select--dropdown-wrapper">
                <h2 className="people-select--dropdown-title">
                    Select {maxSelections} {type}
                </h2>
                <PeopleDropdown
                    type={type}
                    setSearchString={setSearch}
                    maxSelections={maxSelections}
                    peopleList={data?.results}
                    isLoading={isFetching}
                    selections={selections}
                    toggleSelection={toggleSelection}
                    className="people-select--dropdown"
                >
                    <Pagination
                        isFirstIndex={page === 1}
                        next={() => setPage((prevPage) => prevPage + 1)}
                        previous={() => setPage((prevPage) => prevPage - 1)}
                        canNextPage={Boolean(data?.next)}
                        canPreviousPage={Boolean(data?.previous)}
                    />
                </PeopleDropdown>
            </div>

            <PeopleSelectPagination
                next={() => {
                    if (selections?.length !== maxSelections) {
                        setErrorMessage(`Please select ${maxSelections} ${type}`);
                        return;
                    }
                    updateForm(selections, type);
                    next();
                }}
                errorMessage={errorMessage}
                {...props}
            />
        </section>
    );
}

export default PeopleSelect;
