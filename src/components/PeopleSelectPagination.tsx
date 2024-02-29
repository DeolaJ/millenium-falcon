import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

import "./Pagination.scss";

function PeopleSelectPagination({
    nextText,
    previousText,
    canPreviousStage,
    next,
    previous,
    errorMessage,
}: {
    next: () => void;
    previous?: () => void;
    canPreviousStage?: boolean;
    nextText?: string;
    previousText?: string;
    errorMessage?: string;
}) {
    return (
        <div className="people-select--pagination--wrapper">
            {errorMessage && (
                <div className="pagination--error">
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className={`pagination ${!canPreviousStage ? "flex-end" : ""}`}>
                {canPreviousStage && (
                    <button
                        onClick={previous}
                        className="pagination--button"
                        aria-label="previous page"
                    >
                        <ImArrowLeft2
                            className="pagination--button-icon previous-icon"
                            aria-hidden
                        />
                        {previousText || "Previous"}
                    </button>
                )}

                <button className="pagination--button" onClick={next} aria-label="next page">
                    {nextText || "Next"}
                    <ImArrowRight2 className="pagination--button-icon next-icon" aria-hidden />
                    {errorMessage && <span className="sr-only">{errorMessage}</span>}
                </button>
            </div>
        </div>
    );
}

export default PeopleSelectPagination;
