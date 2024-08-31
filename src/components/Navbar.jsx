import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-grey-950 shadow-md">
      <div className="container mx-auto px-10 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-50">BookMyShow</Link>
        
        <div className="hidden sm:flex items-center space-x-4">
          <Link /*to="/movies"*/ className="text-slate-50 hover:text-gray-300">Movies</Link>
          <Link /* to="/cinemas"*/ className="text-slate-50 hover:text-gray-300">Cinemas</Link>
          <button className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" type="button">Sign In</button>
        </div>

        <button
          className="sm:hidden p-2 text-gray-400 hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-50 hover:text-white hover:bg-gray-700" href="#">Home</a>
          <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-50 hover:text-white hover:bg-gray-700" href="#">Link</a>
          <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-green-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" type="button">Sign In</button>
        </div>
      </div>
    </nav>
  );
}