import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const App = () => {
  const [mapData, setMapData] = useState(null);
  useEffect(() => {
    axios.get('/start').then((response) => {
      setMapData(response);
    });
  });
  return <div className="App"></div>;
};

export default App;
