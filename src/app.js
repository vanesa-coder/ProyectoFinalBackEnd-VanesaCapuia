import express from "express";
import router from "./router/index.router.js"
import { connectMongoDB } from "./config/mongoDb.config.js";
import envs from "./config/envs.config.js";

const PORT = 8080;
const app = express();
// Conexión con mongo
connectMongoDB();

app.use(express.json()); // Este middleware nos permite obtener archivos json
app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));

app.use("/api", router);



app.listen(envs.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envs.PORT}`);
});
