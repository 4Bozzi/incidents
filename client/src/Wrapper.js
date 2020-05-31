import React, { useState } from 'react';
import axios from 'axios';
import App from './App';

const Wrapper = () => {
  const [mapData, setMapData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (bool) => {
    setShowModal(bool);
  };
  const onFileUpload = (selectedFile) => {
    const formData = new FormData();
    formData.append('newIncident', selectedFile, selectedFile.name);
    // send off request to the backend to parse
    // get back data and do add to the markers array
    axios
      .post('/upload', formData)
      .then(function (response) {
        setMapData(response.data);
        setShowModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <App
      mapData={mapData}
      handleFileUpload={onFileUpload}
      handleShowModal={handleShowModal}
      showModal={showModal}
    />
  );
};
export default Wrapper;
