import React from 'react';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0071ce] text-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded hover:bg-blue-800 focus:outline-none">
            <Menu size={24} />
          </button>
          <a href="/" className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/200px-Walmart_logo.svg.png" alt="Walmart Logo" className="h-8 w-auto" />
          </a>
        </div>
        {/* Search Bar */}
        <form className="flex-1 mx-4 max-w-2xl hidden md:flex">
          <input
            type="text"
            placeholder="Search everything at Walmart online and in store"
            className="w-full px-4 py-2 rounded-l-full text-gray-900 focus:outline-none"
            style={{ minWidth: 0 }}
          />
          <button type="submit" className="bg-[#005cb2] px-4 py-2 rounded-r-full hover:bg-[#004a91]">
            <Search size={20} />
          </button>
        </form>
        {/* Nav/Account/Cart */}
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:flex items-center gap-1 hover:underline text-white font-medium">
            <span>Reorder</span>
            <span className="text-xs text-blue-200">My Items</span>
          </a>
          <a href="/login" className="flex items-center gap-1 hover:underline text-white font-medium">
            <User size={20} />
            <span className="hidden md:inline">Sign In</span>
            <span className="hidden md:inline text-xs text-blue-200 ml-1">Account</span>
          </a>
          <a href="/cart" className="flex items-center gap-1 hover:underline text-white font-medium relative">
            <ShoppingCart size={22} />
            <span className="hidden md:inline">$0.00</span>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 rounded-full text-xs px-1.5 py-0.5 font-bold border border-white">0</span>
          </a>
        </div>
      </div>
      {/* Secondary nav bar */}
      <div className="bg-[#005cb2] text-white text-sm">
        <div className="container mx-auto px-4 flex items-center gap-6 py-1 overflow-x-auto">
          <button className="flex items-center gap-1 font-semibold hover:underline">
            <Menu size={18} />
            Departments
          </button>
          <button className="flex items-center gap-1 font-semibold hover:underline">
            Services
          </button>
          <a href="#" className="hover:underline">New Arrivals</a>
          <a href="#" className="hover:underline">4th of July</a>
          <a href="#" className="hover:underline">Pharmacy Delivery</a>
          <a href="#" className="hover:underline">Trending</a>
          <a href="#" className="hover:underline">Swim Shop</a>
          <a href="#" className="hover:underline">My Items</a>
          <a href="#" className="hover:underline">Auto Service</a>
          <a href="#" className="hover:underline">Registry</a>
        </div>
      </div>
    </header>
  );
};

export default Header; 