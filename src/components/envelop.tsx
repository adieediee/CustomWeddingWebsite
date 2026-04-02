"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "./envelop.module.css";

import heart from "../../public/contact/heart.png";

export default function Envelop() {
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const od = String(formData.get("od") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        if (!od || !message) {
            setStatus("Prosime vyplnit meno aj odkaz.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ od, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus(data.error ?? "Nepodarilo sa odoslat odkaz.");
                return;
            }

            form.reset();
            setStatus("Dakujeme, odkaz bol odoslany.");
        } catch {
            setStatus("Chyba pripojenia. Skuste to prosim znova.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.envelop} onSubmit={onSubmit}>
            <textarea name="message" id={styles.textarea} placeholder="Mili mladomanzelia..." />
            <span className={styles.line}></span>
            <div className={styles.info}>
                <div className={styles.stamp}>
                    <Image src={heart} alt="heart" />
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

                    <input
                        type="submit"
                        value={isSubmitting ? "ODOSIELAM..." : "ODOSLI"}
                        disabled={isSubmitting}
                    />
                    <p className={styles.status} aria-live="polite">
                        {status}
                    </p>
                </div>
            </div>
        </form>
    );
}
