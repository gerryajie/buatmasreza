const express = require("express");
const fileUpload = require("express-fileupload");

const db = require("./models");
const initRoutes = require("./routes/excel");
global.__basedir = __dirname + "/..";

// Import routes
// const router = require("./routes/index");
// const users = require("./routes/users");
// const events = require("./routes/events");
// const categories = require("./routes/categories");
// const errorHandler = require("./middlewares/errorHandler");
// const bookmarks = require("./routes/bookmarks");
// const comments = require("./routes/comments");
// const ratings = require("./routes/ratings");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({ useTempFiles: true }));

const routes = require("./routes/index");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello Ini tugas, Welcome!");
});
/* Make routes */
app.use("/", routes);
// app.all("*", (req, res, next) => {
//   next({ statusCode: 404, message: "Endpoint not found" });
// });
// app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  /* Run server */
  app.listen(port, () => console.log(`Server running on ${port}`));
}
module.exports = app;
