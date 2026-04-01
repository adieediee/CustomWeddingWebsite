"use client";

import Image from "next/image";
import card from "../../public/hero/card.png";
import envelop_back from "../../public/hero/envelop.png";
import flowers from "../../public/hero/flowers_on_paper.png";
import envelop_front from "../../public/hero/front_envelop.png";
import photo from "../../public/hero/their_photo.png";
import pozvanka from "../../public/photos/pozvanka.png";

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from "./hero.module.css";

export default function Hero() {

    const _hero_section = useRef<HTMLDivElement | null>(null);
    const _envelop_back = useRef<HTMLImageElement | null>(null);
    const _envelop_front = useRef<HTMLImageElement | null>(null);
    const _card = useRef<HTMLImageElement | null>(null);
    const _photo = useRef<HTMLImageElement | null>(null);
    const _flowers = useRef<HTMLImageElement | null>(null);
    const _overlay = useRef<HTMLDivElement | null>(null);
    const _overlayImg = useRef<HTMLImageElement | null>(null);
    const [cardOpen, setCardOpen] = useState(false);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });

        const isTouchDevice = ScrollTrigger.isTouch > 0 || window.matchMedia("(pointer: coarse)").matches;
        const isNarrowViewport = window.matchMedia("(max-width: 900px)").matches;

        if (isTouchDevice || isNarrowViewport) return;

        const ctx = gsap.context(() => {
            // register initial transforms so GSAP knows the starting state
            gsap.set(_photo.current, { rotate: "-9deg" });
            gsap.set(_card.current, { clearProps: "transform" });
            gsap.set(_flowers.current, { clearProps: "transform" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: _hero_section.current,
                    start: 'top top',
                    end: "+=1200",
                    scrub: 1.5,
                    pin: true,
                    pinType: "fixed",
                    anticipatePin: 1,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                }
            });

            // envelope stays fixed — only contents gently emerge
            tl.to(_photo.current, {
                yPercent: -18, xPercent: -5, rotate: "-21deg",
                duration: 1, ease: 'power1.out',
            }, 0);

            tl.to(_card.current, {
                yPercent: -12,
                duration: 1, ease: 'power1.out',
            }, 0);

            tl.to(_flowers.current, {
                yPercent: -16, xPercent: 5, rotate: "12deg",
                duration: 1, ease: 'power1.out',
            }, 0);

        }, _hero_section);

        const refreshOnLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', refreshOnLoad);

        return () => {
            window.removeEventListener('load', refreshOnLoad);
            ctx.revert();
        };
    }, []);

    const openCard = () => {
        if (!_overlay.current || !_overlayImg.current) return;
        setCardOpen(true);
        gsap.set(_overlay.current, { visibility: 'visible', pointerEvents: 'auto' });

        const tl = gsap.timeline();
        tl.fromTo(_overlay.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: 'none' }, 0
        );
        tl.fromTo(_overlayImg.current,
            { clipPath: 'inset(0% 0% 97% 0%)', y: 60, rotation: -3, transformOrigin: 'top center' },
            { clipPath: 'inset(0% 0% 0% 0%)', y: 0, rotation: 0, duration: 0.85, ease: 'power2.out' },
            0.05
        );
    };

    const closeCard = () => {
        if (!_overlay.current || !_overlayImg.current) return;
        const tl = gsap.timeline({
            onComplete: () => {
                setCardOpen(false);
                gsap.set(_overlay.current, { visibility: 'hidden', pointerEvents: 'none' });
                gsap.set(_overlayImg.current, { clipPath: 'inset(0% 0% 97% 0%)', y: 60, rotation: -3 });
            }
        });
        tl.to(_overlayImg.current, {
            clipPath: 'inset(0% 0% 97% 0%)', y: 60, rotation: -3,
            transformOrigin: 'top center', duration: 0.45, ease: 'power2.in',
        }, 0);
        tl.to(_overlay.current, { opacity: 0, duration: 0.35, ease: 'none' }, 0.1);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && cardOpen) closeCard(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [cardOpen]);

    return (
        <>
            <section className={styles.hero} ref={_hero_section}>
                <div className={styles.background}>
                    <span className={`${styles.names} ${styles.katka}`}>Katka</span>
                    <span className={`${styles.names} ${styles.jaro}`}>Jaro</span>
                </div>

                <div className={styles.envelop}>
                    <Image src={envelop_back} alt="envelop"
                        className={styles.envelop_back} ref={_envelop_back} loading="eager" />
                    <Image src={envelop_front} alt="front part of envelop"
                        className={styles.envelop_front} ref={_envelop_front} loading="eager" />

                    {/* hover wrappers — CSS hover here, GSAP on the img inside */}
                    <div className={styles.card_wrap}>
                        <Image src={card} alt="svadobna pozvanka"
                            className={styles.card} ref={_card} loading="eager" onClick={openCard} />
                    </div>
                    <div className={styles.photo_wrap}>
                        <Image src={photo} alt="photo of Katka and Jaro"
                            className={styles.photo} ref={_photo} loading="eager" />
                    </div>
                    <div className={styles.flowers_wrap}>
                        <Image src={flowers} alt="two flowers on paper"
                            className={styles.flowers} ref={_flowers} loading="eager" />
                    </div>
                </div>
            </section>

            {/* Fullscreen overlay — always in DOM so refs work immediately */}
            <div
                className={styles.overlay}
                ref={_overlay}
                onClick={closeCard}
                style={{ visibility: 'hidden', pointerEvents: 'none', opacity: 0 }}
            >
                <Image src={pozvanka} alt="svadobna pozvanka"
                    className={styles.overlay_img} ref={_overlayImg} />
                <button className={styles.overlay_close} onClick={closeCard} aria-label="Zavrieť">✕</button>
            </div>
        </>
    );
}
