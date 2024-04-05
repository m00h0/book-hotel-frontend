import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../user/loginUserSlice';
import More from './more';
import HouseList from '../house/components/Houses';
import Hamburger from '../../assets/menu.png';
import CloseButton from '../../assets/close.png';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsNavbarSticky(true);
      } else {
        setIsNavbarSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="static flex flex-col h-screen items-center">
      <nav className="hidden lg:flex w-screen items-center h-[16vh] hover:text-gray-800 bg-white px-4 py-2 shadow-lg sticky top-0">
        <ul className="flex items-center text-xl h-full space-x-4">
          <li>
            <a href="/dashboard" className="hover:text-gray-400">
              Houses
            </a>
          </li>
          <li>
            <a href="/add" className="hover:text-gray-400">
              Add house
            </a>
          </li>
          <li>
            <a href="/delete" className="hover:text-gray-400">
              Delete a house
            </a>
          </li>
          <li>
            <a href="/favorites" className="hover:text-gray-400">
              My Favorites
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={handleLogout}
          className="ml-auto bg-rose-400 text-white rounded-lg p-2 hover:bg-gray-400"
        >
          Logout
        </button>
      </nav>

      <div
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isNavbarSticky ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={`${isMobileMenuOpen ? 'hidden' : ''}`}
          >
            <img src={Hamburger} alt="Open Menu" className="w-8 h-8" />
          </button>
          <h2 className="text-2xl">Houses</h2>
          <div className="w-8 h-8" />
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 h-screen z-50 overflow-auto bg-white shadow-lg ${
          isMobileMenuOpen ? 'w-1/2' : 'w-0'
        } transition-all duration-300 ease-in-out`}
      >
        <button
          type="button"
          onClick={closeMobileMenu}
          className="absolute top-4 right-4"
        >
          <img src={CloseButton} alt="Close Menu" className="w-8 h-8" />
        </button>
        <ul className="p-4 mt-11 flex flex-col gap-2 text-lg">
          <li>
            <a href="/dashboard" className="hover:text-gray-400 block mb-2">
              Houses
            </a>
          </li>
          <li>
            <a href="/add" className="hover:text-gray-400 block mb-2">
              Add house
            </a>
          </li>
          <li>
            <a href="/delete" className="hover:text-gray-400 block mb-2">
              Delete a house
            </a>
          </li>
          <li>
            <a href="/favorites" className="hover:text-gray-400 block mb-2">
              My Favorites
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={handleLogout}
          className="ml-4 absolute bottom-4 border-t-[3px] w-full pt-2 text-black hover:text-gray-400"
        >
          Logout
        </button>
      </div>

      <div className="py-4 mt-20 w-full">
        <HouseList />
      </div>
      <div className="flex-grow px-4 mt-2 py-4 bg-[#e7f0ff] w-screen">
        <More />
      </div>
    </div>
  );
};

export default Dashboard;
