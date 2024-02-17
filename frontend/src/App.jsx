import React from "react";
import "antd/dist/antd.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Wrap from "./components/Wrap.jsx";
import Home from "./components/Home.jsx";
import Rank from "./components/Rank.jsx";
import Question from "./components/Question.jsx";
import AnswerBoard from "./components/AnswerBoard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrap />}>
          <Route index element={<Home />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answerBoard" element={<AnswerBoard />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
