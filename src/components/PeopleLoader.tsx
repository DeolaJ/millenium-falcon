import Loader from "./Loader";

const placeholderList = Array(10)
    .fill(0)
    .map((_, index) => index);

export default function PeopleLoader() {
    return placeholderList.map((placeholder) => (
        <li key={placeholder} className="loader">
            <Loader />
        </li>
    ));
}
