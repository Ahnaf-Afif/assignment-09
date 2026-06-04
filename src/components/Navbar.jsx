"use client";
import { authClient } from "../app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dumbbell,
  Menu,
  X,
  ChevronDown,
  CalendarCheck,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-green-600 p-1.5 rounded-lg">
            <Dumbbell className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-900">SportNest</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <li>
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/facilities"
              className="hover:text-green-600 transition-colors"
            >
              All Facilities
            </Link>
          </li>
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full pl-1 pr-3 py-1 transition-colors"
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=16a34a&color=fff`;
                  }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-54 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50"
                  onBlur={() => setDropdownOpen(false)}
                >
                  <Link
                    href="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <CalendarCheck className="w-4 h-4 text-green-600" /> My
                    Bookings
                  </Link>
                  <Link
                    href="/add-facility"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 text-green-600" /> Add Facility
                  </Link>
                  <Link
                    href="/manage-facilities"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 text-green-600" /> Manage My
                    Facilities
                  </Link>
                  <hr className="my-1.5 border-gray-100" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-4 space-y-3 bg-white">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 font-medium py-1"
          >
            Home
          </Link>
          <Link
            href="/facilities"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 font-medium py-1"
          >
            All Facilities
          </Link>
          {user ? (
            <>
              <Link
                href="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-medium py-1"
              >
                My Bookings
              </Link>
              <Link
                href="/add-facility"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-medium py-1"
              >
                Add Facility
              </Link>
              <Link
                href="/manage-facilities"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-medium py-1"
              >
                Manage Facilities
              </Link>
              <button
                onClick={handleSignOut}
                className="text-red-500 font-medium py-1"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-green-600 text-white text-center py-2.5 rounded-lg font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
