const express = require("express");
const cors = require("cors");

const app = express();
const ctrl = require('./controller.js')

app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", ctrl.getCompliment)
app.get("/api/fortune", ctrl.getFortune)
app.get("/api/novel", ctrl.getNovel)
app.get("/api/fugitive", ctrl.getFugitive)

app.post("/api/doCalcOperation", ctrl.doCalcOperation)

app.post("/api/item", ctrl.makeItem)
app.put("/api/item/:name", ctrl.updateItem)
app.delete("/api/item/:name", ctrl.deleteItem)

app.listen(4000, () => console.log("Server running on 4000"));
