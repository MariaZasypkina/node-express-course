const os = require('os');

//info about current user 
const user = os.userInfo();


//method returns the system uptime is seconds

console.log(`\nThe system uptime is ${os.uptime()} seconds\n`);


const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}
console.log(currentOS);

