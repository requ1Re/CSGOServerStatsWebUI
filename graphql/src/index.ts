import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import jwt from "express-jwt";

import { UserResolver } from "./modules/user/UserResolver";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        user: req.user, // `req.user` comes from `express-jwt`
      };
      return context;
    }
  });
  await apolloServer.start();

  const app = Express();
  const path = "/graphql";
  
  //const whitelist = ["http://localhost:4200", "https://studio.apollographql.com"];
  app.use(cors());

  app.use(
    path,
    jwt({
      secret: process.env.SESSION_SECRET ?? "sseeccrreett",
      credentialsRequired: false,
      algorithms: ["HS256"]
    }),
  );
  
  apolloServer.applyMiddleware({ app, path });

  app.listen(3333, () => {
    console.log("🚀 Server running on http://localhost:3333/graphql");
  });
};

main();
