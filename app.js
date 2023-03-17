require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiRouter = require("./app/routes");
const corsConfig = require("./config/corsConfig");
const port = process.env.PORT;

/* Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). */
app.use(bodyParser.json());

/*
Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
This object will contain key-value pairs, where the value can be a string or array (when extended is false),
or any type (when extended is true).
NOTE: If one has been provided in more than one location, this will abort the request immediately by sending code 400
*/
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsConfig));

app.use((_req, res, next) => {
  res.set("Cache-Control", "no-store,no-cache,must-revalidate,max-age=0");
  res.set("Pragma", "no-cache");
  next();
});

app.use("/api", apiRouter);

// GLOBAL ERROR HANDLER
app.use((error, _req, res, next) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
  next();
});

app.listen(port, async () => {
  console.log(`listening on port ${port}`);
});
