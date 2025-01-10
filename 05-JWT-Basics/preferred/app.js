const express = require('express');
const dotenv = require('dotenv');


//environment variables loading

dotenv.config();

const app = express();

// To parse JSON middleware

app.use(express.json());

//Serve static files from public folder
app.use(express.static('public'));

// Importing routs

const authRoutes = require('./routes/authRoutes');
app.use('/api/v1', authRoutes);

//default route

app.get('/', (req, res) => {
    res.send('JWT Basics API');
  });

 //Start the server
 
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
 });

