"use client";

import Image from "next/image";
import styles from "./weddingdate.module.css";
import { getSlovakUnit } from "@/lib/weddingCountdown";
import { useWeddingCountdown } from "@/hooks/useWeddingCountdown";

import sign from "../../public/date/sign2.png";

type WeddingDateProps = {
    targetDateIso: string;
};

export default function WeddingDate({ targetDateIso }: WeddingDateProps) {
    const countdown = useWeddingCountdown(targetDateIso);

    return (
        <div className={styles.dates}>
            <h2>
                ďakujeme, že budete súčasťou <br /> nášho veľkého dňa
            </h2>

            <div className={styles.countdown}>
                <h3>Do svadby zostáva</h3>
                {countdown.isDone ? (
                    <p className={styles.done}>Dnes je ten deň.</p>
                ) : (
                    <div className={styles.time}>
                        <div className={styles.timeItem}>
                            <span className={styles.timeValue}>{countdown.days}</span>
                            <span className={styles.timeLabel}>{getSlovakUnit(countdown.days, "deň", "dni", "dní")}</span>
                        </div>
                        <div className={styles.timeItem}>
                            <span className={styles.timeValue}>{countdown.hours}</span>
                            <span className={styles.timeLabel}>{getSlovakUnit(countdown.hours, "hodina", "hodiny", "hodín")}</span>
                        </div>
                        <div className={styles.timeItem}>
                            <span className={styles.timeValue}>{countdown.minutes}</span>
                            <span className={styles.timeLabel}>{getSlovakUnit(countdown.minutes, "minúta", "minúty", "minút")}</span>
                        </div>
                    </div>
                )}
            </div>

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
