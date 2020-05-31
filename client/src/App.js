import React, { useState, useEffect, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { formatDate, formatTemperature } from './utils/dataUtils';
import './App.css';

const createInfoWindow = (selectedPlace) => {
  const { address, fire_department, description, weather } = selectedPlace.data;
  return (
    <Fragment>
      <h1>
        {selectedPlace.name}
        <br />
        {address && address.address_line1}
        <br />
        {address && `${address.city}, ${address.state}`}
      </h1>
      <h2>{fire_department && `Fire Department: ${fire_department.name}`}</h2>
      <h3>
        {description && `Opened: ${formatDate(description.event_opened)}`}
      </h3>
      <h3>
        {description && `Closed: ${formatDate(description.event_closed)}`}
      </h3>
      <p>
        {weather && `Temperature: ${formatTemperature(weather.temperature)}`}
      </p>
      <p>{weather && `Humidity: ${`${weather.humidity}%`}`}</p>
      <p>{weather && `Precipitation: ${`${weather.precipitation}"`}`}</p>
      {description.comments && (
        <h3>
          Comments: <br />
          {description.comments}
        </h3>
      )}
    </Fragment>
  );
};

const App = (props) => {
  const [mapData, setMapData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = (event) => {
    const formData = new FormData();
    formData.append('newIncident', selectedFile, selectedFile.name);
    // send off request to the backend to parse
    // get back data and do add to the markers array
    axios
      .post('/upload', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setMarkerData(markerData.concat())
  };

  const addEvent = () => {
    setShowModal(true);
  };

  return (
    <div className="App">
      {showModal && (
        <div className="modal-background">
          <div className="modal">
            <div className="close-icon" onClick={closeModal}>
              x
            </div>
            <label for="uploader">Pick a json file to upload</label>
            <input id="uploader" type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload!</button>
          </div>
        </div>
      )}
      <h1 className="center">Test Incident</h1>
      <div className="right">
        <div>
          <button
            style={{ cursor: 'pointer', marginBottom: '5px' }}
            onClick={addEvent}
          >
            Add new event
          </button>
        </div>
      </div>
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
            {selectedMarker && createInfoWindow(selectedMarker)}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAacHSRSPtIKDlLu2W8kCTYY5szqZgmJLs',
})(App);
