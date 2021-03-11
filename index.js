const express = require("express");
const app = express();
const port = 3000;

app.get("/math/random", (req, res) => {
    setTimeout(() => res.send(JSON.stringify({ num: Math.random() })), 5000);
});

app.get("/math/round", (req, res) => {
    const num = +req.query.num;
    setTimeout(() => res.send(JSON.stringify({ num: Math.round(num * 100).toFixed(2) / 100 })));
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
