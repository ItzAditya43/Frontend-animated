import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const sectionRef = useRef(null)
  const carRef = useRef(null)
  const bgTextRef = useRef(null)
  const gradientOverlayRef = useRef(null)
  const colorOverlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(carRef.current, {
        scale: 1.2,
        rotateY: 0,
      })

      // Idle float animation (non-scroll) - separate from scroll animations
      gsap.to(carRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Animated color gradient (BMW style - continuous loop)
      if (colorOverlayRef.current) {
        gsap.to(colorOverlayRef.current, {
          backgroundPosition: "200% 0%",
          duration: 8,
          ease: "none",
          repeat: -1,
        })
      }

      // Scroll-driven animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Car scale and rotation
      tl.to(carRef.current, {
        scale: 0.85,
        rotateY: -10,
        ease: "none",
      }, 0)

      // Gradient overlay animation - changes color as you scroll
      if (gradientOverlayRef.current) {
        tl.to(gradientOverlayRef.current, {
          opacity: 0.6,
          ease: "none",
        }, 0)
      }

      // Background text parallax (moves slower)
      gsap.to(bgTextRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        ease: "none",
      })

      // Animated color shift on background
      gsap.to(sectionRef.current, {
        backgroundColor: "#f5f5f5",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] w-full overflow-hidden flex items-center justify-center"
      style={{ 
        background: "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 50%, #e8e8e8 100%)",
        backgroundColor: "#e8e8e8"
      }}
    >
      {/* Animated color gradient overlay (BMW style) */}
      <div
        ref={colorOverlayRef}
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0, 100, 200, 0.1) 25%, rgba(0, 150, 255, 0.15) 50%, rgba(0, 100, 200, 0.1) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 0%",
        }}
      />

      {/* Animated gradient overlay that changes with scroll */}
      <div
        ref={gradientOverlayRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-0"
        style={{
          background: "linear-gradient(180deg, rgba(200, 200, 200, 0.3) 0%, transparent 50%, rgba(150, 150, 150, 0.2) 100%)",
        }}
      />

      {/* Background text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ background: "transparent" }}
      >
        <h1 className="text-[18vw] md:text-[22vw] font-bebas text-gray-800/5 select-none whitespace-nowrap tracking-wider">
          BMW 3 SERIES
        </h1>
      </div>

      {/* BMW Logo and Model Name */}
      <div className="absolute top-8 md:top-12 left-8 md:left-12 z-30">
        <div className="flex flex-col gap-2">
          <div className="text-3xl md:text-4xl font-bebas text-gray-900 tracking-widest drop-shadow-sm">
            BMW
          </div>
          <div className="text-sm md:text-base font-syncopate text-gray-600 uppercase tracking-[0.3em]">
            The 3 Series
          </div>
        </div>
      </div>

      {/* Car image with animated grey background */}
      <div 
        className="relative z-20 flex items-center justify-center" 
        style={{ 
          perspective: "1000px",
          width: "100%",
        }}
      >
        {/* Animated grey gradient background layer */}
        <div 
          className="absolute"
          style={{
            width: "100vw",
            maxWidth: "1200px",
            height: "80vh",
            minHeight: "800px",
            zIndex: 0,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(135deg, #d0d0d0 0%, #e5e5e5 50%, #d8d8d8 100%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Animated diagonal thick lines behind car (black, white, blue) */}
        <div 
          className="absolute z-1"
          style={{
            width: "100vw",
            maxWidth: "1200px",
            height: "80vh",
            minHeight: "800px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Black diagonal line - 45deg forward */}
          <div
            className="diagonal-line"
            style={{
              width: "12px",
              height: "200%",
              background: "#000000",
              position: "absolute",
              left: "20%",
              top: "-50%",
              transform: "rotate(45deg)",
              transformOrigin: "center",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.4)",
              animation: "diagonalLineMove 7s ease-in-out infinite",
              animationDelay: "0s",
              borderRadius: "6px",
            }}
          />
          {/* White diagonal line - 45deg forward */}
          <div
            className="diagonal-line"
            style={{
              width: "12px",
              height: "200%",
              background: "#ffffff",
              position: "absolute",
              left: "50%",
              top: "-50%",
              transform: "rotate(45deg)",
              transformOrigin: "center",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)",
              animation: "diagonalLineMove 7s ease-in-out infinite",
              animationDelay: "2.3s",
              borderRadius: "6px",
            }}
          />
          {/* Blue diagonal line - 45deg forward */}
          <div
            className="diagonal-line"
            style={{
              width: "12px",
              height: "200%",
              background: "#0099ff",
              position: "absolute",
              left: "80%",
              top: "-50%",
              transform: "rotate(45deg)",
              transformOrigin: "center",
              boxShadow: "0 0 20px rgba(0, 153, 255, 0.9), 0 0 40px rgba(0, 153, 255, 0.6)",
              animation: "diagonalLineMove 7s ease-in-out infinite",
              animationDelay: "4.6s",
              borderRadius: "6px",
            }}
          />
          {/* Black diagonal line - -45deg reverse */}
          <div
            className="diagonal-line"
            style={{
              width: "12px",
              height: "200%",
              background: "#000000",
              position: "absolute",
              right: "20%",
              top: "-50%",
              transform: "rotate(-45deg)",
              transformOrigin: "center",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.4)",
              animation: "diagonalLineMoveReverse 8s ease-in-out infinite",
              animationDelay: "1.5s",
              borderRadius: "6px",
            }}
          />
          {/* White diagonal line - -45deg reverse */}
          <div
            className="diagonal-line"
            style={{
              width: "12px",
              height: "200%",
              background: "#ffffff",
              position: "absolute",
              right: "50%",
              top: "-50%",
              transform: "rotate(-45deg)",
              transformOrigin: "center",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)",
              animation: "diagonalLineMoveReverse 8s ease-in-out infinite",
              animationDelay: "3.8s",
              borderRadius: "6px",
            }}
          />
          {/* Blue diagonal line - -45deg reverse */}
          <div
            className="diagonal-line"
            style={{
              width: "12px",
              height: "200%",
              background: "#0066ff",
              position: "absolute",
              right: "80%",
              top: "-50%",
              transform: "rotate(-45deg)",
              transformOrigin: "center",
              boxShadow: "0 0 20px rgba(0, 102, 255, 0.9), 0 0 40px rgba(0, 102, 255, 0.6)",
              animation: "diagonalLineMoveReverse 8s ease-in-out infinite",
              animationDelay: "6.1s",
              borderRadius: "6px",
            }}
          />
        </div>
        
        <div
          ref={carRef}
          className="relative z-10 car-wrapper"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            backfaceVisibility: "hidden",
            backgroundColor: "#e8e8e8",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            borderRadius: "0",
            position: "relative",
            background: "linear-gradient(135deg, #e0e0e0 0%, #f0f0f0 100%)",
          }}
        >
          {/* Animated background inside wrapper */}
          <div 
            className="absolute inset-0"
            style={{
              zIndex: -1,
              background: "linear-gradient(135deg, #d8d8d8 0%, #e8e8e8 50%, #f0f0f0 100%)",
              backgroundSize: "200% 200%",
            }}
          />
          <img
            src="/side.png"
            alt="BMW 3 Series F30 Side View"
            className="w-[90vw] max-w-[900px] h-auto object-contain drop-shadow-2xl relative z-10"
            style={{
              background: "#e8e8e8",
              backgroundColor: "#e8e8e8",
              backgroundImage: "none",
              display: "block",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              mixBlendMode: "normal",
              imageRendering: "auto",
              verticalAlign: "middle",
              position: "relative",
              zIndex: 10,
              filter: "contrast(1.05) brightness(0.98)",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection