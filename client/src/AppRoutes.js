import React from 'react';
import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import TestList from './pages/TestList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/test" element={<TestList />} />
    </Routes>
  );
};

export default AppRoutes;
