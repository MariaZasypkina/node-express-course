const express = require('express');
const app = express();
const { products } = require('./data'); // importing data from data.js

app.use(express.static('./public'));

//To return JSON
app.get('/api/v1/test', (req, res) => {
    res.json({ 
        message: "It worked!" 
    });
});

//Getting the array of products:
app.get('/api/v1/products', (req, res) => {
    res.json(products); 
});

//Return the path parameter by ID
//app.get('/api/v1/products/:productID', (req, res) => {
//    res.json(req.params);
//});

//Getting product by ID
app.get('/api/v1/products/:productID', (req, res) => {
    const findId = parseInt(req.params.productID); //converting to number
    const product = products.find((p) => p.id === findId); //searching the needed product in array
    
    if (product) {
        res.json(product); // return the needed product
    } else {
        res.status(404).json({ message: "That product was not found." });
    }
    
});

//limiting the number of results and filter

app.get('/api/v1/query', (req, res) => {
    const { search, limit, price } = req.query; //getting the params of request
    let filteredProducts = [...products]; //copying array of products to filter

    //filter if 'search' is in query (with first letters)

    if (search) {
        filteredProducts = filteredProducts.filter((product) =>
        product.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
    );
    }

    //filter if 'price' is in query 

    if(price) {
        const maxPrice = parseFloat(price) //converting to the number
        filteredProducts = filteredProducts.filter(
            (product) => product.price < maxPrice
        );
    }

    //limit 

    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }

    //empty array if there is no results

    if(filteredProducts.length < 1) {
        return res.status(200).json({  //code 200 to show that request worked even if the result is empty
           message: "No products matched your search." 
         });
    }

    //return filtered products

    res.status(200).json(filteredProducts);
});

//Listen on port 3000

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Handle 404 errors

app.all('*', (req, res) => {
    res.status(404).send('Page not found');
});

console.log('Express Tutorial')
