import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import Features from './pages/Features'
import VisualFeatures from './pages/VisualFeatures'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import About from './pages/About'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Customers from './pages/Customers'
import Integrations from './pages/Integrations'
import Security from './pages/Security'
import Careers from './pages/Careers'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="features/visual" element={<VisualFeatures />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="customers" element={<Customers />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="security" element={<Security />} />
        <Route path="careers" element={<Careers />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
