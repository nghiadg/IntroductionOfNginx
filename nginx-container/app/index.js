const express = require("express");
const app = express();
const os = require("os");

app.get("/", (req, res) => res.send("Hello from " + os.hostname()));
app.listen(8080, () => console.log("Listening on port 8080 from " + os.hostname()));
