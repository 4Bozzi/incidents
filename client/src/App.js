import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

import './App.css';

const App = (props) => {
  const [mapData, setMapData] = useState(null);
  const mapStyles = { width: '100%', height: '100%' };
  useEffect(() => {
    axios.get('/start').then((response) => {
      setMapData(response);
    });
  });
  return (
    <div className="App">
      <h1>Test Incident</h1>
      <Map
        google={props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{
          lat: 37.5537575,
          lng: -77.4602617,
        }}
      ></Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAacHSRSPtIKDlLu2W8kCTYY5szqZgmJLs',
})(App);
