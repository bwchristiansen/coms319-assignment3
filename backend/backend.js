var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/listProducts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await client.connect();

    // Query the database to find the product with the specified ID
    const query = { id: id };
    const product = await db.collection("fakestore_catalog").findOne(query);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // If product is found, send it back as a response
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/listProducts", async (req, res) => {
  try {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const newDocument = {
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rate: req.body.rating.rate,
      count: req.body.rating.count,
    };
    console.log(newDocument);

    const results = await db
      .collection("fakestore_catalog")
      .insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Product to delete :", id);
    const query = { id: id };
    // read data from product to delete to send it to frontend
    const productDeleted = await db
      .collection("fakestore_catalog")
      .findOne(query);
    // send deleted product information back to client
    res.send(productDeleted);
    // delete
    const results = await db.collection("fakestore_catalog").deleteOne(query);
    res.status(200).send(); // Send status only, no need to send additional data
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/listProducts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    await client.connect();

    // Update the product in the database
    const filter = { id: id };
    const updateDoc = {
      $set: updatedData, // Use $set operator to update specific fields
    };
    const options = { returnOriginal: false };
    const updatedProduct = await db
      .collection("fakestore_catalog")
      .findOneAndUpdate(filter, updateDoc, options);

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(updatedProduct.value); // Send back the updated product
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// app.put("/listProducts/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const query = { id: id };
//   await client.connect();
//   console.log("Robot to Update :", id);
//   // Data for updating the document, typically comes from the request body
//   console.log(req.body);
//   const updateData = {
//     $set: {
//       "name": req.body.name,
//       "price": req.body.price,
//       "description": req.body.description,
//       "imageUrl": req.body.imageUrl,
//     },
//   };
//   // read data from robot to update to send to frontend
//   const robotUpdated = await db.collection("robot").findOne(query);
//   res.send(robotUpdated);
//   // If no document was found to update, you can choose to handle it by sending a 404
//   response;
//   if (results.matchedCount === 0) {
//     return res.status(404).send({ message: "Robot not found" });
//   }
//   // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
//   const options = {};
//   const results = await db
//     .collection("robot")
//     .updateOne(query, updateData, options);
//   res.status(200);
//   res.send(results);
// });

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
