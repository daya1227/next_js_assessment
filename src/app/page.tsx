"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [showRightInfo, setShowRightInfo] = useState(false);
  const [showLeftNav, setShowLeftNav] = useState(false);

  const leftNavRef = useRef<HTMLDivElement | null>(null);
  const rightInfoRef = useRef<HTMLDivElement | null>(null);

  // Close Left Navigation when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        leftNavRef.current &&
        !leftNavRef.current.contains(event.target as Node)
      ) {
        setShowLeftNav(false);
      }
    }

    if (showLeftNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLeftNav]);

  // Close Right Panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        rightInfoRef.current &&
        !rightInfoRef.current.contains(event.target as Node)
      ) {
        setShowRightInfo(false);
      }
    }

    if (showRightInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRightInfo]);

  // Function to toggle left nav and close right panel
  const toggleLeftNav = () => {
    setShowLeftNav((prev) => {
      if (!prev) setShowRightInfo(false); // Close Right Panel if opening Left
      return !prev;
    });
  };

  // Function to toggle right panel and close left nav
  const toggleRightInfo = () => {
    setShowRightInfo((prev) => {
      if (!prev) setShowLeftNav(false); // Close Left Nav if opening Right
      return !prev;
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Mobile Navigation Toggle */}
      <div className="p-4 bg-gray-800 text-white md:hidden flex justify-between">
        <button onClick={toggleLeftNav} className="p-2 bg-gray-700 rounded">
          ☰ Menu
        </button>
      </div>

      <div className="flex flex-1 relative">
        {/* Left Navigation */}
        {showLeftNav && <div className="fixed inset-0 bg-black opacity-30 md:hidden"></div>}
        {showRightInfo && <div className="fixed inset-0 bg-black opacity-30"></div>}

        <nav
          ref={leftNavRef}
          className={`bg-gray-100 pt-4 pb-4 pl-3 pr-3 w-[60%] sm:w-[50%] md:w-[15%] fixed md:relative top-0 left-0 h-full shadow-md z-20
          transition-all duration-300 ease-in-out transform ${
            showLeftNav ? "translate-x-0 opacity-100 scale-100" : "-translate-x-full opacity-0 scale-95"
          } md:translate-x-0 md:opacity-100 md:scale-100 md:block border-r border-gray-300`}
        >
          <h2 className="text-lg font-bold pt-4 pb-4">Left Nav</h2>
          <ul className="space-y-2">
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white md:w-[70%] w-full transition-all">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="text-gray-600">This is the main content area.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 outline-none cursor-pointer"
            onClick={toggleRightInfo}
          >
            View Info
          </button>
        </main>

        {/* Right Info Panel */}
        <aside
          ref={rightInfoRef}
          className={`bg-gray-200 p-4 w-[60%] sm:w-[50%] md:w-[15%] fixed md:relative right-0 top-0 h-full shadow-md transition-transform z-20
          ${showRightInfo ? "translate-x-0" : "translate-x-full"} border-l border-gray-300`}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded cursor-pointer"
            onClick={toggleRightInfo}
          >
            ✕
          </button>
          <h2 className="text-lg font-bold">Right Info</h2>
          <p>Additional details here...</p>
        </aside>
      </div>
    </div>
  );
}