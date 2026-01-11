import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import PerformanceSpecs from './components/PerformanceSpecs'
import BrandReveal from './components/BrandReveal'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const horizontalContainerRef = useRef(null)
  const horizontalWrapperRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('resize', handleResize)
    
    const ctx = gsap.context(() => {
      if (horizontalContainerRef.current && horizontalWrapperRef.current) {
        // Calculate total width for horizontal scroll (2 sections = 2 viewport widths)
        const totalWidth = window.innerWidth
        
        // Set initial position
        gsap.set(horizontalWrapperRef.current, {
          x: 0,
        })

        // Set up horizontal scrolling - when scrolling down, move horizontally to the right
        // Section 2 starts visible at x: 0, Section 3 is to the right at x: 100vw
        // As we scroll down, wrapper moves from x: 0 to x: -100vw (revealing section 3)
        gsap.to(horizontalWrapperRef.current, {
          x: () => -window.innerWidth, // Move one viewport width to the left (revealing section 3 to the right)
          ease: "none",
          scrollTrigger: {
            id: "horizontal-scroll",
            trigger: horizontalContainerRef.current,
            start: "top top",
            end: () => `+=${window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false, // Set to true for debugging horizontal scroll
          },
        })

        // Force refresh after initialization to ensure all ScrollTriggers are updated
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 500)
      }
    }, horizontalContainerRef)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <HeroSection />
      
      {/* Horizontal scrolling container for sections 2 and 3 */}
      <div
        ref={horizontalContainerRef}
        className="relative w-screen h-screen overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e8e8e8 0%, #f0f0f0 100%)",
        }}
      >
        <div
          ref={horizontalWrapperRef}
          className="flex relative"
          style={{
            width: "200vw",
            height: "100vh",
            willChange: "transform",
          }}
        >
          {/* Section 2 - Performance Specs (starts visible) */}
          <div 
            className="flex-shrink-0"
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <PerformanceSpecs />
          </div>
          
          {/* Section 3 - Brand Reveal (slides in from right) */}
          <div 
            className="flex-shrink-0"
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <BrandReveal />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App