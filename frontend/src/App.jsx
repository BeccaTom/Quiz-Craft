import React from 'react';
import 'antd/dist/antd.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';
import Home from './components/Home';
import Ranking from './components/Ranking';
import QuestionManager from './components/QuestionManager';
import TestingBoard from './components/TestingBoard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="/rank" element={<Ranking />} />
          <Route path="/question" element={<QuestionManager />} />
          <Route path="/TestingBoard" element={<TestingBoard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
