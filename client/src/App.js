import React, { useState, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
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
  const { mapData, handleFileUpload, handleShowModal, showModal } = props;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const mapStyles = { width: '100%', height: '100%' };

  const onMarkerClick = (props, marker, e) => {
    setSelectedMarker(marker);
    setShowInfoWindow(true);
  };

  const renderMarkers = (data) => (
    <Marker
      title={data.address.common_place_name}
      name={data.address.common_place_name}
      onClick={onMarkerClick}
      position={{ lat: data.address.latitude, lng: data.address.longitude }}
      data={data}
    />
  );

  const onInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  const closeModal = () => {
    handleShowModal(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    handleFileUpload(selectedFile);
  };

  const addEvent = () => {
    handleShowModal(true);
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
      <h1 className="center">Incident Tracker</h1>
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
        {mapData && renderMarkers(mapData)}
        <InfoWindow
          marker={selectedMarker}
          visible={showInfoWindow}
          onClose={onInfoWindowClose}
        >
          <div className="center">
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
