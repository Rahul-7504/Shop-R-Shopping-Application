require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const cors = require('cors'); 
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for all origins
app.get('/', (req, res) => {
    console.log('hello everyone !!');
    res.send('Hello World!');
});

const studentRoute = require('./routes/student.routes');
app.use('/students', studentRoute);

const productRoute = require('./routes/product.route');
app.use('/products', productRoute);

app.listen(PORT, () => { 
    console.log(`Server is running at http://localhost:${PORT}`);
});