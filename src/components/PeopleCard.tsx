import { PeopleType } from "../types";

import "./PeopleCard.scss";

export default function PeopleCard({
    people,
    avatarUrl,
}: {
    people: PeopleType;
    avatarUrl: string;
}) {
    const { name, birth_year, gender } = people;
    return (
        <article className="people-card">
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
