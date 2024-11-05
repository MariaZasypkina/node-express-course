/*
02-globals.js: This program should use the console.log function 
to write some globals to the screen. Set an environment variable 
with the following command in your command line terminal: export 
MY_VAR="Hi there!" The program should then use console.log to 
print out the values of __dirname (a Node global variable) and 
process.env.MY_VAR (process is also a global, and contains the 
environment variables you set in your terminal.) You could print 
out other globals as well (Node documentation on available 
globals). For each of these programs, you invoke them with node 
to make sure they work.*/ 


//Part 1
console.log(__dirname); 


//Part 2

//in terminal:
//export MY_VAR="Hey there)))"


let count = 0; // counter

const printing = setInterval(() => {
    console.log(process.env.MY_VAR);
    count++; // counter increment

    if (count === 5){ // print 5 times and stop
        clearInterval(printing);
    }
}, 2000) // print every 2 sec

