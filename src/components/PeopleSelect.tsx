import { useCallback, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import PeopleDropdown from "./PeopleDropdown";
import PeopleCard from "./PeopleCard";
import Pagination from "./Pagination";

import usePeople from "../hooks/usePeople";
import usePeopleImages from "../hooks/usePeopleImages";

import { PeopleType } from "../types";

import "./PeopleSelect.scss";

type PeopleSelectProps = {
    type: string;
    maxSelections: number;
};

const selectionRevealVariant = {
    initial: (isEntry: boolean) => ({
        x: isEntry ? 100 : -100,
        opacity: 0,
    }),
    exit: (isEntry: boolean) => ({
        x: isEntry ? -100 : 100,
        opacity: 0,
    }),
};

// type, maxSelections
function PeopleSelect({ type, maxSelections }: PeopleSelectProps) {
    const { data: images } = usePeopleImages();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, isFetching } = usePeople(search, page);

    const [isEntry, setIsEntry] = useState(true);
    const [selections, setSelections] = useState<PeopleType[] | null>(null);

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

    return (
        <section className="people-select">
            {(selections?.length || 0) > 0 && (
                <div className="people-select--display">
                    <h2>Selected {type}s</h2>

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
                <h2 className="people-select--dropdown-title">Select {type}s</h2>
                <PeopleDropdown
                    type={type}
                    setSearchString={setSearch}
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
        </section>
    );
}

export default PeopleSelect;
