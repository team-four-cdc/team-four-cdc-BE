require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());

app.listen(port, async () => {
  console.log(`listening on port ${port}`);
});
