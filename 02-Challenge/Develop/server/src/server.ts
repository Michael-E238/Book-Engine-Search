import express from "express";
import path from "node:path";
import db from "./config/connection.js";
import routes from "./routes/index.js";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

app.use(routes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { graphqlHandler } = server.createHandler({
  expressApp: app,
});

app.use('/graphql', graphqlHandler);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});