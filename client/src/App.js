import React, { useState, useEffect, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { formatDate, formatTemperature } from './utils/dataUtils';
import './App.css';

const App = (props) => {
  const [mapData, setMapData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const mapStyles = { width: '100%', height: '100%' };

  useEffect(() => {
    axios.get('/start').then((response) => {
      setMapData(response.data);
    });
  }, []);

  const onMarkerClick = (props, marker, e) => {
    setSelectedMarker(marker);
    setShowInfoWindow(true);
  };
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
  const onInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

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

        <InfoWindow
          marker={selectedMarker}
          visible={showInfoWindow}
          onClose={onInfoWindowClose}
        >
          <div style={{ textAlign: 'center' }}>
            {selectedMarker && (
              <Fragment>
                <h1>
                  {selectedMarker.name}
                  <br />
                  {selectedMarker.data.address.address_line1}
                  <br />
                  {`${selectedMarker.data.address.city}, ${selectedMarker.data.address.state}`}
                </h1>
                <h2>
                  Fire Department: {selectedMarker.data.fire_department.name}
                </h2>
                <h3>
                  Opened:{' '}
                  {formatDate(selectedMarker.data.description.event_opened)}
                </h3>
                <h3>
                  Closed:{' '}
                  {formatDate(selectedMarker.data.description.event_closed)}
                </h3>
                <p>
                  Temperature:{' '}
                  {formatTemperature(selectedMarker.data.weather.temperature)}
                </p>
                <p>Humidity: {`${selectedMarker.data.weather.humidity}%`}</p>
                <p>
                  Precipitation:{' '}
                  {`${selectedMarker.data.weather.precipitation}"`}
                </p>
                {selectedMarker.data.description &&
                  selectedMarker.data.description.comments && (
                    <h3>
                      Comments: <br />
                      {selectedMarker.data.description.comments}
                    </h3>
                  )}
              </Fragment>
            )}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAacHSRSPtIKDlLu2W8kCTYY5szqZgmJLs',
})(App);
