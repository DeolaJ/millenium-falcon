import { useCallback, useEffect, useState } from "react";
import { MdOutlineBuildCircle, MdRocketLaunch } from "react-icons/md";
import { Player } from "@lottiefiles/react-lottie-player";

import PeopleCard from "./PeopleCard";

import usePeopleImages from "../hooks/usePeopleImages";

import { MilleniumFalconFormType } from "../types";

function MilleniumFalconOutro({
    characters,
    reset,
}: {
    characters: MilleniumFalconFormType;
    reset: () => void;
}) {
    const { data: images } = usePeopleImages();

    const [counter, setCounter] = useState(5);
    const [isRocketAnimating, setIsRocketAnimating] = useState(false);
    const [isLaunched, setIsLaunched] = useState(false);
    const [timerId, setTimerId] = useState<number>();

    const startCountdown = useCallback(() => {
        let timerId = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter === 1) {
                    clearInterval(timerId);
                    setIsLaunched(true);
                    setIsRocketAnimating(true);
                    return 0;
                }
                return prevCounter - 1;
            });
        }, 1000);
        setTimerId(timerId);
    }, []);

    useEffect(() => {
        return () => clearInterval(timerId);
    }, [timerId]);

    useEffect(() => {
        if (isRocketAnimating) {
            setTimeout(() => setIsRocketAnimating(false), 4000);
        }
    }, [isRocketAnimating]);

    const handleLaunch = useCallback(() => {
        startCountdown();
    }, [startCountdown]);

    return (
        <div className="millenium-falcon--page is-light-mode outro-page">
            {!isLaunched ? (
                <>
                    {timerId ? (
                        <p className="millenium-falcon--page-countdown">{counter}</p>
                    ) : (
                        <>
                            <h2 className="millenium-falcon--page-title">
                                Time to explore the galaxy
                            </h2>
                            <button
                                onClick={handleLaunch}
                                className="millenium-falcon--page-button"
                            >
                                <MdRocketLaunch className="millenium-falcon--page-icon" />
                                <span>Launch</span>
                            </button>
                            <div className="millenium-falcon--page-characters">
                                {characters?.["crew members"]?.map((character) => (
                                    <PeopleCard
                                        key={character.name}
                                        people={character}
                                        avatarUrl={images[character.name]}
                                        type="crew members"
                                        isPreview
                                    />
                                ))}
                                {characters?.["passengers"]?.map((character) => (
                                    <PeopleCard
                                        key={character.name}
                                        people={character}
                                        avatarUrl={images[character.name]}
                                        type="passengers"
                                        isPreview
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    {isRocketAnimating ? (
                        <div className="falcon-animation">
                            <Player
                                src="https://lottie.host/067a979a-2ec6-4410-902c-b6a7066983d3/AndUoRgOHE.json"
                                autoplay={true}
                                loop={false}
                                speed={0.7}
                            />
                        </div>
                    ) : (
                        <>
                            <h2 className="millenium-falcon--page-title">Great Job!</h2>
                            <button onClick={reset} className="millenium-falcon--page-button">
                                <MdOutlineBuildCircle className="millenium-falcon--page-icon" />
                                <span>Build new team</span>
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default MilleniumFalconOutro;
