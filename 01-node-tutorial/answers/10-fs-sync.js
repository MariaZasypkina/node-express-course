//loading writeFileSync and readFileSync functions from the fs module
const {readFileSync, writeFileSync} = require('fs');

const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');
const third = readFileSync('./content/third.txt', 'utf8');

console.log(first,'\n',second, '\n', third);


//using writeFileSync to write 3 lines to a file, ./temporary/fileA.txt, 
//using the "append" flag for each line after the first one

writeFileSync('./temporary/fileA.txt', 
    `Here is the result: \n${first}\n`);

    writeFileSync('./temporary/fileA.txt', `${second}\n`, 
      { flag: 'a' }
    );
    writeFileSync('./temporary/fileA.txt', `${third}\n`, 
      { flag: 'a' }
    );

// using readFileSync to read the file, and log the contents to the console 

    const readResult = readFileSync('./temporary/fileA.txt', 'utf8');

    console.log(readResult);
    
  /*10-fs-sync.js: This should load writeFileSync and readFileSync functions 
  from the fs module. Then you will use writeFileSync to write 3 lines to a 
  file, ./temporary/fileA.txt, using the "append" flag for each line after 
  the first one. Then use readFileSync to read the file, and log the contents 
  to the console. Be sure you create the file in the temporary directory. 
  That will ensure that it isn’t pushed to Github when you submit your answers
   (because that file has been added to the .gitignore file for you already 
   which tells git not to look at those files).*/