import styles from "../css-modules/Spinner.module.css";

function Spinner() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Spinner;
