"use client";

import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1C]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
          >
            <span className="text-2xl font-bold text-white">
              Far<span className="text-purple-500">sight</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/user"
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105"
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/user"
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-all duration-200 hover:scale-105"
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1C1C1C]">
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute left-0 right-0 top-16 bg-[#1C1C1C] border-b border-gray-800 shadow-lg animate-fadeIn"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/user"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ChartBarIcon className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              <Link
                href="/user"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>My Profile</span>
              </Link>
              <button
                className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
