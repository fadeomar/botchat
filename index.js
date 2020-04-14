const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes/dialogFlow')

const app = express();

app.use(bodyParser.json())

route(app)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('app is running at http://localhost:5000')
})