import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BrandReveal = () => {
  const sectionRef = useRef(null)
  const carRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaButtonRef = useRef(null)
  const badgeRef = useRef(null)
  const moreInfoRef = useRef(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wait for horizontal scroll to be initialized, then set up animations
      const setupAnimations = () => {
        const horizontalScroll = ScrollTrigger.getById("horizontal-scroll")
        
        if (!horizontalScroll) {
          setTimeout(setupAnimations, 100)
          return
        }

        // Car fade in from left (horizontal scroll)
        if (carRef.current) {
          gsap.fromTo(carRef.current,
            {
              opacity: 0,
              scale: 0.8,
              x: -100,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "left 100%",
                end: "left 60%",
                scrub: 1,
                containerAnimation: horizontalScroll,
              },
            }
          )
        }

        // Title animation from left
        if (titleRef.current) {
          gsap.fromTo(titleRef.current,
            {
              opacity: 0,
              x: -80,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "left 90%",
                end: "left 50%",
                scrub: 1,
                containerAnimation: horizontalScroll,
              },
            }
          )
        }

        // Subtitle animation from left
        if (subtitleRef.current) {
          gsap.fromTo(subtitleRef.current,
            {
              opacity: 0,
              x: -60,
            },
            {
              opacity: 1,
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "left 85%",
                end: "left 55%",
                scrub: 1,
                containerAnimation: horizontalScroll,
              },
            }
          )
        }

        // CTA button animation from left
        if (ctaButtonRef.current) {
          gsap.fromTo(ctaButtonRef.current,
            {
              opacity: 0,
              x: -40,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "left 80%",
                end: "left 50%",
                scrub: 1,
                containerAnimation: horizontalScroll,
              },
            }
          )
        }

        // Badge animation from left
        if (badgeRef.current) {
          gsap.fromTo(badgeRef.current,
            {
              opacity: 0,
              scale: 0.8,
              x: -50,
              rotation: -10,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "left 95%",
                end: "left 65%",
                scrub: 1,
                containerAnimation: horizontalScroll,
              },
            }
          )
        }

        // More info panel reveal (horizontal container animation)
        if (moreInfoRef.current && horizontalScroll) {
          gsap.fromTo(moreInfoRef.current,
            { x: 120, opacity: 0, scale: 0.98 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'left 95%',
                end: 'left 60%',
                scrub: 1,
                containerAnimation: horizontalScroll,
              },
            }
          )
        }

        // (no collage animation here — collage moved to PerformanceSpecs)
      }
      
      // Start setup with retry mechanism
      setupAnimations()
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center flex-shrink-0"
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      {/* Flashy animated color gradient overlays (multiple layers for amazingness) */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.2) 25%, rgba(0, 153, 255, 0.3) 50%, rgba(100, 50, 255, 0.2) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "gradientMove 8s ease infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-6"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-6"
        style={{
          background: "linear-gradient(45deg, rgba(0, 150, 255, 0.1) 0%, rgba(150, 50, 255, 0.15) 50%, rgba(0, 212, 255, 0.1) 100%)",
          backgroundSize: "300% 300%",
          animation: "colorShift 6s ease infinite",
        }}
      />

      {/* Background car image */}
      <div 
        ref={carRef}
        className="absolute inset-0 w-full h-full opacity-0 car-container z-0"
        style={{ background: "transparent" }}
      >
        <img
          src="/back.png"
          alt="BMW 3 Series F30 Rear View"
          className="car-image w-full h-full object-cover object-center"
          style={{
            background: "transparent",
            display: "block",
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
            filter: "contrast(1.1) brightness(0.9) saturate(1.1)",
          }}
        />
      </div>

      {/* Collage removed from this page (moved to PerformanceSpecs) */}

      {/* Animated dark gradient overlay with color hints */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.7) 100%)",
          backgroundSize: "100% 200%",
        }}
      ></div>
      {/* Color flash overlay */}
      <div 
        className="absolute inset-0 z-11 pointer-events-none"
        style={{ 
          background: "linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, transparent 50%, rgba(100, 50, 255, 0.05) 100%)",
          animation: "flashOverlay 5s ease-in-out infinite",
        }}
      ></div>

      {/* Content - positioned lower on page */}
      <div className="relative z-20 text-center px-4 md:px-8 max-w-4xl mx-auto" style={{ paddingTop: '60vh', paddingBottom: '3rem' }}>
        
        {/* Badge/Model identifier with flashy animation */}
        <div ref={badgeRef} className="mb-4 md:mb-6 opacity-0">
          <div className="inline-block px-5 py-2 md:px-6 md:py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-size-200 bg-pos-0 rounded-full border-2 border-white/30 animated-gradient-badge shadow-lg">
            <span className="text-xs md:text-sm font-syncopate text-white uppercase tracking-widest font-bold">
              F30 Generation
            </span>
          </div>
        </div>

        {/* Main title with animated gradient text */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bebas mb-3 md:mb-4 opacity-0 tracking-tight animated-gradient-text glowing-text"
          style={{
            background: "linear-gradient(90deg, #00d4ff, #0099ff, #0066ff, #00d4ff)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(0, 212, 255, 0.5)) drop-shadow(0 0 40px rgba(0, 153, 255, 0.3))",
            animation: "gradientText 3s ease infinite, textPulse 2s ease-in-out infinite",
          }}
        >
          EXPERIENCE<br />THE DIFFERENCE
        </h1>

        {/* Subtitle with subtle glow */}
        <p
          ref={subtitleRef}
          className="text-sm md:text-base lg:text-lg text-white/95 font-syncopate mb-6 md:mb-8 opacity-0 max-w-xl mx-auto leading-relaxed"
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 200, 255, 0.2)",
          }}
        >
          Discover the perfect balance of luxury, performance, and innovation. 
          The BMW 3 Series F30 redefines what a sports sedan can be.
        </p>

        {/* CTA Buttons with flashy animations */}
        <div ref={ctaButtonRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center opacity-0">
          <a
            href="#"
            className="px-6 md:px-10 py-3 md:py-4 font-syncopate text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group animated-button-primary"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              color: "#000000",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <span className="relative z-10 font-bold">Explore More</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="#"
            className="px-6 md:px-10 py-3 md:py-4 bg-transparent border-2 text-white font-syncopate text-xs md:text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group animated-button-secondary"
            style={{
              borderImage: "linear-gradient(90deg, #00d4ff, #0099ff, #0066ff, #00d4ff) 1",
              borderImageSlice: 1,
              animation: "borderGlow 3s ease infinite",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <span className="relative z-10 font-bold">Schedule Test Drive</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Additional info */}
        <div className="mt-12 md:mt-16 text-white/70 text-xs md:text-sm font-syncopate uppercase tracking-widest">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <span>© 2024 BMW Group</span>
            <span className="hidden sm:inline">•</span>
            <span>Official BMW Website</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-syncopate uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/60 animate-pulse"></div>
        </div>
      </div>

      {/* Ending: Expanded right-side info panel */}
      <aside
        ref={moreInfoRef}
        className="absolute top-0 right-0 h-full w-full md:w-2/5 z-30 pointer-events-auto"
        aria-label="More information panel"
      >
        <div className="h-full bg-gradient-to-b from-[#0b2240] via-[#1b2a4a] to-[#201a3a] p-6 md:p-10 flex flex-col justify-between">
          <div>
            <div className="md:flex md:gap-6">
              {/* Collage is shown left-aligned on the detail page (kept above) */}

              <div className="md:flex-1">
                <div className="text-white/95 text-xl md:text-2xl font-bold mb-2">For more information</div>
                <p className="text-sm text-white/70 max-w-md">Request full specifications, brochures, contact a local dealer, or book a test drive. We can also provide detailed trim-by-trim data on request.</p>

                {/* Compact details area: collapsed by default, expandable */}
                <div className="mt-6">
                  <div className={`transition-all duration-300 ${detailsOpen ? 'max-h-[60vh] overflow-y-auto' : 'max-h-36 overflow-hidden'}`}>
                    <div className="space-y-3">
                      <div className="bg-white/95 rounded-lg p-3 flex flex-col">
                        <div className="text-xs uppercase text-gray-500 font-syncopate">Representative Power</div>
                        <div className="text-2xl font-bebas text-gray-900">180–340 hp</div>
                      </div>

                      <div className="bg-white/95 rounded-lg p-3 flex flex-col">
                        <div className="text-xs uppercase text-gray-500 font-syncopate">Drivetrain</div>
                        <div className="text-2xl font-bebas text-gray-900">RWD / xDrive AWD</div>
                      </div>

                      <div className="bg-white/95 rounded-lg p-3 flex flex-col">
                        <div className="text-xs uppercase text-gray-500 font-syncopate">0–60 mph</div>
                        <div className="text-2xl font-bebas text-gray-900">4.6–8.5 s</div>
                      </div>

                      {/* Form compacted inside same scrollable area */}
                      <form onSubmit={(e)=>e.preventDefault()} className="grid grid-cols-1 gap-2">
                        <input aria-label="Your name" placeholder="Your name" className="px-3 py-2 rounded-md text-sm" />
                        <input aria-label="Email" placeholder="Email address" className="px-3 py-2 rounded-md text-sm" />
                        <textarea aria-label="Message" placeholder="Message (optional)" rows={3} className="px-3 py-2 rounded-md text-sm"></textarea>
                        <div className="flex gap-2 mt-2">
                          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md shadow" onClick={(e)=>e.preventDefault()}>Request Brochure</button>
                          <button className="px-4 py-2 border border-white/20 text-white rounded-md" onClick={(e)=>e.preventDefault()}>Contact Dealer</button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button onClick={() => setDetailsOpen((v) => !v)} className="text-sm text-white/90 underline">
                      {detailsOpen ? 'Show less' : 'Show more details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-white/50 mt-6">
            <div>© 2024 BMW Group — Information indicative and for demonstration purposes only.</div>
          </div>
        </div>
      </aside>
    </section>
  )
}

export default BrandReveal