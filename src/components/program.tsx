"use client";

import Image from "next/image";
import styles from "./program.module.css";
import { formatCountdownSlovak } from "@/lib/weddingCountdown";
import { useWeddingCountdown } from "@/hooks/useWeddingCountdown";

import bus from "../../public/program/bus.png";
import church from "../../public/program/church.png";
import rings from "../../public/program/rings.png";
import camera from "../../public/program/camera.png";
import drinks from "../../public/program/drinks.png";

type ProgramProps = {
    targetDateIso: string;
};

export default function Program({ targetDateIso }: ProgramProps) {
    const countdown = useWeddingCountdown(targetDateIso);

    return (
        <div className={styles.program}>
            <h2>Program</h2>
            <div className={styles.plan}>
                <div className={styles.point}>
                    <p className={styles.time}>13:45</p>
                    <span className={styles.line}></span>
                    <div className={styles.info}>
                        <Image src={bus} alt="bus" className={styles.vector}></Image>
                        <p className={styles.description}>Odchod autobusu z Hruštína spred Jarkovho domu</p>
                    </div>
                </div>

                <div className={styles.point}>
                    <p className={styles.time}>14:30</p>
                    <span className={styles.line}></span>
                    <div className={styles.info}>
                        <Image src={church} alt="church" className={styles.vector}></Image>
                        <p className={styles.description}>Spoločný odchod od Katkinho domu ku kostolu</p>
                    </div>
                </div>

                <div className={styles.point}>
                    <p className={styles.time}>15:00</p>
                    <span className={styles.line}></span>
                    <div className={styles.info}>
                        <Image src={rings} alt="rings" className={styles.vector}></Image>
                        <p className={styles.description}>Sobáš</p>
                    </div>
                </div>

                <div className={styles.point}>
                    <span className={styles.line}></span>
                    <div className={styles.info}>
                        <Image src={camera} alt="camera" className={styles.vector}></Image>
                        <p className={styles.description}>Spoločná fotografia</p>
                    </div>
                </div>

                <div className={styles.point}>
                    <span className={styles.line}></span>
                    <div className={styles.info}>
                        <Image src={drinks} alt="drinks" className={styles.vector}></Image>
                        <p className={styles.description}>Svadobná hostina</p>
                    </div>
                </div>
            </div>
            {/* {countdown.isDone ? "Dnes je ten deň." : ` <h3>Do svadby ostáva..</h3><p>${formatCountdownSlovak(countdown)}</p>`} */}
            {
                countdown.isDone ? <h2>Dnes je ten deň!</h2> :
                    <>
                        <h2>Do svadby ostáva..</h2>
                        <p className={styles.countdown}>{formatCountdownSlovak(countdown)}</p>
                    </>
            }
        </div >
    );
}
