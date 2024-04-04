"use client";

import {useEffect, useState} from "react";
import {APIProvider, useMapsLibrary} from "@vis.gl/react-google-maps";

export default function GeocodingPage() {
  

  return <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
    <Geocoding/> 
  </APIProvider>;
}

function Geocoding() {
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = 
    useState<google.maps.Geocoder>();
  const [geocodingResult, setGeocodingResult] = useState<google.maps.GeocoderResult>();
  const[address, setAddress] = useState<string>("Mannerheimintie 1, Helsinki, Finland");

  useEffect(() => {
    if (!geocodingApiLoaded) {
      return;
    }
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService  || !address) {
      return;
    }
    geocodingService.geocode({address}, (results, status) => {
      if (results && status === "OK") {
        setGeocodingResult(results[0]);
      } else {
        console.error(`Geocoding failed: ${status}`);
      }
    }

  }, [geocodingService, address]);
  if (!geocodingService) {
    return <div>Loading...</div>;
  }
  if (!geocodingResult) {
    return <div>Geocoding...</div>;
  }
  return (
    <div> 
      <h1>{geocodingResult.formatted_address}</h1>
      <div>Latitude: {geocodingResult.geometry.location.lat()}</div>
      <div>Longitude: {geocodingResult.geometry.location.lng()}</div>
    </div>
  );
}