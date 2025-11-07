import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./resolvers.js";

const typeDefs = readFileSync(path.resolve("src/schema.graphql"), "utf-8");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`GraphQL esta corriendo sin problema${url}`);
});
