import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="mt-[36vh] text-center">
    <h1 className="text-primary text-5xl font-semibold">
      Welcome to
      <br />
      <span className="text-black leading-8"> Rent a house</span>
    </h1>
    <div className="mt-12">
      <nav className="flex flex-col items-center">
        <Link to="/login" className="p-2 bg-primary w-48 rounded-xl text-white text-xl">Login</Link>
        <Link to="/register" className="text-xl mt-5">Register</Link>
      </nav>
    </div>
  </div>
);

export default Home;
