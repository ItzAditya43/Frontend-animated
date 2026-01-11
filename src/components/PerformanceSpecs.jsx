import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PerformanceSpecs = () => {
  const sectionRef = useRef(null)
  const carRef = useRef(null)
  const gradientOverlayRef = useRef(null)
  const detailRef = useRef(null)
  const countersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const setupAnimations = () => {
        const horizontalScroll = ScrollTrigger.getById('horizontal-scroll')

        // If horizontalScroll not ready (when used inside pinned container), retry shortly
        if (!horizontalScroll) {
          setTimeout(setupAnimations, 100)
          return
        }

        // Gradient overlay fill
        if (gradientOverlayRef.current) {
          gsap.fromTo(gradientOverlayRef.current, { width: '0%' }, {
            width: '100%',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'left 100%',
              end: 'left 0%',
              scrub: 1,
              containerAnimation: horizontalScroll,
            },
          })
        }

        // Parallax for car image
        if (carRef.current) {
          gsap.to(carRef.current, {
            x: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'left 100%',
              end: 'left 0%',
              scrub: 1,
              containerAnimation: horizontalScroll,
            },
          })
        }

        // (No local collage on this section)

        // (Removed detailed cards) small cards remain; counters animate separately

        // Right-aligned detail card animation
        if (detailRef.current) {
          gsap.fromTo(detailRef.current, { x: 80, opacity: 0 }, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'left 88%',
              end: 'left 60%',
              scrub: 1,
              containerAnimation: horizontalScroll,
            },
          })
        }

        // Animate numeric counters (if any) when section becomes active
        const counterTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'left 80%',
          end: 'left 50%',
          containerAnimation: horizontalScroll,
          onEnter: () => runCounters(),
          onEnterBack: () => runCounters(),
        })

        // keep existing GSAP setup only; collage drag handled separately

        function runCounters() {
          countersRef.current.forEach((el) => {
            const target = parseFloat(el.dataset.target || '0')
            const isFloat = el.dataset.decimals && Number(el.dataset.decimals) > 0
            gsap.fromTo(el, { innerText: 0 }, {
              innerText: target,
              duration: 1.4,
              ease: 'power1.out',
              snap: { innerText: 1 },
              onUpdate: function () {
                el.innerText = isFloat ? Number(this.targets()[0].innerText).toFixed(Number(el.dataset.decimals)) : Math.round(this.targets()[0].innerText)
              },
            })
          })
        }
      }

      setupAnimations()
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex-shrink-0"
      style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #eaeef2 0%, #f8fafc 100%)' }}
    >
      {/* Background car image - full-bleed (restored) */}
      <div ref={carRef} className="absolute inset-0 w-full h-full car-container z-0" style={{ background: 'transparent' }}>
        <img
          src="/front.png"
          alt="BMW 3 Series F30 Front View"
          className="car-image w-full h-full object-cover object-center"
          style={{ filter: 'contrast(1.06) brightness(0.98) saturate(1.05)' }}
        />
      </div>

      {/* Gradient overlay animation (subtle metallic sweep) */}
      <div
        ref={gradientOverlayRef}
        className="absolute top-0 left-0 h-full overflow-hidden z-5"
        style={{ width: '0%', willChange: 'width', background: 'linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(6,78,163,0.06) 45%, rgba(0,0,0,0.05) 100%)' }}
      />

      {/* Content container */}
      <div className="relative z-10 h-full w-full">
        <div className="relative w-full h-full">

          

          {/* Small left stacked cards positioned over the car (matches red area) */}
          <div className="absolute left-6 top-24 md:left-16 md:top-28 flex flex-col gap-4 z-20">
            <div className="p-4 bg-white/95 backdrop-blur rounded-xl shadow-lg w-56">
              <div className="text-xs text-gray-500 uppercase tracking-widest font-syncopate">Representative Power</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bebas text-black" data-target="320" ref={(el) => (countersRef.current[0] = el)}>0</span>
                <span className="text-sm text-gray-600">HP (typical)</span>
              </div>
            </div>

            <div className="p-4 bg-white/95 backdrop-blur rounded-xl shadow-lg w-56">
              <div className="text-xs text-gray-500 uppercase tracking-widest font-syncopate">0–60 mph</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bebas text-black" data-target="5.3" data-decimals="1" ref={(el) => (countersRef.current[1] = el)}>0</span>
                <span className="text-sm text-gray-600">Seconds (representative)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right-aligned compact details (desktop) */}
      <aside
        ref={detailRef}
        className="hidden md:flex flex-col gap-3 w-64 p-4 rounded-lg bg-white/95 shadow-xl text-sm text-gray-800 absolute right-8 top-1/2 transform -translate-y-1/2 z-20"
        aria-label="Detailed specifications summary"
      >
        <div className="font-bold text-gray-900">F30 Quick Details</div>
        <div className="text-gray-600"><span className="font-semibold">Typical Power:</span> 180–340 hp</div>
        <div className="text-gray-600"><span className="font-semibold">Drivetrain:</span> RWD / xDrive AWD</div>
        <div className="text-gray-600"><span className="font-semibold">Common Engines:</span> 2.0L I4, 3.0L I6</div>
        <div className="text-gray-600"><span className="font-semibold">0–60 mph:</span> 4.6–8.5 s</div>
        <div className="pt-2">
          <a href="#" className="block text-center px-3 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md shadow-sm hover:opacity-95" onClick={(e)=>e.preventDefault()}>Request Brochure</a>
        </div>
      </aside>
    </section>
  )
}

export default PerformanceSpecs