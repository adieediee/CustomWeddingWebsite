"use client";

import Image from "next/image";
import styles from "./weddingdate.module.css";
import { getSlovakUnit } from "@/lib/weddingCountdown";

import sign from "../../public/date/sign4.png";

type WeddingDateProps = {
    targetDateIso: string;
};

export default function WeddingDate({ targetDateIso }: WeddingDateProps) {

    return (
        <div className={styles.dates}>
            <h2>
                ďakujeme, že budete súčasťou <br /> nášho veľkého dňa
            </h2>

            <div className={styles.week}>
                <div className={styles.day}>
                    <p className={styles.name}>Štvrtok</p>
                    <p className={styles.num}>30</p>
                </div>
                <div className={styles.day}>
                    <p className={styles.name}>Piatok</p>
                    <p className={styles.num}>31</p>
                </div>
                <div className={styles.day} id={styles.special_day}>
                    <p className={styles.name}>Sobota</p>
                    <p className={styles.num}>1</p>
                    <span className={styles.sign}>
                        <Image src={sign} alt="sign" />
                    </span>
                </div>
                <div className={styles.day}>
                    <p className={styles.name}>Nedeľa</p>
                    <p className={styles.num}>2</p>
                </div>
                <div className={styles.day}>
                    <p className={styles.name}>Pondelok</p>
                    <p className={styles.num}>3</p>
                </div>
            </div>
        </div>
    );
}
