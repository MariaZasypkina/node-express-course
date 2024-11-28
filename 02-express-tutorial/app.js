const express = require('express');
const app = express();
const { products, people } = require('./data'); // importing product and people data from data.js
const peopleRouter = require('./routes/people');



const logger = (req, res, next) => { // creating middleware function
    const currentTime = new Date().toLocaleTimeString(); // Getting local time
    const logMessage = `${req.method} ${req.url} [${currentTime}]`;
    console.log(logMessage); //log the method, url properties and time from the req object
    req.logMessage = logMessage; // Save log message to req object
    next(); // called once middleware processing is completed
};


// method 1 - apply logger locally in a route
//app.get('/loggerpath1', logger, (req, res) => { 
//   res.send(`Logger tested with a first method: ${req.logMessage}`);
//});

//Apply logger middleware for specific paths

app.use(logger); // applies logger middleware to all routes

app.use(express.json()); // middlware for parsing json bodies

app.use('/api/v1/people', peopleRouter);

app.use(express.static('./methods-public')); //serve static files

app.get('/api/v1/test', (req, res) => { //To test JSON
    res.json({ 
        message: "It worked!" 
    });
});

//Getting the array of products:
app.get('/api/v1/products', (req, res) => {
    res.json(products); 
});

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
