import { Link } from "react-router-dom";
import { FaVideo, FaShieldAlt, FaBell, FaClock, FaCog, FaTools, FaEnvelope, FaPhone } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/60 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <FaVideo className="w-6 h-6" />
            <span>MICRO CCTV</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-red-500">HOME</Link>
            <Link to="/shop" className="hover:text-red-500">SHOP</Link>
            <Link to="/service" className="hover:text-red-500">SERVICE</Link>
            <Link to="/about" className="hover:text-red-500">ABOUT</Link>
            <Link to="/contact" className="hover:text-red-500">CONTACT</Link>
          </nav>
          <Link to="/login" className="text-xs md:text-sm bg-red-600 hover:bg-red-700 transition rounded-full px-4 py-2">LOGIN</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full min-h-[520px] md:min-h-[640px] flex items-center overflow-hidden bg-black">
        <img
          src="/Hero.jpg"
          alt="Control room"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <img
          src="/ne.png"
          alt="CCTV cameras"
          className="pointer-events-none absolute right-0 top-10 w-[520px] max-w-[85%] hidden md:block"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            <span className="block">MICRO</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">CCTV</span>
          </h1>
          <p className="mt-4 text-2xl md:text-3xl font-semibold text-white">SECURITY SOLUTION</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <FeatureBadge icon={<FaVideo className="w-5 h-5" />} title="Premium Indoor" desc="Cameras" />
            <FeatureBadge icon={<FaShieldAlt className="w-5 h-5" />} title="Amazing Security" desc="Systems" />
            <FeatureBadge icon={<FaClock className="w-5 h-5" />} title="24/7 Quick Alarms" desc="Response" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm tracking-widest text-red-600 font-semibold">ABOUT US</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
              Protecting homes,
              <br /> businesses and
              <br /> peace
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-neutral-700 max-w-[520px]">
              We specialize in providing top-quality security and CCTV solutions to safeguard your home and business.
              Our mission is to ensure peace of mind with reliable, innovative, and tailored protection systems.
            </p>
            <Link
              to="/about"
              className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 text-sm"
            >
              ABOUT MORE
            </Link>
          </div>

          <div className="grid gap-6">
            <img src="/Ph1.jpg" alt="Tech installing camera" className="rounded-xl shadow-lg object-cover w-full h-64" />
            <div className="grid grid-cols-2 gap-6">
              <img src="/Ph1.jpg" alt="Operations desk" className="rounded-xl shadow-lg object-cover h-48 w-full" />
              <img src="/Ph2.jpg" alt="Monitoring" className="rounded-xl shadow-lg object-cover h-48 w-full" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm font-semibold">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">10+</span>
          <span>We Have More Than 10+ Years of CCTV Services Experience</span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-5 h-5 rounded-full bg-red-500" />
            <h3 className="text-xl font-bold tracking-wide">SERVICES</h3>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ServiceCard
              img="/Ph3.jpg"
              title="CCTV Installation"
              icon={<FaTools className="w-5 h-5" />}
            />
            <ServiceCard
              img="/Ph4.jpg"
              title="Security Systems"
              icon={<FaShieldAlt className="w-5 h-5" />}
            />
            <ServiceCard
              img="/Ph5.jpg"
              title="Alarm Systems Installation"
              icon={<FaBell className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-5 h-5 rounded-full bg-red-500" />
            <h3 className="text-xl font-bold tracking-wide">WHY CHOOSE US</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <WhyItem icon={<FaClock className="w-6 h-6" />} title="24/7 Support" desc="Professional CCTV installation services offering high-quality cameras." />
              <WhyItem icon={<FaCog className="w-6 h-6" />} title="Remote Access" desc="Monitor your premises from anywhere with reliable access." />
            </div>

            <div className="order-1 lg:order-2">
              <img src="/Ph7.png" alt="Cameras" className="mx-auto max-h-[360px] object-contain" />
            </div>

            <div className="space-y-10 order-3">
              <WhyItem icon={<FaShieldAlt className="w-6 h-6" />} title="Customized Solution" desc="Tailored security systems to meet your exact needs." />
              <WhyItem icon={<FaTools className="w-6 h-6" />} title="Quality Installation" desc="Clean, safe, and durable installs by professionals." />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative bg-red-600 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-widest text-red-100 text-xs">Contact Us</p>
            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight mt-2">
              Secure your world with
              <br /> trusted solutions join
              <br /> today!
            </h3>
            <div className="flex items-center gap-6 mt-6 text-sm">
              <a href="tel:+94768841006" className="inline-flex items-center gap-2 hover:opacity-90">
                <FaPhone className="w-4 h-4" /> +94 768 841 006
              </a>
              <a href="mailto:tharangaviii36@gmail.com" className="inline-flex items-center gap-2 hover:opacity-90">
                <FaEnvelope className="w-4 h-4" /> tharangaviii36@gmail.com
              </a>
            </div>
          </div>

          <img src="/Ph6.png" alt="Technician" className="md:justify-self-end w-[360px] md:w-[420px] lg:w-[460px]" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <FaVideo className="w-5 h-5" /> MicroCCTV
            </div>
            <p className="mt-4 text-sm opacity-80">
              We provide advanced security solutions, offering 24/7 protection with high-quality systems.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Quick Link</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white/90">HOME</Link></li>
              <li><Link to="/shop" className="hover:text-white/90">SHOP</Link></li>
              <li><Link to="/service" className="hover:text-white/90">SERVICE</Link></li>
              <li><Link to="/about" className="hover:text-white/90">ABOUT</Link></li>
              <li><Link to="/contact" className="hover:text-white/90">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>24/7 service</li>
              <li>CCTV Installation</li>
              <li>Alarm system installation</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>+94 768 841 006</li>
              <li>tharangaviii36@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs py-4 border-t border-white/10">
          Copyright © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureBadge({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl p-4">
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">{icon}</div>
      <div className="leading-tight">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs opacity-80">{desc}</p>
      </div>
    </div>
  );
}

function ServiceCard({ img, title, icon }) {
  return (
    <div className="group rounded-2xl overflow-hidden shadow-sm bg-white">
      <div className="relative h-40">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <div className="absolute -bottom-6 left-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-lg">
          {icon}
        </div>
      </div>
      <div className="pt-8 pb-6 px-6">
        <h4 className="font-semibold">{title}</h4>
      </div>
    </div>
  );
}

function WhyItem({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-neutral-600 mt-1 max-w-[280px]">{desc}</p>
      </div>
    </div>
  );
}
