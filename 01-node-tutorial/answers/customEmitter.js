const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}! How are you doing today?`);
    emitter.emit("response", name);
  });

emitter.on("response", (name, ) => {
    console.log(`Response received from ${name}: I'm doing great, thank you!`)
});

setInterval(() => {
emitter.emit("greet", "Maria");
}, 4000);
