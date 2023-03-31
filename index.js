const express = require('express');
const { configuracionSocket } = require('./sockets/socket');
const app = express()

app.use(express.json())
app.use(require("cors")())
app.use(require("express").static(require("path").resolve(__dirname, 'public')))


const server = require('http').createServer(app);
configuracionSocket(server);






server.listen(3000, () => { console.log("listo") });