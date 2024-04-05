import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHouse } from '../deleteHouseSlice';
import { fetchAllHouses } from '../getHousesSlice';

const DeleteHouse = () => {
  const dispatch = useDispatch();
  const { status, houses, error } = useSelector((state) => state.renderHouses);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllHouses());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteHouse(id));
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete house:', error);
    }
  };

  return (
    <div className="static house-list h-screen w-screen pt-6">
      <h1 className="text-3xl font-bold text-center">Delete House</h1>
      {houses.map((house) => (
        <div key={house.id} className="house-card rounded-lg p-2 pr-5 flex items-center justify-between mx-2 mt-4 bg-secondary">
          <div className="house-photo">
            <img className="h-[20vw] w-[20vw] rounded-lg" src={house.photo} alt={house.title} />
          </div>
          <div className="house-details">
            <h2 className="house-details font-medium">{house.title}</h2>
          </div>
          <button className="p-2 bg-red-500 rounded-lg text-white" type="button" onClick={() => handleDelete(house.id)}>
            Delete House
          </button>
        </div>
      ))}
      <div className="text-center text-xl  absolute bottom-2 w-full">
        Back to
        <a href="/dashboard" className="text-primary"> dashboard</a>
      </div>
    </div>
  );
};

export default DeleteHouse;
