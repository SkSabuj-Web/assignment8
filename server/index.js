import express from "express";
import "dotenv/config";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { createRemoteJWKSet, jwtVerify } from "jose";

const app = express();
const port = process.env.PORT || 8000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: [clientUrl, "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("IncubatorA8");
const productsCollection = db.collection("products");

const JWKS = createRemoteJWKSet(
  new URL(`${clientUrl}/api/auth/jwks`),
);

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ msg: "Unauthorized! No Authorization header provided." });
  }

  const parts = authHeader.split(" ");
  if (parts.length < 2 || !parts[1]) {
    return res.status(401).send({ msg: "Unauthorized! Token missing." });
  }
  const token = parts[1];

  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).send({ msg: "Unauthorized! Invalid or expired token." });
  }
};

app.post("/products", async (req, res) => {
  try {
    const data = req.body;
    const result = await productsCollection.insertOne(data);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ msg: "Failed to create product", error: error.message });
  }
});

app.get("/products", verifyToken, async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ msg: "Failed to fetch products", error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ msg: "Failed to fetch product", error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send(result);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ msg: "Failed to delete product", error: error.message });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, ...data } = req.body;

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
    );

    res.send(result);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ msg: "Failed to update product", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
