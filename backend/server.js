import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Home");
});
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
