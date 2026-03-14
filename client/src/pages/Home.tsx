// ShopWave – Home Page
// Design: Sunrise Marketplace (Warm Modernism + Editorial Commerce)
// Sections: Hero, Categories, Featured Products, Promo Banner, Deals of the Day, Trending

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Headphones, Flame, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { products, categories, getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Hero slides data
const heroSlides = [
  {
    id: 1,
    tag: "New Collection",
    headline: "Discover Premium\nProducts for Every\nLifestyle",
    subtext: "Shop thousands of curated products from top brands, delivered to your door.",
    cta: "Shop Now",
    ctaLink: "/products",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/hero-banner-MCgwKdZxHN7iPGzDNd6uiu.webp",
    accent: "#E8700A",
  },
  {
    id: 2,
    tag: "Electronics Sale",
    headline: "The Latest Tech\nAt Unbeatable\nPrices",
    subtext: "Up to 30% off on premium electronics. Limited time offer.",
    cta: "Shop Electronics",
    ctaLink: "/products?category=electronics",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-electronics-NNjdtAbKKHsymZQagVH5DX.webp",
    accent: "#1A1A2E",
  },
  {
    id: 3,
    tag: "Fashion Week",
    headline: "Elevate Your\nStyle With\nPremium Fashion",
    subtext: "Curated collections from the world's finest designers and brands.",
    cta: "Explore Fashion",
    ctaLink: "/products?category=fashion",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-fashion-SvtaJQxqfPX5bSLuhNeYgH.webp",
    accent: "#8B5E3C",
  },
];

// Trust badges
const trustBadges = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

// Countdown timer hook
function useCountdown(targetHours = 8) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: targetHours, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetHours]);
  return time;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdown = useCountdown(8);
  const featuredProducts = getFeaturedProducts();
  const dealsProducts = products.filter((p) => p.badge === "sale").slice(0, 4);
  const trendingProducts = products.filter((p) => p.badge === "bestseller").slice(0, 4);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-[#F5F0EB]">
        <div className="relative h-[520px] md:h-[600px] lg:h-[640px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/85 via-[#1A1A2E]/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 container h-full flex items-center">
                <div className="max-w-xl">
                  <motion.div
                    key={`tag-${index}-${currentSlide}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={index === currentSlide ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-2 bg-[#E8700A] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 font-body uppercase tracking-wider"
                  >
                    <Flame size={12} />
                    {slide.tag}
                  </motion.div>

                  <motion.h1
                    key={`h1-${index}-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 font-display"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {slide.headline}
                  </motion.h1>

                  <motion.p
                    key={`p-${index}-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-white/80 text-base md:text-lg mb-8 font-body leading-relaxed"
                  >
                    {slide.subtext}
                  </motion.p>

                  <motion.div
                    key={`cta-${index}-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <Link href={slide.ctaLink}>
                      <button className="btn-primary-pill flex items-center gap-2 px-8 py-3.5 text-base shadow-lg shadow-[#E8700A]/30">
                        {slide.cta}
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                    <Link href="/products">
                      <button className="text-white/80 hover:text-white text-sm font-semibold font-body flex items-center gap-1 transition-colors">
                        Browse All
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide
                    ? "w-8 h-2.5 bg-[#E8700A]"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="bg-white border-b border-[#E8E8E0]">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 bg-[#F5F0EB] rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#E8700A]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A2E] font-body">{title}</p>
                  <p className="text-xs text-gray-500 font-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-14">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-xs font-bold text-[#E8700A] uppercase tracking-widest mb-1 font-body">
                Browse
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-display">
                Shop by Category
              </h2>
            </div>
            <Link href="/products">
              <button className="text-sm font-semibold text-[#E8700A] hover:underline font-body flex items-center gap-1">
                All Categories <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link href={`/products?category=${cat.id}`}>
                  <div className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F0EB] shrink-0">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#1A1A2E] font-body leading-tight">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-body mt-0.5">
                        {cat.productCount}+
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-14">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-xs font-bold text-[#E8700A] uppercase tracking-widest mb-1 font-body">
                Handpicked
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-display">
                Featured Products
              </h2>
            </div>
            <Link href="/products">
              <button className="text-sm font-semibold text-[#E8700A] hover:underline font-body flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROMO BANNER ─── */}
      <section className="py-6">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/promo-banner-HePRGyruq4Jiq8pmd59aHm.webp"
              alt="Special Offer"
              className="w-full h-56 md:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/80 via-[#1A1A2E]/40 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-md">
                  <span className="text-[#E8700A] text-xs font-bold uppercase tracking-widest font-body">
                    Limited Time Offer
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3 font-display">
                    Up to 40% Off<br />Summer Sale
                  </h2>
                  <p className="text-white/70 text-sm mb-5 font-body">
                    Exclusive deals on thousands of products. Don't miss out!
                  </p>
                  <Link href="/products">
                    <button className="btn-primary-pill flex items-center gap-2 shadow-lg shadow-[#E8700A]/30">
                      Shop the Sale
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEALS OF THE DAY ─── */}
      <section className="py-14 bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame size={18} className="text-[#E8700A]" />
                <p className="text-xs font-bold text-[#E8700A] uppercase tracking-widest font-body">
                  Hot Deals
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-display">
                Deals of the Day
              </h2>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 font-body">
                <Clock size={14} className="text-[#E8700A]" />
                Ends in:
              </div>
              <div className="flex items-center gap-1">
                {[pad(countdown.h), pad(countdown.m), pad(countdown.s)].map((val, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="bg-[#1A1A2E] text-white text-sm font-bold px-2.5 py-1.5 rounded-lg font-body min-w-[36px] text-center">
                      {val}
                    </div>
                    {i < 2 && <span className="text-[#E8700A] font-bold">:</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {dealsProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY SPOTLIGHT ─── */}
      <section className="py-14">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <p className="text-xs font-bold text-[#E8700A] uppercase tracking-widest mb-1 font-body">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-display">
              Shop by Lifestyle
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* Large card */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <Link href="/products?category=electronics">
                <div className="group relative overflow-hidden rounded-3xl h-64 md:h-80 cursor-pointer">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-electronics-NNjdtAbKKHsymZQagVH5DX.webp"
                    alt="Electronics"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white/70 text-xs font-body mb-1">248 Products</p>
                    <h3 className="text-2xl font-bold text-white font-display mb-3">Electronics</h3>
                    <span className="inline-flex items-center gap-1.5 bg-[#E8700A] text-white text-xs font-bold px-4 py-2 rounded-full font-body group-hover:bg-white group-hover:text-[#E8700A] transition-colors">
                      Shop Now <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Two small cards */}
            <motion.div variants={fadeUp} className="flex flex-col gap-5">
              <Link href="/products?category=fashion">
                <div className="group relative overflow-hidden rounded-3xl h-[148px] cursor-pointer">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-fashion-SvtaJQxqfPX5bSLuhNeYgH.webp"
                    alt="Fashion"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white font-display">Fashion</h3>
                    <span className="text-white/70 text-xs font-body">512 Products</span>
                  </div>
                </div>
              </Link>
              <Link href="/products?category=home">
                <div className="group relative overflow-hidden rounded-3xl h-[148px] cursor-pointer">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663424410524/7326Wc2VFXLyKkjkYwGnbS/category-home-JrauHpnuaW9osE7DPWNXXB.webp"
                    alt="Home & Living"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white font-display">Home & Living</h3>
                    <span className="text-white/70 text-xs font-body">184 Products</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRENDING NOW ─── */}
      <section className="py-14 bg-[#F5F0EB]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-[#E8700A]" />
                <p className="text-xs font-bold text-[#E8700A] uppercase tracking-widest font-body">
                  Popular
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] font-display">
                Trending Now
              </h2>
            </div>
            <Link href="/products">
              <button className="text-sm font-semibold text-[#E8700A] hover:underline font-body flex items-center gap-1">
                See All <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {trendingProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-16 bg-[#1A1A2E]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-[#E8700A] text-xs font-bold uppercase tracking-widest mb-2 font-body">
              Stay Updated
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">
              Get Exclusive Deals
            </h2>
            <p className="text-white/60 mb-8 font-body">
              Subscribe to our newsletter and be the first to know about sales, new products, and exclusive offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = (e.target as HTMLFormElement).querySelector("input");
                if (input?.value) {
                  import("sonner").then(({ toast }) =>
                    toast.success("You're subscribed! 🎉", {
                      description: "Welcome to ShopWave. Expect great deals soon!",
                    })
                  );
                  input.value = "";
                }
              }}
              className="flex gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-[#E8700A] transition-colors text-sm font-body"
              />
              <button
                type="submit"
                className="btn-primary-pill px-6 py-3 shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/30 text-xs mt-4 font-body">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
