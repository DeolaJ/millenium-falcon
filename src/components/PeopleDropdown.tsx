import { useRef, useState, useEffect, ReactNode } from "react";
import { useDebouncedCallback } from "use-debounce";
import { IoIosCloseCircle } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

import PeopleDropdownList from "./PeopleDropdownList";
import PeopleLoader from "./PeopleLoader";

import { PeopleType } from "../types";

import "./PeopleDropdown.scss";

type PeopleDropdownProps = {
    children: ReactNode;
    type: string;
    isLoading: boolean;
    selections: PeopleType[] | null;
    toggleSelection: (selection: PeopleType, isSelected: boolean) => void;
    setSearchString: (query: string) => void;
    peopleList?: PeopleType[];
    className?: string;
};

function isLetterKey(letter: string) {
    if (letter.length > 1) return false;
    const characterCode = letter.charCodeAt(0);
    // If character code is within the bounds of [A-Z] or [a-z]
    if (
        (characterCode >= 65 && characterCode <= 90) ||
        (characterCode >= 97 && characterCode <= 122)
    ) {
        return true;
    }
    return false;
}

function PeopleDropdown({
    children,
    type,
    setSearchString,
    peopleList,
    isLoading,
    selections,
    toggleSelection,
    className,
}: PeopleDropdownProps) {
    const OuterOverlay = useRef<HTMLDivElement>(null);
    const dropdownOverlayRef = useRef<HTMLDivElement>(null);
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const dropdownListRef = useRef<HTMLUListElement>(null);
    const dropdownInputRef = useRef<HTMLInputElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const lastActiveELement = useRef<Element | null>(null); // Last active focusable element before the dropdown was opened
    const firstTrapRef = useRef<Element | null>(null); // First focusable element in the dropdown
    const lastTrapRef = useRef<Element | null>(null); // Last focusable element in the dropdown

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    // Manages state of local input element
    const [searchQuery, setSearchQuery] = useState("");

    function setTrapElements() {
        // Get all focusable elements in the dropdown menu body
        const allFocusableElements = dropdownMenuRef.current?.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]',
        );
        // Set the first and last focusable elements
        firstTrapRef.current = allFocusableElements?.[0] || null;
        lastTrapRef.current = allFocusableElements?.[allFocusableElements?.length - 1] || null;
    }

    const searchList = useDebouncedCallback((query: string) => {
        const searchString = query.trim();
        setSearchString(searchString);
    }, 800);

    useEffect(() => {
        const dropdownOverlay = dropdownOverlayRef.current;
        // Focus on input when the dropdown opens
        if (dropdownOverlay && isDropdownVisible) {
            dropdownInputRef.current?.focus();
            // Set the first and last focusable elements
            setTrapElements();
            return;
        }
        dropdownButtonRef.current?.focus();
        setSearchString("");
    }, [isDropdownVisible]);

    useEffect(() => {
        searchList(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        // Focus on input when fetching stops
        if (!isLoading) {
            dropdownInputRef.current?.focus();
            setTrapElements();
        }
    }, [isLoading]);

    const handleKeyboard = useRef((e: KeyboardEvent) => {
        const path = e?.composedPath();
        // Escape button closes the dropdown overlay
        if (e.key === "Esc" || e.key === "Escape") {
            setIsDropdownVisible(false);
            return;
        }

        // Trap tabbing forward and backward inside modal
        if (e.key === "Tab") {
            if (e.shiftKey) {
                // Shift + Tab (tabbing backwards)
                if (document.activeElement === firstTrapRef.current && lastTrapRef.current) {
                    // If the activeElement is the first trap element, focus on the last element in the cycle
                    e.preventDefault();
                    (lastTrapRef.current as HTMLElement)?.focus();
                }
            } else {
                // Tab (tabbing forward)
                if (document.activeElement === lastTrapRef.current && firstTrapRef.current) {
                    // If the activeElement is the last trap element, focus on the first element in the cycle
                    e.preventDefault();
                    (firstTrapRef.current as HTMLElement)?.focus();
                }
            }
        }

        // Handle searching on letter click
        if (
            dropdownOverlayRef?.current &&
            !path.includes(dropdownInputRef?.current as HTMLInputElement)
        ) {
            // Handle adding text
            if (isLetterKey(e.key) || e.key === "Backspace") {
                dropdownInputRef.current?.focus();
                return;
            }
        }

        // Keyboard Actions in Dropdown List
        if (path.includes(dropdownListRef?.current as HTMLElement)) {
            // Up arrow key aids navigation up the list
            if (e.key === "ArrowUp") {
                const currentListItem = (e.target as HTMLElement)?.parentNode;
                const previousOption = currentListItem?.previousSibling?.childNodes[0];
                if (!previousOption) {
                    return;
                }
                (previousOption as HTMLElement).focus();
                return;
            }
            // Down arrow key aids navigation down the list
            if (e.key === "ArrowDown") {
                const currentListItem = (e.target as HTMLElement)?.parentNode;
                const nextOption = currentListItem?.nextSibling?.childNodes[0];
                if (!nextOption) {
                    return;
                }
                (nextOption as HTMLElement).focus();
            }
        }
    });

    const closeOuter = useRef((e: MouseEvent) => {
        // Close dropdown is area outside the dropdown is clicked
        if (e.target === OuterOverlay.current) {
            setIsDropdownVisible(false);
            (lastActiveELement.current as HTMLElement)?.focus();
        }
    });

    useEffect(() => {
        const closeOuterFunc = closeOuter.current;
        const handleKeyboardFunc = handleKeyboard.current;

        // Clicking outside closes the Dropdown
        window.addEventListener("click", closeOuterFunc);
        window.addEventListener("keydown", handleKeyboardFunc);

        // Set the last active element
        lastActiveELement.current = document.activeElement;

        return () => {
            window.removeEventListener("click", closeOuterFunc);
            window.removeEventListener("keydown", handleKeyboardFunc);
        };
    }, []);

    return (
        <div className={`people-dropdown ${className}`}>
            {isDropdownVisible && (
                <div className="people-dropdown--outer-overlay" ref={OuterOverlay} />
            )}

            {!isDropdownVisible && (
                <button
                    type="button"
                    onClick={() => {
                        if (peopleList?.length !== 0) {
                            setIsDropdownVisible((prevValue) => !prevValue);
                        }
                    }}
                    aria-haspopup="listbox"
                    aria-disabled={peopleList?.length === 0}
                    ref={dropdownButtonRef}
                    aria-expanded={isDropdownVisible}
                    className={`people-dropdown--button ${isDropdownVisible ? "active" : ""} ${peopleList?.length === 0 || isLoading ? "disabled" : ""}`}
                >
                    <span>
                        {selections?.length
                            ? selections.map((person) => person.name).join(", ")
                            : `Search ${type?.toLowerCase()}s`}
                    </span>
                    {isLoading && <span className="sr-only">Loading</span>}
                </button>
            )}

            {isDropdownVisible && (
                <div className="people-dropdown--overlay" ref={dropdownOverlayRef}>
                    <div className="people-dropdown--menu" ref={dropdownMenuRef}>
                        <button
                            type="button"
                            className="people-dropdown--close-button"
                            ref={closeButtonRef}
                            onClick={() => setIsDropdownVisible(false)}
                            aria-label="Close dropdown menu"
                        >
                            <IoIosCloseCircle />
                        </button>

                        <div className="people-dropdown--search">
                            <input
                                type="search"
                                aria-label={`Search ${type}s`}
                                placeholder={`Search ${type}s`}
                                className="people-dropdown--input"
                                ref={dropdownInputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onBlur={(e) => setSearchQuery(e.target.value)}
                            />
                            <FiSearch className="people-dropdown--icon" aria-hidden />
                        </div>

                        <p className="sr-only" id="dropdown--list">
                            {`${type}'s list.`}
                        </p>

                        <ul
                            className="people-dropdown--list"
                            role="listbox"
                            aria-label="dropdown-list"
                            tabIndex={0}
                            ref={dropdownListRef}
                        >
                            {isLoading && <PeopleLoader />}
                            {!isLoading && peopleList && (
                                <PeopleDropdownList
                                    searchQuery={searchQuery}
                                    selections={selections}
                                    peopleList={peopleList}
                                    toggleSelection={toggleSelection}
                                />
                            )}
                        </ul>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PeopleDropdown;
