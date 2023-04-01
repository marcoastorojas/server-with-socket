const express = require('express');
const { configuracionSocket } = require('./sockets/socket');
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://marcoasto:marcoasto@cluster0.pfcoh4w.mongodb.net/test")


const Banda = mongoose.model("banda", { name: String, votes: Number })
const app = express()
app.use(express.json())
app.use(require("cors")())





const server = require('http').createServer(app);
configuracionSocket(server,Banda);

app.get('/ver-bandas', async (req, res) => {
    const bandas = await Banda.find()
    res.status(200).json({
        ok: true,
        bandas,
    })
    
})




server.listen(3000, () => { console.log("listo") });