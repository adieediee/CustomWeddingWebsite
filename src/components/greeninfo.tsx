import styles from "./greeninfo.module.css";

export default function GreenInfo() {
    return (
        <div className={styles.greenInfo}>
            <h2>S radosťou Vás pozývame</h2>
            <p>na svadobnú sv. omšu, kde si pri oltári vyslovíme svoj manželský sľub <br className={styles.break} />
                v kostole Najsvätejšej Trojice v Lokci 1.8.2026 o 15:00</p>

            <p>Následne sa spoločne presunieme na svadobnú hostinu <br className={styles.break} />
                do kultúrneho domu v Lokci. </p>

            <div className={styles.three}>
                <p className={styles.contact}>
                    KONTAKTY:
                </p>
                <p className={styles.us}>
                    Katka: 0944 434 723 <br />
                    Jarko: 0944 091 768
                </p>
                <p className={styles.nice}>
                    Tešíme sa na Vás
                </p>
            </div>
        </div >
    );
}