import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express();
app.use(express.json());

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => "Hello, World!",
};

app.use(
  "/graphql",
  graphqlHTTP({ schema: schema, rootValue: root, graphiql: true })
);

try {
  app.listen(2065, () => {
    console.log("Listening on port 2065");
  });
} catch (error) {
  console.log(error);
}
