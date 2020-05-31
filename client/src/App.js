import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

import './App.css';

const App = (props) => {
  const [mapData, setMapData] = useState(null);
  const mapStyles = { width: '100%', height: '100%' };

  useEffect(() => {
    axios.get('/start').then((response) => {
      setMapData(response.data);
    });
  }, []);

  const onMarkerClick = () => {};
  const renderMarkers = (data) =>
    data.map((item, index) => (
      <Marker
        title={item.address.common_place_name}
        name={item.address.common_place_name}
        onClick={onMarkerClick}
        position={{ lat: item.address.latitude, lng: item.address.longitude }}
        data={data[index]}
      />
    ));

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
      >
        {mapData && mapData.length && renderMarkers(mapData)}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAacHSRSPtIKDlLu2W8kCTYY5szqZgmJLs',
})(App);
