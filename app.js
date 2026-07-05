import express from "express";
import movieRoutes from "./src/routes/movie.routes.js";
import {conectarBD, sequelize } from "./src/config/database.js";

//middlewares
const app = express();

const PORT = 3000; 


app.use(express.json());

// Ruta principal (GET /)
// Cuando se acceda a http://localhost:3001/
// responderá con un mensaje en formato JSON
app.get("/", (req, res) => {
    return res.json({
        message: "Servidor todo listo"
    });
});

app.listen(PORT, async () => {
    await conectarBD()
    console.log("servidor listo")
})