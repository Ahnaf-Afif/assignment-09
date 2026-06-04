import Link from "next/link";
import { Dumbbell, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Brand */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Dumbbell className="text-white w-5 h-5" />
            </div>
            <h1 className="text-3xl font-bold text-white">SportNest</h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed">
            Your ultimate platform for booking sports facilities. Find and
            reserve football turfs, badminton courts, swimming lanes, tennis
            courts, and much more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="hover:text-white transition-colors"
                >
                  All Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="hover:text-white transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/add-facility"
                  className="hover:text-white transition-colors"
                >
                  Add Facility
                </Link>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Sports
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                Football
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Badminton
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Swimming
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Tennis
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Cricket
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Refund Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" /> +880 1700-000000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" /> hello@sportnest.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" /> Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 SportNest. All rights reserved.</p>
          <div className="flex gap-5 text-white text-sm font-semibold">
            <span className="cursor-pointer hover:text-green-400 transition-colors">
              𝕏
            </span>
            <span className="cursor-pointer hover:text-green-400 transition-colors">
              in
            </span>
            <span className="cursor-pointer hover:text-green-400 transition-colors">
              f
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
