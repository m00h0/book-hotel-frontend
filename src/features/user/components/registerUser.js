import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterUser, selectStatus } from '../registrationSlice';
import backImage from '../../../assets/back.png';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRegisterUser({ user: formData }));
    setFormData({
      email: '',
      password: '',
      name: '',
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
      <div className="absolute top-2 left-0 p-2">
        <a href="/"><img src={backImage} alt="back" className="w-12 h-12 pt-3 md:hidden" /></a>
      </div>
      <div className="w-[70vw] h-1/6">
        <h2 className="text-4xl mb-4">Sign up</h2>
        <p>Create an account with  us and start your journey today!</p>
        {status === 'loading' && <div className="text-primary">Creating account...</div>}
        {status === 'failed' && <div className="text-primary">Registration failed. Please try again.</div>}
        {status === 'succeeded' && <div className="text-primary">Account created! You can now  log in.</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center">
        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border-2 border-primary p-2 rounded-3xl" placeholder="Email" required />
        </div>
        <div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border-2 border-primary p-2 rounded-3xl" placeholder="Password" required />
        </div>
        <div>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border-2 border-primary p-2 rounded-3xl" placeholder="Name" required />
        </div>
        <button type="submit" className="bg-primary rounded-3xl p-3 text-white w-32">Register</button>
      </form>
      <div className="absolute bottom-4 text-gray-500 font-medium">
        Already have an account?
        {' '}
        <a href="/login" className="text-primary"> Login</a>
      </div>
    </div>
  );
};

export default RegistrationForm;
