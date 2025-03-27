import styles from "../css-modules/CountryItem.module.css";

export type CountryType = {
    country: string;
    emoji: string;
};

function CountryItem({ country }: { country: CountryType }) {
    return (
        <li className={styles.countryItem}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
