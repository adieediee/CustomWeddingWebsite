import Image from "next/image";
import styles from "./envelop.module.css";

import heart from "../../public/contact/heart.png";

export default function Envelop() {
    return (
        <form className={styles.envelop}>
            <textarea name="message" id={styles.textarea} placeholder="Milí mladomanželia..."></textarea>
            <span className={styles.line}></span>
            <div className={styles.info}>
                <div className={styles.stamp}>
                    <Image src={heart} alt="heart"></Image>
                </div>
                <div className={styles.info_text}>
                    <label htmlFor="pre">
                        PRE:
                        <input type="text" id="pre" name="pre" value="Katka a Jarko" readOnly />
                    </label>

                    <label htmlFor="od">
                        OD:
                        <input type="text" id="od" name="od" />
                    </label>
                    <input type="submit" value="ODOŠLI" />
                </div>
            </div>
        </form>
    )
}