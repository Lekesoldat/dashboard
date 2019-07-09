import React from 'react';
import styled from 'styled-components';
import { createResource } from './cache';
import Axios from 'axios';
import moment from 'moment';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const cityRequest = by =>
  Axios.create({
    baseURL: `${corsProxy}https://gbfs.urbansharing.com/${by.toLowerCase()}bysykkel.no/`,
    headers: {
      'client-name': 'holtet-dashboard'
    }
  });

// Requests
const getStations = async city => {
  const { data } = await cityRequest(city).get('station_information.json');
  return data;
};

const getStationStatuses = async city => {
  const { data } = await cityRequest(city).get('station_status.json');
  return data;
};

// Resources
const allStations = createResource(getStations);
const allStationStatuses = createResource(getStationStatuses);

const Bysykkel = ({ city, station }) => {
  // Data
  const stations = allStations.read(city);
  const stationStatuses = allStationStatuses.read(city);

  const selectedStation = stations.data.stations.find(x => x.name === station);
  const selectedStationStatus = stationStatuses.data.stations.find(
    x => x.station_id === selectedStation.station_id
  );

  const availableBikes = selectedStationStatus.num_bikes_available;
  const availableDocks = selectedStationStatus.num_docks_available;

  const lastUpdated = moment.unix(stationStatuses.last_updated).fromNow();
  return (
    <>
      <h1>{selectedStation.name}</h1>
      <div>🚲 {availableBikes}</div>
      <div>🅿️ {availableDocks}</div>
      <div>🕐 Updated {lastUpdated}!</div>
    </>
  );
};

export default Bysykkel;
