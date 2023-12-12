import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddBudget from "./pages/AddBudget/AddBudget";
import AddExpense from "./pages/AddExpense/AddExpense";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";


const App = () => {


  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>

          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/addBudget" element={<AddBudget />} />
           
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
