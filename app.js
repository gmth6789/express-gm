const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
