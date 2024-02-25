import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MilleniumFalconContext from "./MilleniumFalconContext";
import MilleniumFalconIntro from "./MilleniumFalconIntro";
import MilleniumFalconOutro from "./MilleniumFalconOutro";
import PeopleSelect from "./PeopleSelect";

import { MilleniumFalconCharacters, MilleniumFalconFormType, PeopleType } from "../types";

import { stageRevealVariant } from "../constants/variants";

function MilleniumFalconForm() {
    const [stage, setStage] = useState(1);
    const [milleniumFalcon, setMilleniumFalcon] = useState<MilleniumFalconFormType>({
        "crew members": null,
        passengers: null,
    });
    const [isEntry, setIsEntry] = useState(true);

    const allSelections = useMemo(
        () =>
            Object.keys(milleniumFalcon).reduce((selections: PeopleType[], type) => {
                const typeSelections = milleniumFalcon[type as MilleniumFalconCharacters];
                return [...selections, ...(typeSelections || [])];
            }, []),
        [milleniumFalcon],
    );

    function updateMilleniumFalcon(peopleList: PeopleType[], type: MilleniumFalconCharacters) {
        setMilleniumFalcon((prevMilleniumFalcon) => ({
            ...prevMilleniumFalcon,
            [type]: peopleList,
        }));
    }

    function next() {
        setIsEntry(true);
        setStage((prevStage) => prevStage + 1);
    }

    function previous() {
        setIsEntry(false);
        setStage((prevStage) => prevStage - 1);
    }

    function falconClass() {
        if (stage === 1) {
            return "intro-page";
        }
        if (stage === 4) {
            return "final-page";
        }
        return "";
    }

    function resetForm() {
        setMilleniumFalcon({
            "crew members": null,
            passengers: null,
        });
        setStage(2);
    }

    return (
        <div className={`millenium-falcon-form ${falconClass()}`}>
            <AnimatePresence mode="wait" custom={isEntry}>
                {stage === 1 && (
                    <motion.div
                        className="millenium-falcon-form--starter"
                        custom={isEntry}
                        initial="initial"
                        exit="exit"
                        variants={stageRevealVariant}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MilleniumFalconIntro next={next} />
                    </motion.div>
                )}
                {stage === 2 && (
                    <motion.div
                        key="crew members"
                        custom={isEntry}
                        initial="initial"
                        exit="exit"
                        variants={stageRevealVariant}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MilleniumFalconContext.Provider value={{ allSelections }}>
                            <PeopleSelect
                                type="crew members"
                                maxSelections={4}
                                updateForm={updateMilleniumFalcon}
                                next={next}
                                saveSelections={milleniumFalcon["crew members"]}
                            />
                        </MilleniumFalconContext.Provider>
                    </motion.div>
                )}
                {stage === 3 && (
                    <motion.div
                        key="passengers"
                        custom={isEntry}
                        initial="initial"
                        exit="exit"
                        variants={stageRevealVariant}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MilleniumFalconContext.Provider value={{ allSelections }}>
                            <PeopleSelect
                                type="passengers"
                                maxSelections={6}
                                updateForm={updateMilleniumFalcon}
                                saveSelections={milleniumFalcon["passengers"]}
                                next={next}
                                previous={previous}
                                nextText="Let's take off"
                                canPreviousStage
                            />
                        </MilleniumFalconContext.Provider>
                    </motion.div>
                )}
                {stage === 4 && (
                    <motion.div
                        custom={isEntry}
                        initial="initial"
                        exit="exit"
                        variants={stageRevealVariant}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MilleniumFalconOutro characters={milleniumFalcon} reset={resetForm} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MilleniumFalconForm;
