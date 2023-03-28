import jsonServer from "json-server";
import shadazzle from "./companies/shadazzle.js";
import fitlyfe from "./companies/fitlyfe.js";
import socimind from "./companies/socimind.js";

const PORT = process.env.PORT || 3000;

const server = jsonServer.create();
const middlewares = jsonServer.defaults()
server.use(middlewares);

const routerShadazzle = jsonServer.router({
  profiles: shadazzle.generateProfiles(1000),
});
server.use("/api/shadazzle", routerShadazzle);

const routerFitlyfe = jsonServer.router({
  profiles: fitlyfe.generateProfiles(1000),
});
server.use("/api/fitlyfe", routerFitlyfe);

const routerSocimind = jsonServer.router({
  profiles: socimind.generateProfiles(1000),
});
server.use("/api/socimind", routerSocimind);

const routerSecret = jsonServer.router({
  secret: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    shhhh: "Don't tell anyone"
  }
});
server.use("/api/", routerSecret);

console.log(`Server starting on port: ${PORT} `)
server.listen(PORT);
