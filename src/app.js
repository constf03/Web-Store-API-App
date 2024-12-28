import dotenv from "dotenv";
import express from "express";
import sequelize from "./db/postgres.js";
import productRoute from "./routes/products.js";
import userRoute from "./routes/users.js";
import shoppingCartRoute from "./routes/shoppingCartItems.js";
import orderRoute from "./routes/orders.js";
import feedbackRoute from "./routes/feedback.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const eraseDatabaseOnSync = process.env.ERASE || false;

app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", shoppingCartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/auth", authRoute);

app.get("/test", (_req, res) => {
  res.send("<h1>Hello from server side</h1>");
});

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
