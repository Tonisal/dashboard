import React, {Component} from 'react';
import { Container } from "react-bootstrap";

import AddNewTaskForm from "./templates/AddNewTaskForm";
import TaskList from "./templates/TaskList";

class Tasks extends Component {
    state = {
        tasks: [],
    };

    /*Get Saved tasks from localStorage after reload/visit */
    componentDidMount() {
        if (localStorage.tasks) {
            const tasksFromLocalStorage = JSON.parse(localStorage.tasks);
            this.setState({tasks: tasksFromLocalStorage});
        }
    }

    /*Save tasks in LocalStorage */
    componentDidUpdate() {
        const tasksToLocalStorage = JSON.stringify(this.state.tasks);
        localStorage.setItem('tasks', tasksToLocalStorage);
    }

    getCurrentDate = () => {

    }

    /*Save parameters (taskname, tasknotes ect.) when user is editing a task which he want to add*/
    handleInputValueChange = (e) => {
        console.log('hi');

        if (e.target.id === 'taskName') {
            this.setState({
                inputValueTaskName: e.target.value
            });
        } else if (e.target.id === 'taskDescription') {
            this.setState({
                inputValueDescription: e.target.value
            });
        } else if (e.target.id === 'changeTaskName') {
            this.setState({
                inputChangeTaskName: e.target.value
            });
        } else {
            console.log(e.target.id);
            this.setState({
                inputValueRadio: e.target.id
            });
        }
    };

    addingTaskToList = (taskToAdd) => {
        console.log(taskToAdd);
        this.setState({
            tasks: [
                ...this.state.tasks,
                taskToAdd
            ],
        });

        console.log(this.state);
    };

    deleteTaskFromList = (e) => {
        console.log('hi');
        e.preventDefault();
        const taskToDelete = e.target.getAttribute('task');
        let tasks = this.state.tasks;

        for (let i = 0; i < tasks.length; i++) {
            if (taskToDelete === tasks[i].taskName) {
                tasks.splice(i, 1);

                this.setState({
                    tasks: tasks
                });
            }
        }
    };

    test = () => {
        console.log('hi');
    }

    changeTaskName = (e) => {
        e.preventDefault();
        if (this.state.inputChangeTaskName.length) {
            const taskToChange = e.target.getAttribute('task');
            //const attrToChange = e.target.getAttribute('taskattr');
            const attrToChange = "taskName";

            let tasks = this.state.tasks;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].taskName === taskToChange) {
                    tasks[i][attrToChange] = this.state.inputChangeTaskName;
                }
            }
            console.log(tasks);
            this.setState({
                tasks: tasks,
                inputChangeTaskName: '',
            });
        }
    };

    render() {
        return (
            <Container className="tasks pt-5">
                <h2>Task-Liste</h2>
                <AddNewTaskForm addingTaskToList = {this.addingTaskToList}/>
                <TaskList tasks={this.state.tasks}/>
            </Container>
        )
    };
}

export default Tasks;
