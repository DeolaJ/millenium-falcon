import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

import "./Pagination.scss";

function Pagination({
    isFirstIndex,
    canNextPage,
    canPreviousPage,
    next,
    previous,
}: {
    isFirstIndex: boolean;
    canNextPage: boolean;
    canPreviousPage: boolean;
    next: () => void;
    previous: () => void;
}) {
    return (
        <div className={`pagination ${isFirstIndex ? "flex-end" : ""}`}>
            {canPreviousPage && (
                <button
                    onClick={previous}
                    className="pagination--button"
                    aria-label="previous page"
                >
                    <ImArrowLeft2 className="pagination--button-icon previous-icon" aria-hidden />
                    Previous
                </button>
            )}

            {canNextPage && (
                <button className="pagination--button" onClick={next} aria-label="next page">
                    Next
                    <ImArrowRight2 className="pagination--button-icon next-icon" aria-hidden />
                </button>
            )}
        </div>
    );
}

export default Pagination;
