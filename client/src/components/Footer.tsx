// ShopWave – Footer Component
// Design: Sunrise Marketplace – deep navy background, warm accents

import { Link } from "wouter";
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  "Get to Know Us": [
    { label: "About ShopWave", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Releases", href: "#" },
    { label: "Sustainability", href: "#" },
  ],
  "Shop With Us": [
    { label: "Your Account", href: "#" },
    { label: "Returns Centre", href: "#" },
    { label: "100% Purchase Protection", href: "#" },
    { label: "App Download", href: "#" },
  ],
  "Let Us Help You": [
    { label: "COVID-19 Updates", href: "#" },
    { label: "Shipping Rates", href: "#" },
    { label: "Amazon Prime", href: "#" },
    { label: "Help Centre", href: "#" },
  ],
  "Make Money With Us": [
    { label: "Sell on ShopWave", href: "#" },
    { label: "Affiliate Programme", href: "#" },
    { label: "Advertise Your Products", href: "#" },
    { label: "ShopWave Business", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#2A2A3E] hover:bg-[#3A3A4E] text-white text-sm py-3 font-body transition-colors"
      >
        Back to top
      </button>

      {/* Main footer */}
      <div className="bg-[#1A1A2E] text-white">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-bold mb-4 font-display text-white">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-[#E8700A] transition-colors font-body"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8700A] flex items-center justify-center">
                  <ShoppingCart size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <span
                  className="text-xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Shop<span style={{ color: "#E8700A" }}>Wave</span>
                </span>
              </div>
            </Link>

            {/* Contact info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-body">
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-[#E8700A]" />
                <span>1-800-SHOPWAVE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-[#E8700A]" />
                <span>support@shopwave.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#E8700A]" />
                <span>New York, NY 10001</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8700A] flex items-center justify-center transition-colors"
                >
                  <Icon size={15} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Payment methods & copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 font-body">
              © 2026 ShopWave, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {["Visa", "MC", "PayPal", "Amex", "Apple Pay"].map((method) => (
                <span
                  key={method}
                  className="bg-white/10 text-gray-300 text-[10px] font-bold px-2 py-1 rounded font-body"
                >
                  {method}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 font-body">
              <a href="#" className="hover:text-[#E8700A] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E8700A] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#E8700A] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
