import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import moment from 'moment';
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
              transportMode
            }
          }
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://api.entur.io/journey-planner/v2/graphql'
});

const Departures = () => {
  const { data } = useQuery(DEPARTURES_QUERY, {
    suspend: true,
    variables: {
      id: 'NSR:StopPlace:313'
    }
  });

  return (
    <>
      {/* Station name */}
      <h1>{data.stopPlace.name}:</h1>
      {/* All Departures */}
      <ul>
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
                line.name +
                ' ' +
                displayText +
                ' leaves ' +
                timeUntilDeparture}
            </li>
          );
        })}
      </ul>
      {/* The raw data */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

const Entur = () => (
  <ApolloProvider client={client}>
    <div>ApolloClient connected with Entur</div>
    <Departures />
  </ApolloProvider>
);

export default Entur;
