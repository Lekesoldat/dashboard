import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { ApolloProvider, useQuery } from 'react-apollo-hooks';

const TRANSPORT_ICON = {
  air: '✈️',
  bus: '🚌',
  cableway: '🚡',
  water: '⛴️',
  funicular: '🚠',
  lift: '❔',
  rail: '🚆',
  metro: '🚇',
  tram: '🚊',
  coach: '🚌',
  unknown: '❓'
};

const DEPARTURES_QUERY = gql`
  query departures($id: String!) {
    stopPlace(id: $id) {
      id
      name

      estimatedCalls(timeRange: 86400, numberOfDepartures: 5) {
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        date

        destinationDisplay {
          frontText
        }

        serviceJourney {
          journeyPattern {
            line {
              id
              name
              publicCode
              transportMode
            }
          }
        }
      }
    }
  }
`;

const DepartureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const client = new ApolloClient({
  uri: 'https://api.entur.io/journey-planner/v2/graphql'
});

const Departures = ({ id }) => {
  const { data } = useQuery(DEPARTURES_QUERY, {
    suspend: true,
    variables: {
      id: `NSR:StopPlace:${id}`
    }
  });

  return (
    <>
      {/* Station name */}
      <h1>{data.stopPlace.name}:</h1>

      {/* All Departures */}
      <DepartureList>
        {data.stopPlace.estimatedCalls.map((estimatedCall, index) => {
          const line = estimatedCall.serviceJourney.journeyPattern.line;

          // Text from the display of the vehicle
          const displayText = estimatedCall.destinationDisplay.frontText;

          const timeUntilDeparture = moment(estimatedCall.expectedDepartureTime)
            .startOf('second')
            .fromNow();

          const icon = TRANSPORT_ICON[line.transportMode];

          return (
            <li key={index}>
              {icon +
                ' ' +
                line.publicCode +
                ' ' +
                displayText +
                ' leaves ' +
                timeUntilDeparture}
            </li>
          );
        })}
      </DepartureList>
    </>
  );
};

const Entur = () => (
  <ApolloProvider client={client}>
    <Departures id='313' />
    <Departures id='43153' />
  </ApolloProvider>
);

export default Entur;
