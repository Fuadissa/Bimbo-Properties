const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const listingRouter = require("./routes/listingRoute");
const blogRouter = require("./routes/blogRoute");
const adminRouter = require("./routes/userRoute");
const emailRouter = require("./routes/emailRoute");
require("dotenv").config({
  path: path.relative(process.cwd(), path.join(__dirname, ".env")),
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// app.use('/api/user', userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/listing", listingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/email", emailRouter);

// app.use(express.static(path.join(__dirname, "/Frontend/real-estate/build")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "Frontend/real-estate", "build", "index.html")
//   );
// });

app.use(
  express.static(path.join(path.resolve(), "/Frontend/real-estate/build"))
);

app.get("*", (req, res) =>
  res.sendFile(
    path.join(path.resolve(), "/Frontend/real-estate/build/index.html")
  )
);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 3000!");
});
