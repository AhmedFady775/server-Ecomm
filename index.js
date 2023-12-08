const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const productsRoutes = require("./routes/products.js");
const orderRouters = require("./routes/order.js");
const categoriesRoutes = require("./routes/category.js");

/* DEFAULT SETTINGS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", orderRouters);
app.use("/categories", categoriesRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("connected to Mongo");
  })
  .catch((error) => console.log(`${error} did not connect`));
