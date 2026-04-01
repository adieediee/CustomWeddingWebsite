"use client";

import Image from "next/image";
import card from "../../public/hero/card.png";
import envelop_back from "../../public/hero/envelop.png";
import flowers from "../../public/hero/flowers_on_paper.png";
import envelop_front from "../../public/hero/front_envelop.png";
import photo from "../../public/hero/their_photo.png";

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from "./hero.module.css";

export default function Hero() {

    const _hero_section = useRef<HTMLDivElement | null>(null);
    const _envelop_back = useRef<HTMLImageElement | null>(null);
    const _envelop_front = useRef<HTMLImageElement | null>(null);
    const _card = useRef<HTMLImageElement | null>(null);
    const _photo = useRef<HTMLImageElement | null>(null);
    const _flowers = useRef<HTMLImageElement | null>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });

        const isTouchDevice = ScrollTrigger.isTouch > 0 || window.matchMedia("(pointer: coarse)").matches;
        const isNarrowViewport = window.matchMedia("(max-width: 900px)").matches;

        if (isTouchDevice || isNarrowViewport) {
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: _hero_section.current,
                    start: 'top top',
                    end: "+=2600",
                    scrub: 1,
                    pin: true,
                    pinType: "fixed",
                    anticipatePin: 1,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                }
            });

            tl.to([_envelop_back.current, _envelop_front.current], {
                yPercent: '750',
                duration: 1.5,
                ease: 'none',
            }, 0)

            tl.to(_photo.current, {
                yPercent: "-12",
                xPercent: "-7",
                rotate: "-18deg",
                duration: 1.5,
                ease: 'none',
            }, 0)

            tl.to(_card.current, {
                yPercent: "-7",
                duration: 2.5,
                ease: 'none',
            }, 0)

            tl.to(_flowers.current, {
                yPercent: "-10",
                xPercent: "7",
                rotate: "18deg",
                duration: 1.5,
                ease: 'none',
            }, 0)


        }, _hero_section);

        const refreshOnLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', refreshOnLoad);

        return () => {
            window.removeEventListener('load', refreshOnLoad);
            ctx.revert();
        };
    }, []);

    return (
        <section className={styles.hero} ref={_hero_section}>
            <div className={styles.background}>
                <span className={`${styles.names} ${styles.katka}`}>
                    Katka
                </span>
                <span className={`${styles.names} ${styles.jaro}`}>
                    Jaro
                </span>
            </div>

            {/* Envelop */}

            <div className={styles.envelop}>
                <Image
                    src={envelop_back}
                    alt="envelop"
                    className={styles.envelop_back}
                    ref={_envelop_back}
                    loading="eager"
                />
                <Image
                    src={envelop_front}
                    alt="front part of envelop"
                    className={styles.envelop_front}
                    ref={_envelop_front}
                    loading="eager"
                />
                <Image
                    src={card}
                    alt="svadobna pozvanka"
                    className={styles.card}
                    ref={_card}
                    loading="eager"
                />
                <Image
                    src={photo}
                    alt="photo of Katka and Jaro"
                    className={styles.photo}
                    ref={_photo}
                    loading="eager"
                />
                <Image
                    src={flowers}
                    alt="two flowers on paper"
                    className={styles.flowers}
                    ref={_flowers}
                    loading="eager"
                />
            </div>
        </section>
    );
}