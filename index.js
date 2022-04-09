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
    "mongodb+srv://reutudler:eJ53Guyvm7ySeMra@notodb.s9aba.mongodb.net/notodb"
  )
  .then(() => {
    console.log("connected to mongodb");
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/noto-front/build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
