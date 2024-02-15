const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const db = require("./models/index");
const routes = require("./routes/index");

app.use(cors());
// to recieve and parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Db Synced");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = config.get("port") || 5000;
app.use("/api", routes.userRoutes);
app.use("/", routes.authRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error Running App", err);
  }
  console.log("App is running on", PORT);
});
