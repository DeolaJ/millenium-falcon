import { MilleniumFalconCharacters, PeopleType } from "../types";

import "./PeopleCard.scss";

export default function PeopleCard({
    people,
    avatarUrl,
    type,
    isPreview,
}: {
    people: PeopleType;
    avatarUrl: string;
    type?: MilleniumFalconCharacters;
    isPreview?: boolean;
}) {
    const { name, birth_year, gender } = people;
    return (
        <article className={`people-card ${isPreview ? "preview" : ""}`}>
            {type && <span className="people-card--type">{type}</span>}
            <div className="people-card--image">
                <img src={`/people/${avatarUrl}`} />
            </div>
            <div>
                <h2 className="people-card--name">{name}</h2>
                <p className="people-card--text">
                    <strong>Gender:</strong> {gender}
                </p>
                <p className="people-card--text">
                    <strong>Birth year:</strong> {birth_year}
                </p>
            </div>
        </article>
    );
}
