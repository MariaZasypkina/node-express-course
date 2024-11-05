//load the fs module
const { writeFile, readFile } = require("fs");

console.log("at start");

// Read the content of the first file

readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log("Error reading first file:", err);
    return;
  }
  const first = result;

// Write the first line to fileB.txt (no append flag needed for the first line)
  writeFile('./temporary/fileB.txt', `Here is the result:\n${first}\n`, (err) => {
    console.log("Written first line");
    if (err) {
      console.log("Error writing first line:", err);
      return;
    }

// Read the content of the second file

    readFile('./content/second.txt', 'utf8', (err, result) => {
      if (err) {
        console.log("Error reading second file:", err);
        return;
      }
      const second = result;

// Append the second line to fileB.txt with { flag: 'a' }
      writeFile('./temporary/fileB.txt', `${second}\n`, { flag: 'a' }, (err) => {
        console.log("Written second line");
        if (err) {
          console.log("Error writing second line:", err);
          return;
        }
// Read the content of the third file
        readFile('./content/third.txt', 'utf8', (err, result) => {
          if (err) {
            console.log("Error reading third file:", err);
            return;
          }
          const third = result;

// Append the third line to fileB.txt with { flag: 'a' }
          writeFile('./temporary/fileB.txt', `${third}\n`, { flag: 'a' }, (err) => {
            console.log("Written third line");
            if (err) {
              console.log("Error writing third line:", err);
              return;
            }
            console.log("All tasks completed");
          });
        });
      });
    });
  });
});

console.log("at end");

// 11-fs-async.js: This should load the fs module, and use the asynchronous 
// function writeFile to write 3 lines to a file, ./temporary/fileB.txt. Now, 
// be careful here! This is our first use of asynchronous functions in this 
// class, but we are going to use them a lot! First, you need to use the "append"
//  flag for all but the first line. Second, each time you write a line to the 
//  file, you need to have a callback, because the writeFile operation is 
//  asynchronous. Third, for each line you write, you need to do the write for 
//  the line that follows it within the callback - otherwise the operations won’t
// happen in order. Put console.log statements at various points in your code to
//  tell you when each step completes. Then run the code. Do the console log 
//  statements appear in the order you expect? Run the program several times 
//  and verify that the file is created correctly. 
 
//  Here is how you might start:
// const { writeFile } = require("fs");
// console.log("at start");
// writeFile("./temporary/output.txt", "This is line 1\n", (err, result) => {
//   console.log("at point 1");
//   if (err) {
//     console.log("This error happened: ", err);
//   } else {
//     // here you write your next line
//   }
// });
// console.log("at end");