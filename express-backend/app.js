const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 3020;

app.use(cors({
    origin: 'http://localhost:3010/'
}));

const getDataFromFile = async (path) => {
    return fs.readFileSync(path, 'utf8');
};

app.get('/', (req, res) => {
    return res.send('hello world');
});


app.get('/tasks', async (req, res) => {
    const data = await getDataFromFile('./tasks.json');
    console.log(data);
    return res.send(data);
});


app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);
