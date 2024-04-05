import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../loginUserSlice';
import backImage from '../../../assets/back.png';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const status = useSelector((state) => state.loginUser.status);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then(() => {
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      })
      .catch((error) => {
        // Handle login error
        // eslint-disable-next-line no-console
        console.error('Login failed:', error);
      });
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="static flex flex-col items-center justify-center h-screen text-center">
      <div className="absolute top-2 left-0 p-2 lg:hidden">
        <a href="/"><img src={backImage} alt="back" className="w-12 h-12 pt-3 lg:hidden md:hidden" /></a>
      </div>
      <div className="w-[70vw] h-1/6">
        <h2 className="text-4xl mb-4">Sign in</h2>
        <p>Hello  there! Sign in to your account to create or book a rental.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center">
        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border-2 border-primary p-2 rounded-3xl" placeholder="Email" required />
        </div>
        <div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border-2 border-primary p-2 rounded-3xl" placeholder="Password" required />
        </div>
        <button type="submit" className="bg-primary rounded-3xl p-3 text-white w-32" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="absolute bottom-4 text-gray-500 font-medium">
        Don&apos;t have an account?
        <a href="/register" className="text-primary"> Register</a>
      </div>
    </div>
  );
};

export default LoginForm;
