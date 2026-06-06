"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FacilityCard from "../components/FacilityCard";
import { sportCategories } from "./lib/mockData";
import {
  ArrowRight,
  CheckCircle,
  Search,
  CalendarCheck,
  Zap,
} from "lucide-react";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/facility`,
        );
        if (!res.ok) throw new Error("Failed to load facilities");
        const data = await res.json();
        setFeatured(data.slice(0, 6));
      } catch {
        setFeatured([]);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/75 to-gray-900/40" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🏟️ Bangladesh's #1 Sports Booking Platform
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Find & Book{" "}
              <span className="text-green-400">Sports Facilities</span> Near You
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Instantly reserve football turfs, badminton courts, swimming
              pools, tennis courts, and more. No phone calls, no hassle — just
              play.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/facility"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-colors flex items-center gap-2"
              >
                Explore Facilities <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/signup"
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
              >
                Create Free Account
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> 100+
                facilities
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> Instant
                confirmation
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> 8 sport types
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sport Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Browse by Sport
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Find facilities for your favourite sport
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {sportCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/facility?type=${cat.name}`}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 hover:scale-105 transition-all duration-200 cursor-pointer ${cat.color}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Facilities */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Facilities
            </h2>
            <p className="text-gray-500">
              Top-rated venues loved by players across Dhaka
            </p>
          </div>
          <Link
            href="/facility"
            className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-green-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            How SportNest Works
          </h2>
          <p className="text-gray-400 text-center mb-14">
            Get on the field in 3 simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Search className="w-7 h-7 text-green-400" />,
                title: "Search Your Sport",
                desc: "Browse facilities by sport type or search by name. Filter by location, price, and available slots.",
              },
              {
                step: "02",
                icon: <CalendarCheck className="w-7 h-7 text-green-400" />,
                title: "Pick a Time Slot",
                desc: "Choose your preferred date and time slot. See real-time availability and book instantly.",
              },
              {
                step: "03",
                icon: <Zap className="w-7 h-7 text-green-400" />,
                title: "Show Up & Play",
                desc: "Get instant booking confirmation. Show up at the facility and enjoy your game!",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <span className="text-5xl font-black text-green-500/20 absolute top-4 right-6">
                  {item.step}
                </span>
                <div className="bg-green-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SportNest */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Players Choose SportNest
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We make sports accessible for everyone. Whether you're a weekend
              warrior or a competitive athlete, SportNest connects you to the
              best facilities in your city.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time slot availability — no double bookings",
                "Verified facilities with quality guarantees",
                "Instant booking confirmation via email",
                "Easy cancellation up to 24 hours before",
                "Transparent pricing with no hidden fees",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-gray-700 text-sm"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/facility"
              className="inline-flex items-center gap-2 mt-8 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Book a Facility <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { count: "100+", label: "Active Facilities" },
              { count: "5,000+", label: "Happy Players" },
              { count: "8", label: "Sport Types" },
              { count: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-extrabold text-green-600 mb-1">
                  {stat.count}
                </div>
                <div className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-6 mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
        <div className="max-w-4xl mx-auto px-10 py-16 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to Play?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join thousands of players booking their favourite sports facilities
            on SportNest.
          </p>
          <Link
            href="/signup"
            className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
