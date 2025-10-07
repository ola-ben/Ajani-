import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Fixed Header - always visible */}
      <header className="fixed top-0 left-0 right-0 z-50   backdrop-blur-sm border-b bg-gray-900 border-gray-700 font-rubik shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-3">
          <nav className="flex items-center justify-between mt-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="#" onClick={closeMenu}>
                <img
                  src="/public/Logos/logo6.png"
                  alt="Ajani Logo"
                  className="h-8 w-24"
                />
                <div className="md:text-sm text-[12.5px] text-slate-300 duration-300 hover:text-gray-600">
                  Ibadan Price Insights
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 text-slate-300 font-medium">
              <a
                href="#priceinsight"
                className="hover:text-slate-600 duration-300"
              >
                Price Insights
              </a>
              <a href="#vendors" className="hover:text-slate-600 duration-300">
                For Businesses
              </a>
              <a href="#toppicks" className="hover:text-slate-600 duration-300">
                Top Picks
              </a>

              <a
                href="#directory"
                className="hover:text-slate-600 duration-300"
              >
                Directory
              </a>
              <a href="#faq" className="hover:text-slate-600 duration-300">
                FAQ
              </a>
            </div>

            {/* Desktop WhatsApp Button */}
            <a
              href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-green-500 duration-300 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition shadow hover:shadow-md hover:-translate-y-0.5"
            >
              <i className="fab fa-whatsapp"></i> Chat with Ajani
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-slate-300 focus:outline-none"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Full-Width Mobile Menu (slides in from LEFT) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Semi-transparent backdrop */}
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-30"
            onClick={closeMenu}
          ></div>

          {/* Full-width sidebar */}
          <div
            className={`fixed left-0 top-0 w-full h-full shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with logo and close button */}
            <div className="p-5 border-b flex justify-between items-center">
              <a href="#" onClick={closeMenu}>
                <img
                  src="/public/Logos/logo6.png"
                  alt="Ajani Logo"
                  className="h-8 w-24"
                />
                <div className="md:text-sm text-[12.5px] hover:text-slate-600 duration-300 text-slate-300 font-rubik mb-[-2px]">
                  Ibadan Price Insights
                </div>
              </a>
              <button
                onClick={closeMenu}
                className="text-slate-300 hover:text-slate-900"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-5 space-y-4 font-rubik">
              <a
                href="#toppicks"
                className="block py-2 text-slate-300 duration-300 hover:text-gray-600 font-medium"
                onClick={closeMenu}
              >
                Top Picks
              </a>
              <a
                href="#priceinsight"
                className="block py-2 text-slate-300 duration-300 hover:text-gray-600 font-medium"
                onClick={closeMenu}
              >
                Price Insights
              </a>
              <a
                href="#vendors"
                className="block py-2 text-slate-300 duration-300 hover:text-gray-600 font-medium"
                onClick={closeMenu}
              >
                For Businesses
              </a>
              <a
                href="#directory"
                className="block py-2 text-slate-300 duration-300 hover:text-gray-600 font-medium"
                onClick={closeMenu}
              >
                Directory
              </a>
              <a
                href="#faq"
                className="block py-2 text-slate-300 duration-300 hover:text-gray-600 font-medium"
                onClick={closeMenu}
              >
                FAQ
              </a>
            </nav>

            {/* WhatsApp Button at Bottom */}
            <div className="p-5 border-t">
              <a
                href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center duration-300 gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold w-full transition"
                onClick={closeMenu}
              >
                <i className="fab fa-whatsapp"></i> Chat with Ajani
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-20 md:h-16"></div>
    </>
  );
};

export default Header;
