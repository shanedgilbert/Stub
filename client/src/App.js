import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, Lists, Settings } from "./components/jsx";

const App = () => {
  
  return (
    <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    <Footer />
  </Router>
  );
};

export default App;
