import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function Footer() {
  return (
    <footer className="flex justify-between items-center px-8 py-4 bg-white text-gray-800 rounded-md shadow-md">
      
      {/* Left Side - Links */}
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
      
      {/* Right Side - Copyright */}
      <div>
        <p>© 2024 MA DigiWorld. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
