import express from "express";
import prisma from "./middleware/prismaClient.js";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./models/schema.js";
import { rootFunctions } from "./controllers/root.js";
import  cors  from "cors"
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", async (req, res) => {
  res.send("Home");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: rootFunctions,
    graphiql: true,
  })
);
app.use("*", (req, res) => {
  res.status(404).json({ message: "enpoint not found" });
});
try {
  prisma
    .$connect()
    .then(() =>
      app.listen(2065, () => {
        console.log("Listening on port 2065");
        console.log("Connected to the database");
      })
    )
    .catch((error) =>
      console.error("Failed to connect to the database", error)
    );
} catch (error) {
  console.log(error);
}
