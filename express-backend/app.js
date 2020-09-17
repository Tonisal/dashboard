const express = require('express');
const app = express();
const port = 3020;
const data = {
    "fruit": "Apple",
    "size": "Large",
    "color": "Red"
}

app.get('/', (req, res) => {
    return res.send('hello world');
});


app.get('/tasks', (req, res) => {
    return res.send(data);
});


app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);
