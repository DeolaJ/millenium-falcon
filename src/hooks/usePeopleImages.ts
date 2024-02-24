import { useQuery } from "@tanstack/react-query";

import { ImageMapType, PeopleResponseType, PeopleType } from "../types";

import { images } from "../constants/images";

const PEOPLE_BASE_URL = "https://swapi.dev/api/people/";

function generateImageMap(peopleList: PeopleType[]) {
    return peopleList.reduce((imageMap, person, index) => {
        return {
            ...imageMap,
            [person.name]: `${index + 1}.jpg`,
        };
    }, {});
}

async function fetchAllResults(peopleList: PeopleType[], nextUrl?: string): Promise<PeopleType[]> {
    if (!nextUrl) {
        return peopleList;
    }
    let allResults = peopleList;
    const response = await fetch(nextUrl);
    const peopleResponse: PeopleResponseType = await response.json();
    allResults = allResults.concat(peopleResponse.results);
    return fetchAllResults(allResults, peopleResponse?.next || "");
}

async function getImages(): Promise<ImageMapType> {
    const totalResult = await fetchAllResults([], PEOPLE_BASE_URL);
    const imageMap: ImageMapType = generateImageMap(totalResult);
    return imageMap;
}

export default function usePeopleImages() {
    return useQuery({
        queryKey: ["people"],
        queryFn: () => getImages(),
        staleTime: Infinity,
        initialData: images,
    });
}
