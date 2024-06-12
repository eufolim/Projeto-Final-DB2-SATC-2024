require("dotenv").config();
const express = require("express");
const app = express();

// Endpoint de teste
app.get("/", (request, response) => {
    response.json({
        message: "It's alive!"
    });
});

app.listen(process.env.PORT, () => {
    console.log("Aplicação rodando");
});
