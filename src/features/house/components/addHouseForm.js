import React, { useState } from 'react';
import axios from 'axios';

const CreateHouseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:3001/houses', { house: formData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: '',
        description: '',
        photo: '',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error posting house:', error);
    }
  };

  return (
    <div className="static flex flex-col items-center h-screen gap-4 w-screen px-2 pt-2 bg-secondary">
      <h2 className="w-full text-center text-slate-600 text-2xl font-semibold">Create a House</h2>
      <div className="w-full">
        <p className="text-center text-slate-500 mt-10 text-xl font-light pt-8 h-32">
          Fill in the form below to list your house. All fields are required.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-4">
        <div className="w-full">
          <label htmlFor="title">
            Title:
            <input type="text" name="title" className="border rounded-md px-2 py-1 w-full h-12 border-primary" value={formData.title} onChange={handleChange} required />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="photo">
            Photo (Image Link):
            <input type="url" name="photo" className="border border-primary rounded-md px-2 py-1 w-full h-12" value={formData.photo} onChange={handleChange} required />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="description" className="block mb-2">
            Description:
            <textarea name="description" className="border rounded-md px-2 py-1 w-full border-primary overflow-y-auto h-32" value={formData.description} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit" className="bg-primary p-2 rounded-md text-white">Create House</button>
      </form>
      <p className="absolute bottom-4 text-center text-xl text-slate-600">
        Go back to
        <a href="/dashboard" className="text-primary"> dashboard</a>
      </p>
    </div>
  );
};

export default CreateHouseForm;
