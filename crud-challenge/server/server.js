const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const controller = require('./controller');



const app = express();

app.use(bodyParser.json());

const {SERVER_PORT, CONNECTION_STRING} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.get('/api/allemployees', controller.getEmployees);
app.post('/api/createemployee', controller.createEmployee);
app.delete('/api/deleteemployee/:id', controller.deleteEmployee)

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
})
