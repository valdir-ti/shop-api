const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const Routes = require("./routes");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBConnection established");
  })
  .catch((err) => {
    console.log(`DBConnection error: ${err}`);
  });

app.use(express.json());
app.get("/api/v1", (_, res) => {
  res.send("API is working");
});
app.use("/api/v1/users", Routes.userRoutes);
app.use("/api/v1/products", Routes.productRoutes);
app.use("/api/v1/orders", Routes.orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
