require('dotenv').config();
const express = require('express');
const appRoot = require('app-root-path');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT;
const { networkRouter, userRouter } = require(`${appRoot}/app/routes`);

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

networkRouter(app);
userRouter(app);

app.listen(port, async () => {
  console.log(`listening on port ${port}`);
});
