const app = require("express")();

app.get("/", (req, res) => {
  res.send(`appid ${process.env.APPID} home page: says hello!`);
});

app.listen(9999, () => {
  console.log("listening on 9999");
});
