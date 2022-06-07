import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      zoom={10}
      style={{}}
      initialCenter={{ lat: 39.56, lng: -86.03 }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: "",
})(MapContainer);
