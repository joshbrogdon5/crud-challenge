const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();



const app = express();

app.use(bodyParser.json());

const {SERVER_PORT} = process.env;

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
})
