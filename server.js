const mongoose = require('mongoose');
const { DATABASE_URL } = require('./config');
const { GraphQLServer } = require('graphql-yoga');

const typeDefs = './schema.graphql';
const Query = require ('./resolvers/query');
const Movie = require ('./resolvers/movie');
const Tv = require ('./resolvers/tv');

const server = new GraphQLServer({
  typeDefs,
  resolvers: { Query, Movie, Tv }
});

mongoose.connect(DATABASE_URL)
server.start(() => console.log('Server is running'))