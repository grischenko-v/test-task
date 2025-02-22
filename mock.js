import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import casual from 'casual';

const typeDefs = `#graphql
  type vmData {
    id: ID
    status: Boolean
    name: String
  }
  type Query {
    getVMStatusByID(id: String!): vmData!
    vmData: [vmData!]!
  }
`;

const fakeData = [...new Array(casual.integer(2, 6)).fill(0).map(() => ({
  id: casual.uuid,
  status: casual.boolean,
  name: casual.company_name,
}))]

const mocks = {
  Query: () => ({
    vmData: fakeData,
    getVMStatusByID: (id) => fakeData.find(item => item.id === id),
  }),
};


const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks,
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);