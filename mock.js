import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
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

const fakeData = [...new Array(casual.integer(10000, 100000)).fill(0).map(() => ({
  id: casual.uuid,
  status: casual.boolean,
  name: casual.company_name,
}))]

const resolvers = {
  Query: {
    vmData: () => fakeData,
    getVMStatusByID: () => ({ status: casual.boolean }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);