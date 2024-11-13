const { writeFile, readFile } = require("fs").promises;

console.log("Adding text...");
writeFile("temp.txt","Line 1: This is the first line\n", { flag: "w" })
.then(() => writeFile("temp.txt"," Line 2: This is the second line\n", { flag: "a" }))
.then(() => writeFile("temp.txt"," Line 3: This is the third line\n", { flag: "a" }))
.then(() => {
    console.log("\nText added...\n");   
  })
.then(() => {
    console.log("Reading text...");
    return readFile("temp.txt", "utf8");
  })
.then((readResult) => console.log("File contents:\n", readResult))
.catch((error) => console.log("An error occurred: ", error));
