import { useQuery } from "@tanstack/react-query";

import { PeopleResponseType } from "../types";

const PEOPLE_BASE_URL = "https://swapi.dev/api/people/";

function getQueryUrl(search?: string, page?: number) {
    if (search && page) {
        return `${PEOPLE_BASE_URL}?search=${search}&page=${page}`;
    }
    if (search) {
        return `${PEOPLE_BASE_URL}?search=${search}`;
    }
    if (page) {
        return `${PEOPLE_BASE_URL}?page=${page}`;
    }
    return PEOPLE_BASE_URL;
}

async function fetchPeople(search?: string, page?: number): Promise<PeopleResponseType> {
    const url = getQueryUrl(search, page);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const peopleResponse: PeopleResponseType = await response.json();
    return peopleResponse;
}

export default function usePeople(search?: string, page?: number) {
    return useQuery({
        queryKey: ["people", search || null, page || null],
        queryFn: () => fetchPeople(search, page),
        staleTime: Infinity,
    });
}
