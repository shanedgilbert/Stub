import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, Lists, Settings } from "./components/jsx";
import { getShowsData } from './api/index';

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    getShowsData()
      .then((data) => {
        console.log(data);
        setShows(data);
      })
  }, []);

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
