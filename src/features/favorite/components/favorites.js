import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3001/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [token]);

  return (
    <div className="static h-screen flex-col">
      <h1 className="w-full text-center text-3xl font-semibold pt-2">Favorites</h1>
      <ul className="mt-4 flex-grow overflow-y-scroll pb-6">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="flex items-center mt-2 bg-secondary rounded-md justify-between mx-2 p-2 pr-16">
            <img className="h-[20vw] w-[20vw] rounded-lg" src={favorite.photo} alt={favorite.title} />
            <h2 className="text-xl">{favorite.title}</h2>
          </li>
        ))}
      </ul>
      <div className="text-center text-xl absolute bottom-2 w-full">
        Back to
        <a href="/dashboard" className="text-primary"> dashboard</a>
      </div>
    </div>
  );
};

export default Favorites;
