import { createContext } from "react";

import { PeopleType } from "../types";

type MilleniumFalconType = {
    allSelections: PeopleType[];
};

const MilleniumFalconContext = createContext<MilleniumFalconType | null>(null);

export default MilleniumFalconContext;
