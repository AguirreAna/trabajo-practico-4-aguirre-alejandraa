import express from "express";

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
    console.log("servidor listo")
})