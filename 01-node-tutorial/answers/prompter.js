const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};
// adding the comment for the week2.5

// new variables name and color
let name = "Enter your name.";
let color = "Choose a color.";


const form = () => {
  //using string interpolation to insert the values of your 
  //variables into the HTML
  return `
  <body>
  <p>${name}</p> 
  <p>${color}</p>
  <form method="POST">
    <input name="name" placeholder="Your name"></input>
    <select name="color">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
    </select>
    <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
  
      if (body["name"]) { //save name
        name = `Hello, ${body["name"]}!\n How are you today?`;
      } else {
        name = "No name was entered."; //empty and by default
      }

      if (body["color"]) { // save color
        color = `You selected the color: ${body["color"]}`;
      } else {
        color = "No color was selected."; //by default
      }

      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
});  

server.listen(3000);
console.log("The server is listening on port 3000.");
