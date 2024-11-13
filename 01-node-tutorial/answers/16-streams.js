const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size

const stream = createReadStream('../content/big.txt', { 

  highWaterMark: 200,
  encoding: 'utf8'  });

stream.on('data', (result) => {
  console.log("Received chunk:", result);
});
stream.on('error', (err) => console.log(err))
