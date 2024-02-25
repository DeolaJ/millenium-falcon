import { MdOutlineBuildCircle } from "react-icons/md";

function MilleniumFalconIntro({ next }: { next: () => void }) {
    return (
        <div className="millenium-falcon--page">
            <h2 className="millenium-falcon--page-title">Welcome to the Millenium Falcon</h2>
            <button onClick={next} className="millenium-falcon--page-button">
                <MdOutlineBuildCircle className="millenium-falcon--page-icon" />
                <span>Build your team</span>
            </button>
            <p>To protect the galaxy</p>
        </div>
    );
}

export default MilleniumFalconIntro;
