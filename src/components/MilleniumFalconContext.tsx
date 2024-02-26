import { createContext } from "react";

import { PeopleType } from "../types";

export type MilleniumFalconContextType = {
    allSelections: PeopleType[];
};

const MilleniumFalconContext = createContext<MilleniumFalconContextType | null>(null);

export default MilleniumFalconContext;
