import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './features/home/home';
import Dashboard from './features/home/dashboard';
import HouseDetails from './features/house/components/houseDetails';
import FavoriteHouses from './features/favorite/components/favorites';
import DeleteHouse from './features/house/components/deleteHouse';
import CreateHouseForm from './features/house/components/addHouseForm';
import LoginForm from './features/user/components/loginUser';
import RegistrationForm from './features/user/components/registerUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add" element={<CreateHouseForm />} />
        <Route path="/delete" element={<DeleteHouse />} />
        <Route path="/favorites" element={<FavoriteHouses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="*" exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
