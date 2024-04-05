import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllHouses } from '../getHousesSlice';
import Dots from '../../../assets/dots.png';

const HouseList = () => {
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

  return (
    <div className="w-full house-list pt-6 pb-3 pl-4 rounded-lg overflow-x-auto scroll-smooth scrollbar-none">
      <div className="flex scroll-smooth">
        {houses.map((house) => (
          <Link key={house.id} to={`/house/${house.id}`} className="house-card-link shrink-0">
            <div className="rounded-[8px] m-2 overflow-hidden w-[75vw] h-[55vh] shadow-lg relative lg:w-[28vw]">
              <img className="absolute right-2 bottom-8 w-8 h-8" src={Dots} alt="dots" />
              <div className="photo">
                <img className="h-[45vh] w-full" src={house.photo} alt={house.title} />
              </div>
              <div className="house-details p-2 font-semibold">
                <h2 className="pt-6 px-3">{house.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HouseList;
