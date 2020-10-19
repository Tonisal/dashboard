const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 3020;

app.use(cors({
    origin: 'http://localhost:3010'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getDataFromFile = async (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
};

const saveDataInFile = (path, data) => {
    fs.writeFile(path, data, (err) => {
        if (err) throw err;
        console.log('Neues JSON File mit Task-Infos wurde geschrieben');
    });
};

app.get('/', (req, res) => {
    return res.send('hello world');
});


app.get('/tasks', async (req, res) => {
    const data = await getDataFromFile('./tasks.json');
    return res.send(data);
});

app.post('/addTask', async (req, res) => {
    const taskToAdd = req.body.taskToAdd;
    let tasks = await getDataFromFile('./tasks.json');
    tasks.tasks.push(taskToAdd);
    console.table(tasks.tasks);
    let kacken = JSON.stringify(tasks);
    saveDataInFile('./tasks.json', kacken);
    res.sendStatus(200);
});

app.post('/deleteTask', async (req, res) => {
    const taskToDelete = req.body.taskToDelete;
    let tasks = await getDataFromFile('./tasks.json');
    let newTasks = tasks.tasks.filter(task => task.taskName !== taskToDelete);
    tasks = {'tasks': newTasks};
    saveDataInFile('./tasks.json', JSON.stringify(tasks));
    res.sendStatus(200);
});

app.post('/changeTaskName', async (req, res) => {
    const taskToChange = req.body.taskToChange;
    const newTaskName = req.body.newTaskName;
    let tasks = await getDataFromFile('./tasks.json');
    let newTasks = [];
    for (let i = 0; i < tasks.tasks.length; i++) {
        if (tasks.tasks[i].taskName === taskToChange) {
            tasks.tasks[i].taskName = newTaskName;
        }
        newTasks.push(tasks.tasks[i]);
    }

    tasks = {'tasks': newTasks};
    saveDataInFile('./tasks.json', JSON.stringify(tasks));
    res.sendStatus(200);
});


app.get('/checklists', async (req, res) => {
    const data = await getDataFromFile('./checklists.json');
    return res.send(data);
});

app.post('/addList', async (req, res) => {
    const taskToAdd = req.body.taskToAdd;
    let tasks = await getDataFromFile('./tasks.json');
    tasks.tasks.push(taskToAdd);
    console.table(tasks.tasks);
    let kacken = JSON.stringify(tasks);
    saveDataInFile('./tasks.json', kacken);
    res.sendStatus(200);
});



app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);
