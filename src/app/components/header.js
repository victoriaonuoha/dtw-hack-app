"use client";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between px-[1rem] lg:px-20 mt-4 relative">
        {/* Logo */}
        <h1 className="text-3xl text-[#2D85FF] font-bold">CredScore</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-between w-[50%]">
          <Link href="#" className="hover:border-b-4">
            About Us
          </Link>
          <Link href="#" className="hover:border-b-4">
            Partners
          </Link>

          <Link href="#" className="hover:border-b-4">
            FAQ
          </Link>
          <Link
            href="#"
            className="bg-[#2D85FF] text-white px-4 py-2 rounded-lg hover:underline"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          {/* Sign in button */}
          <Link
            href="#"
            className="bg-[#2D85FF] text-white px-4 py-2 rounded-lg hover:underline mr-2"
          >
            Sign in
          </Link>

          {/* Hamburger Icon */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
            {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-60 flex flex-col items-start p-3 md:hidden">
            <Link
              href="#"
              className="py-2 px-2 w-full hover:bg-[#2D85FF] hover:text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#"
              className="py-2 px-2 w-full hover:bg-[#2D85FF] hover:text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Partners
            </Link>
            <Link
              href="#"
              className="py-2 px-2 w-full hover:bg-[#2D85FF] hover:text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
