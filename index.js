import jsonServer from "json-server";
import shadazzle from "./companies/shadazzle.js";
import fitlyfe from "./companies/fitlyfe.js";
import socimind from "./companies/socimind.js";
const server = jsonServer.create();
const middlewares = jsonServer.defaults()
server.use(middlewares);

const routerShadazzle = jsonServer.router({
  profiles: shadazzle.generateProfiles(50),
});
server.use("/api/shadazzle", routerShadazzle);

const routerFitlyfe = jsonServer.router({
  profiles: fitlyfe.generateProfiles(50),
});
server.use("/api/fitlyfe", routerFitlyfe);

const routerSocimind = jsonServer.router({
  profiles: socimind.generateProfiles(50),
});
server.use("/api/socimind", routerSocimind);

console.log(`Server starting on port: ${process.env.PORT} `)
server.listen(process.env.PORT);
