const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/usersRout");
const authRouter = require("./routes/auth");
const carsRouter = require("./routes/carsRout");
const bizRouter = require("./routes/bizRout");

mongoose
  .connect(
    "mongodb://reutudler:reutudler@notodb-shard-00-00.s9aba.mongodb.net:27017,notodb-shard-00-01.s9aba.mongodb.net:27017,notodb-shard-00-02.s9aba.mongodb.net:27017/notodb?ssl=true&replicaSet=atlas-b5w6o7-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((err) => {
    console.log("faild to connect to mongo server", err);
  });

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("noto-front/build"));
}

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cars", carsRouter);
app.use("/api/biz", bizRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
