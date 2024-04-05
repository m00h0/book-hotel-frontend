import { configureStore } from '@reduxjs/toolkit';
import renderHousesReducer from '../features/house/getHousesSlice';
import { postHouse } from '../features/house/postHouseSlice';
import registerReducer from '../features/user/registrationSlice';
import loginUserReducer from '../features/user/loginUserSlice';
import { deleteHouse } from '../features/house/deleteHouseSlice';
import { addFavorite } from '../features/favorite/addFavoriteSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    loginUser: loginUserReducer,
    renderHouses: renderHousesReducer,
    postHouse,
    deleteHouse,
    addFavorite,
  },
});

export default store;
