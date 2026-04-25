const concurrently = require("concurrently");

const services = [
  "gateway",
  "auth",
  "user",
  "pins",
  "comments",
  "likes",
  "saves",
  "boards",

];
const colors = [
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",

  "gray",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
];

const commands = services.map((service,i) => ({
  command: `npm run start:dev ${service}`,
  name: service,
   prefixColor: colors[i % colors.length], 
}));

const { result } = concurrently(commands, {
  prefix: "name",
  killOthersOn: ["failure", "success"], 
});


result
  .then(() => {
    console.log("All services exited successfully");
  })
  .catch((err) => {
    console.error("Some service failed:", err);
  });