"use client";

import Image from "next/image";

import photo1 from "../../public/photos/photo1.png";
import photo2 from "../../public/photos/photo2.png";
import photo3 from "../../public/photos/photo3.png";
import photo4 from "../../public/photos/photo4.png";
import photo5 from "../../public/photos/photo5.png";
import photo6 from "../../public/photos/photo6.png";
import photo7 from "../../public/photos/photo7.png";

import styles from "./gallery.module.css";
import { useRef, useState } from "react";

export default function Gallery() {
    const [isFullHeight, setIsFullHeight] = useState(false);
    const galleryRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = () => {
        const next = !isFullHeight;
        setIsFullHeight(next);

        // when closing (true -> false), scroll to top of this section
        if (!next) {
            requestAnimationFrame(() => {
                galleryRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
    };

    return (
        <div
            ref={galleryRef}
            className={`${styles.gallery} ${isFullHeight ? styles.galleryFull : ""}`}>
            <h2>Náš príbeh</h2>
            <div className={styles.photos}>
                <Image
                    src={photo1}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />
                <Image
                    src={photo2}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />
                <Image
                    src={photo3}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />
                <Image
                    src={photo4}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />

                <Image
                    src={photo5}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />
                <Image
                    src={photo6}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />
                <Image
                    src={photo7}
                    className={styles.photo}
                    alt="photo of Katka and Jaro"
                />
            </div>

            <div className={styles.open}>
                <button type="button" onClick={handleToggle}>
                    {isFullHeight ? "skontrolujte menej" : "skontrolujte viac"}
                </button>
            </div>
        </div >
    );
}
