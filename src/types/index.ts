export type PeopleType = {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    url: string;
    created: Date;
    edited: Date;
};

export type PeopleResponseType = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PeopleType[];
};

export type ImageMapType = {
    [key: string]: string;
};

export type MilleniumFalconFormType = {
    "crew members": PeopleType[] | null;
    passengers: PeopleType[] | null;
};

export type MilleniumFalconCharacters = keyof MilleniumFalconFormType;
