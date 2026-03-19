'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, MapPin, Clock, ChevronDown, Menu, X,
  Truck, Battery, Fuel, Wrench, ShieldCheck, Star,
  ArrowRight, Lock, Zap, Award, Users, Building2,
  ChevronRight, Mail, ExternalLink, Heart, Sparkles
} from 'lucide-react'

// ─── DATA ────────────────────────────────────────────────────────────
const PHONE = '416-604-3222'
const PHONE_TOLL = '877-604-3222'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Pink Theory', href: '#pink-theory' },
  { label: 'Locations', href: '#locations' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

const LOCATIONS = [
  { city: 'Toronto', address: '41 Westside Drive, Etobicoke, ON M9C 1B3', phone: '416-604-3222', email: 'toronto@classictowing.ca', hours: '24/7', officeHours: '24/7' },
  { city: 'Ajax', address: '91 Notion Road, Ajax, ON L1S 6K8', phone: '905-427-0903', email: 'ajax@classictowing.ca', hours: '24/7', officeHours: 'Mon-Fri: 8am–5pm' },
  { city: 'Barrie', address: '257 Tiffin St, Barrie, ON L4N 2N4', phone: '705-970-0481', email: 'barrie@classictowing.ca', hours: '24/7', officeHours: '24/7' },
  { city: 'Hamilton', address: '858 Nebo Road, Hamilton, ON L0R 1P0', phone: '905-570-0111', email: 'hamilton@classictowing.ca', hours: '24/7', officeHours: 'Mon-Fri: 8am–5pm' },
]

const SERVICES = [
  { icon: Truck, title: 'Light Duty Towing', desc: 'Cars, SUVs, and small trucks transported safely with our modern fleet of light-duty tow trucks.' },
  { icon: Zap, title: 'Medium Duty Towing', desc: 'Box trucks, delivery vehicles, and RVs handled with precision using purpose-built medium-duty equipment.' },
  { icon: ShieldCheck, title: 'Heavy Duty Towing', desc: 'Semi-trucks, buses, and heavy equipment recovered and transported by our specialized rotator and boom trucks.' },
  { icon: Lock, title: 'Lockout Service', desc: 'Locked out? Our technicians will have you back in your vehicle in minutes, any time day or night.' },
  { icon: Battery, title: 'Battery & Jump Start', desc: 'Dead battery? We provide fast battery boosts and pull-starts to get you back on the road quickly.' },
  { icon: Fuel, title: 'Fuel Delivery', desc: 'Run out of gas? We deliver fuel directly to your location across all of Southern Ontario.' },
  { icon: Wrench, title: 'Tire Service', desc: 'Flat tire on the highway? Our fully-equipped road service trucks handle tire changes on the spot.' },
  { icon: Award, title: 'Accident Recovery', desc: 'Professional accident scene management and vehicle recovery, trusted by multiple police districts.' },
]

const FLEET_ITEMS = [
  { name: 'Medium Duty', image: '/images/Classic-1.png', featured: false },
  { name: '75 Ton Rotator', image: '/images/Classic-3.png', featured: true },
  { name: 'Flatbed', image: '/images/Classic-4.png', featured: false },
  { name: 'Heavy Duty', image: '/images/Classic-19.png', featured: false },
  { name: 'Pink Theory Underground', image: '/images/Classic-22.png', featured: false, pink: true },
  { name: 'Christmas Parade Flatbed', image: '/images/Classic-23.png', featured: false },
]

const REVIEWS = [
  { name: 'Ashley D.', text: 'Taylor came and got my car out in just a few minutes. He even noticed my tire needed air. Really nice and professional!', rating: 5 },
  { name: 'Paul P.', text: 'Kudos to CAA contract driver Taz from Classic Towing in Barrie! Outstanding manners, professionalism, a genuinely nice guy.', rating: 5 },
  { name: 'Stephy R.', text: 'They were there right away on the 401. The driver went above and beyond getting my spare tire out. Appreciated this so much!', rating: 5 },
  { name: 'Vanessa K.', text: 'Dan did an awesome job towing my tool box. Professional, fast, and courteous service every single time.', rating: 5 },
  { name: 'Te T.', text: 'Excellent service, drove 2.5 hours to tow my truck out of a snow-filled ditch. Definitely my first choice going forward.', rating: 5 },
]

const STATS = [
  { value: '150+', label: 'Fleet Vehicles' },
  { value: '40+', label: 'Years of Service' },
  { value: '4', label: 'Locations' },
  { value: '24/7', label: 'Emergency Dispatch' },
]

// ─── FADE IN COMPONENT ──────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── FLEET LIGHTBOX ─────────────────────────────────────────────────
function FleetLightbox({ item, onClose }: { item: typeof FLEET_ITEMS[number]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey) }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gray-50 p-6 sm:p-10">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl text-classic-black">{item.name}</h3>
              {item.featured && (
                <span className="bg-classic-red text-white text-xs font-bold px-2.5 py-1 rounded-full">FLAGSHIP</span>
              )}
              {item.pink && (
                <span className="bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-white" /> PINK THEORY
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lightboxItem, setLightboxItem] = useState<typeof FLEET_ITEMS[number] | null>(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="overflow-x-hidden">
      {/* ─── FLEET LIGHTBOX OVERLAY ─── */}
      <AnimatePresence>
        {lightboxItem && <FleetLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>

      {/* ─── NAVIGATION ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-classic-black/95 backdrop-blur-xl shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center group">
              <img
                src="/images/logo.png"
                alt="Classic Towing & Storage"
                className="h-11 sm:h-14 w-auto rounded-lg transform group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-classic-red group-hover:w-2/3 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE}`}
                className="hidden md:flex items-center gap-2 bg-classic-red hover:bg-classic-red-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30 animate-pulse-red"
              >
                <Phone className="w-4 h-4" />
                <span>{PHONE}</span>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="md:hidden flex items-center justify-center w-10 h-10 bg-classic-red rounded-lg animate-pulse-red"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-classic-black/98 backdrop-blur-xl border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(/images/bg-about.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-classic-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-classic-red/3 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-classic-red/10 border border-classic-red/20 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 bg-classic-red rounded-full animate-pulse" />
              <span className="text-classic-red text-sm font-medium">24/7 Emergency Dispatch</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6"
            >
              Southern
              <br />
              Ontario&apos;s
              <br />
              <span className="text-gradient-red">Towing Experts</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              Family-owned since the 1980s. Over 150 service vehicles and active personnel across 4 locations. From light-duty towing to heavy-duty recovery — we handle it all.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`tel:${PHONE}`}
                className="group flex items-center justify-center gap-3 bg-classic-red hover:bg-classic-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/40 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call Now: {PHONE}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Our Services
              </a>
            </motion.div>
          </div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="stat-card text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-classic-steel">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-classic-steel" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative py-24 sm:py-32 bg-classic-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-classic-red/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <span className="text-classic-red font-semibold text-sm uppercase tracking-widest">Our Story</span>
                <h2 className="text-4xl sm:text-5xl font-black text-classic-black mt-3 mb-6 leading-tight">
                  Three Generations of
                  <br />
                  <span className="text-gradient-red">Trusted Service</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Classic Towing & Storage is a soon-to-be three-generation family company. First started by Dinis Falcao, the company has been taken over by his son Paul, whose children are now also getting involved.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  What started as a small light-duty fleet in the 1980s has grown into one of Ontario&apos;s leading towing and storage companies — with over 150 trucks including state-of-the-art heavy-duty equipment, flatbeds, and rotators.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-classic-red/5 border border-classic-red/10 rounded-lg px-4 py-2">
                    <ShieldCheck className="w-5 h-5 text-classic-red" />
                    <span className="text-sm font-medium">ISO Certified</span>
                  </div>
                  <div className="flex items-center gap-2 bg-classic-red/5 border border-classic-red/10 rounded-lg px-4 py-2">
                    <Award className="w-5 h-5 text-classic-red" />
                    <span className="text-sm font-medium">As Seen on Heavy Rescue 401</span>
                  </div>
                  <div className="flex items-center gap-2 bg-classic-red/5 border border-classic-red/10 rounded-lg px-4 py-2">
                    <Users className="w-5 h-5 text-classic-red" />
                    <span className="text-sm font-medium">Police Contract Partner</span>
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-classic-red/5 rounded-3xl -rotate-2" />
                <div className="absolute -inset-4 bg-classic-black/5 rounded-3xl rotate-1" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/Classic-4.png"
                    alt="Classic Towing heavy duty truck"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-classic-red text-white px-6 py-4 rounded-xl shadow-xl">
                  <div className="text-3xl font-black">40+</div>
                  <div className="text-sm opacity-90">Years Strong</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="relative py-24 sm:py-32 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-classic-red font-semibold text-sm uppercase tracking-widest">What We Do</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
                Towing & Roadside Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                From lockouts to heavy-duty recovery — available 24 hours a day, 7 days a week across Southern Ontario.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.05}>
                <div className="group relative h-full">
                  <div className="h-full glass-card rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/5 cursor-default">
                    <div className="w-12 h-12 bg-classic-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-classic-red/20 transition-colors duration-300">
                      <service.icon className="w-6 h-6 text-classic-red" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Emergency CTA */}
          <FadeIn delay={0.3}>
            <div className="mt-16 relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-classic-red" />
              <div className="absolute inset-0 bg-[url('/images/bg-strap.jpg')] bg-cover bg-center opacity-20 mix-blend-multiply" />
              <div className="relative px-8 py-12 sm:py-16 text-center">
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">Need Help Right Now?</h3>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Request service from your mobile device anytime day or night. Fast, convenient, and always available.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-2 bg-white text-classic-red hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Call {PHONE}
                  </a>
                  <a
                    href={`tel:${PHONE_TOLL}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                  >
                    Toll Free: {PHONE_TOLL}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section id="fleet" className="relative py-24 sm:py-32 bg-classic-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-classic-red font-semibold text-sm uppercase tracking-widest">Our Fleet</span>
              <h2 className="text-4xl sm:text-5xl font-black text-classic-black mt-3 mb-4">
                Ontario&apos;s Most Diversified Fleet
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Over 150 trucks including 1-ton, medium, heavy-duty, flatbed, tandem, float, and rotator vehicles — ready to handle any job.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FLEET_ITEMS.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.08} className={item.featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}>
                <button
                  onClick={() => setLightboxItem(item)}
                  className={`group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full w-full text-left cursor-pointer ${item.pink ? 'bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-200/50 hover:shadow-pink-200/40' : 'bg-gray-50 hover:shadow-black/10'}`}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/5 transition-all duration-500 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400 shadow-lg">
                      <svg className="w-6 h-6 text-classic-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden bg-gray-100/50 ${item.featured ? 'aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-4rem)]' : 'aspect-[4/3]'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-classic-black">{item.name}</h3>
                      {item.featured && (
                        <span className="bg-classic-red text-white text-xs font-bold px-2 py-0.5 rounded-full">FLAGSHIP</span>
                      )}
                      {item.pink && (
                        <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-white" /> PINK THEORY
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT MAKES US DIFFERENT ─── */}
      <section className="relative py-24 sm:py-32 bg-classic-charcoal overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-classic-red/3 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="text-classic-red font-semibold text-sm uppercase tracking-widest">Why Classic</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-6 leading-tight">
                Changing Your Outlook
                <br />
                <span className="text-gradient-red">On The Industry</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Classic Towing is built on a foundation of honesty, safety, and community. Our trucks are constantly maintained, our drivers are friendly professionals, and we take pride in being a positive force in the towing industry.
              </p>
              <div className="space-y-4">
                {[
                  'Family-owned — personal accountability, not corporate runaround',
                  'Featured on Discovery Channel\'s Heavy Rescue 401',
                  'Under contract with several police districts',
                  'Pink Theory initiative — empowering women in towing',
                  'Active in community giving and involvement',
                  'ISO certified for quality and safety standards',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-classic-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-classic-red rounded-full" />
                    </div>
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <Building2 className="w-8 h-8 text-classic-red mb-3" />
                    <div className="text-2xl font-black text-white">4</div>
                    <div className="text-sm text-gray-400">Locations across Ontario</div>
                  </div>
                  <div className="bg-classic-red rounded-2xl p-6">
                    <Users className="w-8 h-8 text-white mb-3" />
                    <div className="text-2xl font-black text-white">150+</div>
                    <div className="text-sm text-white/80">Active personnel</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <Star className="w-8 h-8 text-classic-red mb-3" />
                    <div className="text-2xl font-black text-white">4.5★</div>
                    <div className="text-sm text-gray-400">Google rating</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <Truck className="w-8 h-8 text-classic-red mb-3" />
                    <div className="text-2xl font-black text-white">150+</div>
                    <div className="text-sm text-gray-400">Service vehicles</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── PINK THEORY ─── */}
      <section id="pink-theory" className="relative py-[10mm] pt-[calc(10mm+5rem)] overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 30%, #FFF5F8 60%, #FFFFFF 100%)' }}>
        {/* Decorative pink elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-200/30 to-pink-300/20 rounded-3xl -rotate-2" />
                <div className="absolute -inset-4 bg-gradient-to-tr from-pink-100/20 to-transparent rounded-3xl rotate-1" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-pink-900/10 border border-pink-200/30">
                  <img
                    src="/images/Classic-22.png"
                    alt="Pink Theory underground tow truck"
                    className="w-full h-auto"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-pink-500 text-white px-5 py-3 rounded-xl shadow-xl shadow-pink-500/30">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-white" />
                    <span className="font-black text-lg">Pink Theory</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Content side */}
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-6">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <span className="text-pink-600 text-sm font-semibold">Empowering Women in Towing</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-classic-black mt-2 mb-6 leading-tight">
                  Changing the Face of
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">The Towing Industry</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  <strong className="text-classic-black">Pink Theory</strong> is an initiative founded by Mercedez Falcao, Regional Manager of Classic Towing&apos;s Northern Division and Paul&apos;s daughter. Her mission: make towing careers more visible and appealing to women across Canada.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Through a signature splash of pink on trucks and uniforms, Pink Theory has created a growing community of female tow operators. New female hires receive pink gloves and straps — and those who stay on and meet their goals are offered a fully pink, branded truck. Mercedez was named <strong className="text-classic-black">Tow Times&apos; Woman of Towing</strong>, and Pink Theory has been featured in CAA Magazine.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white border border-pink-100 rounded-xl p-4 shadow-sm">
                    <Sparkles className="w-6 h-6 text-pink-500 mb-2" />
                    <div className="font-bold text-classic-black">Pink Perks</div>
                    <div className="text-sm text-gray-500">Pink gloves, straps & branded trucks for female drivers</div>
                  </div>
                  <div className="bg-white border border-pink-100 rounded-xl p-4 shadow-sm">
                    <Award className="w-6 h-6 text-pink-500 mb-2" />
                    <div className="font-bold text-classic-black">Award Winning</div>
                    <div className="text-sm text-gray-500">Featured in Tow Times & CAA Magazine</div>
                  </div>
                  <div className="bg-white border border-pink-100 rounded-xl p-4 shadow-sm">
                    <Users className="w-6 h-6 text-pink-500 mb-2" />
                    <div className="font-bold text-classic-black">Community</div>
                    <div className="text-sm text-gray-500">Growing network of female tow operators across North America</div>
                  </div>
                  <div className="bg-white border border-pink-100 rounded-xl p-4 shadow-sm">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500 mb-2" />
                    <div className="font-bold text-classic-black">Family Legacy</div>
                    <div className="text-sm text-gray-500">Third generation leading the way at Classic Towing</div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/p/Pink-Theory-61560624817152/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 hover:-translate-y-0.5"
                  >
                    Follow Pink Theory
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/pinkktheory_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-pink-50 text-pink-600 border border-pink-200 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  >
                    @pinkktheory_
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section id="locations" className="relative py-24 sm:py-32 bg-classic-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-classic-red font-semibold text-sm uppercase tracking-widest">Find Us</span>
              <h2 className="text-4xl sm:text-5xl font-black text-classic-black mt-3 mb-4">
                Our Locations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Strategically positioned across the Golden Horseshoe for rapid response — and servicing well beyond.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.08}>
                <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/10 hover:border-classic-red/20 transition-all duration-500 hover:-translate-y-1">
                  <div className="h-2 bg-classic-red" />
                  <div className="p-6">
                    <h3 className="text-xl font-black text-classic-black mb-4">{loc.city}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-classic-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-classic-red flex-shrink-0" />
                        <a href={`tel:${loc.phone}`} className="text-classic-black font-semibold hover:text-classic-red transition-colors">{loc.phone}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-classic-red flex-shrink-0" />
                        <span className="text-gray-600">Dispatch: {loc.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-classic-red flex-shrink-0" />
                        <a href={`mailto:${loc.email}`} className="text-gray-600 hover:text-classic-red transition-colors text-xs break-all">{loc.email}</a>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400">Office: {loc.officeHours}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Service area note */}
          <FadeIn delay={0.3}>
            <div className="mt-10 text-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5">
              <p className="text-gray-600">
                <span className="font-semibold text-classic-black">Serving all of Southern Ontario</span> — including Mississauga, Huntsville, Brampton, Oakville, Oshawa, and beyond. Our locations are positioned across the Golden Horseshoe for rapid response, but our fleet goes wherever you need us.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="relative py-24 sm:py-32 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/bg-reviews.jpg')] bg-cover bg-center" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-classic-red font-semibold text-sm uppercase tracking-widest">Testimonials</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
                What Our Customers Say
              </h2>
              <div className="flex items-center justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-gray-400 ml-2">Based on 98+ reviews</span>
              </div>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <FadeIn key={review.name} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-500">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-classic-red/20 rounded-full flex items-center justify-center">
                      <span className="text-classic-red font-bold text-sm">{review.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{review.name}</div>
                      <div className="text-gray-500 text-xs">Google Review</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAREERS ─── */}
      <section id="careers" className="relative py-[10mm] pt-[calc(10mm+5rem)] bg-classic-white overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative rounded-3xl overflow-hidden min-h-[calc(100vh-20mm-5rem)]">
            {/* Dark dramatic background */}
            <div className="absolute inset-0 bg-classic-black" />
            <div className="absolute inset-0 bg-[url('/images/bg-strap.jpg')] bg-cover bg-center opacity-10" />
            {/* Red accent glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-classic-red/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-classic-red/10 rounded-full blur-3xl" />

            <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 min-h-[calc(100vh-20mm-5rem)] flex items-center">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left: Content */}
                <FadeIn>
                  <div>
                    <div className="inline-flex items-center gap-2 bg-classic-red/10 border border-classic-red/20 rounded-full px-3 py-1 mb-4">
                      <Zap className="w-3.5 h-3.5 text-classic-red" />
                      <span className="text-classic-red text-xs font-semibold">Now Hiring</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4">
                      Not All Heroes
                      <br />
                      Wear Capes.
                      <br />
                      <span className="text-gradient-red">Some Drive Trucks.</span>
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed max-w-lg">
                      Every day, our drivers rescue stranded motorists, clear accident scenes, and keep Ontario&apos;s roads moving. If you&apos;re looking for a career where you make a real difference — this is it.
                    </p>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
                      {[
                        { title: 'Competitive pay', desc: 'Work that pays well & matters' },
                        { title: 'Full training', desc: 'No experience needed' },
                        { title: 'Family culture', desc: 'You\'re one of our own' },
                        { title: 'Career growth', desc: 'Long-term, not just a job' },
                      ].map((perk, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-classic-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="w-4 h-4 text-classic-red" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{perk.title}</div>
                            <div className="text-gray-500 text-xs">{perk.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="mailto:careers@classictowing.ca"
                        className="group flex items-center justify-center gap-2 bg-classic-red hover:bg-classic-red-dark text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/40 hover:-translate-y-0.5"
                      >
                        <Mail className="w-4 h-4" />
                        Apply Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href={`tel:${PHONE}`}
                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                      >
                        <Phone className="w-4 h-4" />
                        Call Us to Learn More
                      </a>
                    </div>
                  </div>
                </FadeIn>

                {/* Right: Visual */}
                <FadeIn delay={0.2}>
                  <div className="relative">
                    {/* Quote card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="text-5xl text-classic-red/30 font-serif leading-none mb-2">&ldquo;</div>
                      <p className="text-lg sm:text-xl text-white font-medium leading-relaxed mb-4">
                        Every call is someone&apos;s worst day. We show up and make it better. That&apos;s not just a job — that&apos;s a calling.
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-classic-red rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">The Classic Towing Team</div>
                          <div className="text-gray-500 text-xs">Family-owned since the 1980s</div>
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="bg-classic-red rounded-xl p-3 text-center">
                        <div className="text-xl font-black text-white">150+</div>
                        <div className="text-xs text-white/70">Team Members</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-xl font-black text-white">4</div>
                        <div className="text-xs text-gray-400">Locations</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-xl font-black text-white">40+</div>
                        <div className="text-xs text-gray-400">Years Strong</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT / CTA ─── */}
      <section id="contact" className="relative py-24 sm:py-32 bg-classic-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-classic-black rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/bg-footer.jpg')] bg-cover bg-center opacity-15" />
            <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-classic-red/10 to-transparent" />
            <div className="relative px-8 sm:px-12 lg:px-16 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                    Need a Tow?
                    <br />
                    <span className="text-gradient-red">We&apos;re Ready.</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Day or night, rain or shine — our fleet is standing by across Southern Ontario. One call and we&apos;re on our way.
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`tel:${PHONE}`}
                      className="group flex items-center justify-center gap-3 bg-classic-red hover:bg-classic-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/40"
                    >
                      <Phone className="w-5 h-5" />
                      {PHONE}
                    </a>
                    <a
                      href={`tel:${PHONE_TOLL}`}
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                    >
                      Toll Free: {PHONE_TOLL}
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  {LOCATIONS.map((loc) => (
                    <a
                      key={loc.city}
                      href={`tel:${loc.phone}`}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-300 group"
                    >
                      <div className="text-white font-bold mb-1">{loc.city}</div>
                      <div className="text-classic-red text-sm font-medium group-hover:underline">{loc.phone}</div>
                    </a>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-classic-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <img
                  src="/images/logo.png"
                  alt="Classic Towing & Storage"
                  className="h-14 w-auto rounded-lg"
                />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Family-owned and operated since the 1980s. Ontario&apos;s most trusted towing and storage company.
              </p>
              <a
                href={`tel:${PHONE_TOLL}`}
                className="text-classic-red font-bold text-lg hover:text-classic-red-light transition-colors"
              >
                {PHONE_TOLL}
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <a key={item.label} href={item.href} className="block text-gray-500 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <div className="space-y-2">
                {['Light Duty Towing', 'Medium Duty Towing', 'Heavy Duty Towing', 'Roadside Assistance', 'Accident Recovery', 'Lockouts & Jump Starts'].map((s) => (
                  <span key={s} className="block text-gray-500 text-sm">{s}</span>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-white font-bold mb-4">Locations</h4>
              <div className="space-y-2">
                {LOCATIONS.map((loc) => (
                  <div key={loc.city} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{loc.city}</span>
                    <a href={`tel:${loc.phone}`} className="text-classic-red hover:text-classic-red-light transition-colors font-medium">
                      {loc.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Classic Towing & Storage. All rights reserved.
            </span>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
