
const { writeFile, readFile } = require("fs").promises; //importing the required functions from the fs.promises package

// create an async function named writer that writes three lines to a file named temp.txt
async function writer() {
    try {

        // Write the first line, overwriting if the file already exists
        console.log("Writing the first line...");
        await writeFile("temp.txt","Line 1: This is the first line\n", { flag: "w" });

        // Append the next two lines to the file
        console.log("Writing the second line...");
        await writeFile("temp.txt", "Line 2: This is the second line.\n", { flag: "a" });
        
        console.log("Writing the third line...\n");
        await writeFile("temp.txt", "Line 3: This is the third line.\n", { flag: "a" });;
        
    } catch (error) {
        console.error("Error writing to file:\n", error);
    }
};

async function reader(){
    try {
        console.log("Reading the file...\n");
        
        const readResult = await readFile("temp.txt", "utf8");

        console.log("File contents:\n", readResult);
        
        } catch (error) {
            console.log("Error reading the file:", error);    
        }

};

async function readWrite() { // Call writer first, then reader to ensure order
    await writer();
    await reader();
};

readWrite();
