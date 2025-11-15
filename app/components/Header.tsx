// app/components/Header.tsx
'use client'; 

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react'; // Need 'X' icon for closing the search
import { useState } from 'react';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // NOTE: This function would trigger the actual API call
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a full application, this is where you would navigate
      // to the search results page: router.push(`/search?q=${searchTerm}`);
      console.log('Searching for:', searchTerm);
      alert(`Searching for: ${searchTerm}`);
      // You can add your actual search logic here.
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-gray-900/90 backdrop-blur-sm shadow-lg text-white">
      
      {/* 1. Left Section: Logo/Title and Navigation (Hidden when search is open) */}
      {!isSearchOpen && (
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition duration-200">
            StoryBit
          </Link>
          
          <nav className="hidden md:flex space-x-4 text-sm">
            <Link href="/" className="hover:text-red-500 transition duration-200">Home</Link>
            {/* These links would map to /movies and /series pages if implemented */}
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">Movies</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">Series</a>
          </nav>
        </div>
      )}

      {/* 2. Search Bar (Appears when isSearchOpen is true) */}
      {isSearchOpen && (
        <form onSubmit={handleSearch} className="flex flex-grow items-center space-x-2 mr-4">
          <input
            type="text"
            placeholder="Search movies or series..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            autoFocus
          />
          <button type="submit" aria-label="Submit Search" className="p-2 text-gray-300 hover:text-white transition duration-200">
            <Search size={20} />
          </button>
        </form>
      )}

      {/* 3. Right Section: Actions */}
      <div className="flex items-center space-x-4">
        
        {/* Search Toggle Button */}
        <button 
          aria-label={isSearchOpen ? "Close Search" : "Open Search"}
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            setSearchTerm(''); // Clear term when closing
          }}
          className="text-gray-300 hover:text-white transition duration-200"
        >
          {isSearchOpen ? <X size={20} /> : <Search size={20} />}
        </button>

        {/* User Profile / Menu (Visible regardless of search state) */}
        <button aria-label="User Menu" className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition duration-200">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}