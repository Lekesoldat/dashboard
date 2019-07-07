import ApolloClient, { gql } from 'apollo-boost';
import React, { FC } from 'react';
import moment from 'moment';
import { ApolloProvider, useQuery } from 'react-apollo-hooks';

const DEPARTURES_QUERY = gql`
  query departures($id: String!) {
    stopPlace(id: $id) {
      id
      name
      estimatedCalls(timeRange: 86400, numberOfDepartures: 10) {
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

const Departures: FC = () => {
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
        {data.stopPlace.estimatedCalls.map(
          (estimatedCall: any, index: number) => {
            // Display data for train here

            return <li key={index}>Some data.</li>;
          }
        )}
      </ul>
      {/* The raw data */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

const Entur: FC = () => (
  <ApolloProvider client={client}>
    <div>ApolloClient connected with Entur</div>
    <Departures />
  </ApolloProvider>
);

export default Entur;
