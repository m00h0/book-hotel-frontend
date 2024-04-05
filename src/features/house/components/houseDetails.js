import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHouses } from '../getHousesSlice';
import { addFavorite } from '../../favorite/addFavoriteSlice';

const HouseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
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

  // Find the house with the matching id
  const house = houses.find((house) => house.id === parseInt(id, 10));

  // Handler for add to favorites button click
  const handleAddToFavorites = async () => {
    try {
      // Dispatch the addFavorite action with the house id
      await dispatch(addFavorite(house.id));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add house to favorites:', error);
    }
  };

  return (
    <div className="static flex flex-col h-screen w-screen bg-secondary pt-4 lg:justify-center lg:items-center">
      <Link to="/dashboard" className="m-4 w-[33.5vw] bg-slate-800 text-white rounded-lg p-2 md:hidden">Back to all houses</Link>
      <div className="flex-grow h-full w-full pt-4 lg:pt-0 lg:flex-grow-0 lg:flex lg:w-[80vw] lg:items-center lg:bg-white lg:h-[60vh]  lg:rounded-2xl overflow-hidden lg:shadow-2xl">
        <img className="h-[60vh] lg:w-[50vw]" src={house.photo} alt={house.title} />
        <div className="lg:flex lg:flex-col lg:h-[60vh] lg:justify-between lg:p-4 lg:pl-6">
          <div>
            <h2 className="text-center font-medium pt-4 lg:text-left">{house.title}</h2>
            <p className="text-slate-500 p-2 lg:p-0">{house.description}</p>
          </div>
          <button className="bg-primary text-center text-white w-full font-semibold p-4 absolute bottom-0 left-0 right-0 lg:static lg:w-auto" type="button" onClick={handleAddToFavorites}>
            Add to favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
