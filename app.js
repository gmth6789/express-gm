const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/signup', async (req, res) => {
  console.log(req.body);
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false
  });
  res.json(userResponse);
})


app.use(express.static('static'));

app.get('/', (req, res) => {
res.sendFile(path.resolve('pages/signup.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
