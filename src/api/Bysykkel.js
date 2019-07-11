import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { createResource } from './cache';
import Axios from 'axios';
import moment from 'moment';
import { FaBicycle, FaParking, FaSync } from 'react-icons/fa';

// Design
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  display: inline-block;
`;

const StationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* The address */
  & div {
    font-size: 0.8rem;
    color: gray;

    &:before {
      content: ' by ';
    }
  }
`;
const Availability = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 1rem;

  & > div {
    padding: 1rem;
    text-align: center;
    border: 1px solid black;
    border-radius: 1rem;
  }
`;
const Bikes = styled.div``;
const Docks = styled.div``;

// Axios setup
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
  const lastUpdated = moment.unix(stationStatuses.last_updated).fromNow();

  // Selected station data
  const selectedStation = stations.data.stations.find(x => x.name === station);
  const selectedStationStatus = stationStatuses.data.stations.find(
    x => x.station_id === selectedStation.station_id
  );

  const availableBikes = selectedStationStatus.num_bikes_available;
  const availableDocks = selectedStationStatus.num_docks_available;

  return (
    <Card>
      <StationInfo>
        <h2>{selectedStation.name}</h2>
        <div>{selectedStation.address}</div>
      </StationInfo>

      <Availability>
        <Bikes>
          <FaBicycle color='black' />
          <div>{availableBikes}</div>
        </Bikes>

        <Docks>
          <FaParking color='blue' />
          <div>{availableDocks}</div>
        </Docks>
      </Availability>

      <div>
        <FaSync /> {lastUpdated}!
      </div>
    </Card>
  );
};

export default Bysykkel;
