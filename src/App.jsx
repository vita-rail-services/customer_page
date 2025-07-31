import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import {useAuthStore} from './stores/index.stores.js';
import { useState, useEffect } from 'react';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ZoneSelectionPage from './pages/ZoneSelectionPage';
import StationSelectionPage from './pages/StationSelectionPage';
import FoodPreferencePage from './pages/FoodPreferencePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import MenuListPage from './pages/MenuListPage';
import TrainDetailsPage from './pages/TrainDetailsPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import PasswordReset from "./pages/PasswordReset"

function App() {
  const location = useLocation(); // required for AnimatePresence
  const { token } = useAuthStore()
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  
  useEffect(() => {
    setIsAuthenticated(token?true:false)
  }, [token])


  return (
    <AnimatePresence mode="wait">

      <Toaster position="top-right" reverseOrder={false} />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/reset-password' element={<PasswordReset/>} />
        <Route path="/zones" element={isAuthenticated?<ZoneSelectionPage />:<Navigate to="/"/>} />
        <Route path="/stations" element={isAuthenticated?<StationSelectionPage />:<Navigate to="/"/>} />
        <Route path="/food-preference" element={isAuthenticated?<FoodPreferencePage />:<Navigate to="/"/>} />
        <Route path="/category" element={isAuthenticated?<CategorySelectionPage />:<Navigate to="/"/>} />

        <Route path="/menu" element={isAuthenticated?<MenuListPage />:<Navigate to="/"/>} />

        <Route path="/train" element={isAuthenticated?<TrainDetailsPage />:<Navigate to="/"/>} />
        <Route path="/payment" element={isAuthenticated?<PaymentPage />:<Navigate to="/"/>} />
        <Route path="/confirm" element={isAuthenticated?<OrderConfirmationPage />:<Navigate to="/"/>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
