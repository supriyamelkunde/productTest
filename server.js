const express = require('express');
const productController= require('./controller/productController');

const app = express();
app.use(express.json());


app.get('/api/products', productController.getProducts);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})