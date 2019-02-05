const { GraphQLServer } = require('graphql-yoga')

const typeDefs = './schema.graphql';
const Query = require ('./resolvers/query');
const Movie = require ('./resolvers/movie');
const Tv = require ('./resolvers/tv');

const server = new GraphQLServer({
  typeDefs,
  resolvers: { Query, Movie, Tv }
});

server.start(() => console.log('Server is running'))
