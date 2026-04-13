import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './App.css'

export default function App() {
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const cardRef = useRef<HTMLImageElement | null>(null)
  const photoRef = useRef<HTMLImageElement | null>(null)
  const flowersRef = useRef<HTMLImageElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const overlayImgRef = useRef<HTMLImageElement | null>(null)

  const [cardOpen, setCardOpen] = useState(false)

  useLayoutEffect(() => {
    let mounted = true
    let cleanup = () => {}

    const run = async () => {
      const plugin = await import('gsap/dist/ScrollTrigger')
      const ScrollTrigger = plugin.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      if (!mounted) return

      ScrollTrigger.config({ ignoreMobileResize: true })

      if (!heroSectionRef.current) {
        return
      }

      const ctx = gsap.context(() => {
        gsap.set(photoRef.current, { rotate: '-9deg' })
        gsap.set(cardRef.current, { clearProps: 'transform' })
        gsap.set(flowersRef.current, { clearProps: 'transform' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: '+=1200',
            scrub: 1.5,
            pin: true,
            pinType: 'fixed',
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })

        tl.to(
          photoRef.current,
          {
            yPercent: -18,
            xPercent: -5,
            rotate: '-21deg',
            duration: 1,
            ease: 'power1.out',
          },
          0,
        )

        tl.to(
          cardRef.current,
          {
            yPercent: -12,
            duration: 1,
            ease: 'power1.out',
          },
          0,
        )

        tl.to(
          flowersRef.current,
          {
            yPercent: -16,
            xPercent: 5,
            rotate: '12deg',
            duration: 1,
            ease: 'power1.out',
          },
          0,
        )
      }, heroSectionRef)

      const refreshOnLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', refreshOnLoad)
      window.addEventListener('orientationchange', refreshOnLoad)

      ScrollTrigger.refresh()

      cleanup = () => {
        window.removeEventListener('load', refreshOnLoad)
        window.removeEventListener('orientationchange', refreshOnLoad)
        ctx.revert()
      }
    }

    run().catch(() => {
      // keep component functional even if the plugin fails to load
    })

    return () => {
      mounted = false
      cleanup()
    }
  }, [])

  const closeCard = useCallback(() => {
    if (!overlayRef.current || !overlayImgRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        setCardOpen(false)
        if (!overlayRef.current || !overlayImgRef.current) return
        gsap.set(overlayRef.current, { visibility: 'hidden', pointerEvents: 'none' })
        gsap.set(overlayImgRef.current, { clipPath: 'inset(0% 0% 97% 0%)', y: 60, rotation: -3 })
      },
    })

    tl.to(
      overlayImgRef.current,
      {
        clipPath: 'inset(0% 0% 97% 0%)',
        y: 60,
        rotation: -3,
        transformOrigin: 'top center',
        duration: 0.45,
        ease: 'power2.in',
      },
      0,
    )

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.35,
        ease: 'none',
      },
      0.1,
    )
  }, [])

  const openCard = useCallback(() => {
    if (!overlayRef.current || !overlayImgRef.current) return

    setCardOpen(true)
    gsap.set(overlayRef.current, { visibility: 'visible', pointerEvents: 'auto' })

    const tl = gsap.timeline()

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'none' },
      0,
    )

    tl.fromTo(
      overlayImgRef.current,
      { clipPath: 'inset(0% 0% 97% 0%)', y: 60, rotation: -3, transformOrigin: 'top center' },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, rotation: 0, duration: 0.85, ease: 'power2.out' },
      0.05,
    )
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && cardOpen) {
        closeCard()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [cardOpen, closeCard])

  return (
    <>
      <section className="hero" ref={heroSectionRef}>
        <div className="background">
          <span className="names katka">Katka</span>
          <span className="names jaro">Jaro</span>
        </div>

        <div className="envelop">
          <img src="/hero/envelop.png" alt="envelope back" className="envelop_back" loading="eager" />
          <img
            src="/hero/front_envelop.png"
            alt="envelope front"
            className="envelop_front"
            loading="eager"
          />

          <div className="card_wrap">
            <img
              src="/hero/card.png"
              alt="svadobna pozvanka"
              className="card"
              ref={cardRef}
              loading="eager"
              onClick={openCard}
            />
          </div>

          <div className="photo_wrap">
            <img
              src="/hero/their_photo.png"
              alt="photo of Katka and Jaro"
              className="photo"
              ref={photoRef}
              loading="eager"
            />
          </div>

          <div className="flowers_wrap">
            <img
              src="/hero/flowers_on_paper.png"
              alt="two flowers on paper"
              className="flowers"
              ref={flowersRef}
              loading="eager"
            />
          </div>
        </div>
      </section>

      <div
        className="overlay"
        ref={overlayRef}
        onClick={closeCard}
        style={{ visibility: 'hidden', pointerEvents: 'none', opacity: 0 }}
      >
        <img src="/photos/pozvanka.png" alt="svadobna pozvanka" className="overlay_img" ref={overlayImgRef} />
        <button
          className="overlay_close"
          onClick={(event) => {
            event.stopPropagation()
            closeCard()
          }}
          aria-label="Zavriet"
        >
          x
        </button>
      </div>
    </>
  )
}
