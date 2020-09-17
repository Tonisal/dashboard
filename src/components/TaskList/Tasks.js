import React, {Component} from 'react';
import {Container} from "react-bootstrap";

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

    /*Save parameters (taskname, tasknotes ect.) when user is editing a task which he want to add*/
    handleInputValueChange = (e) => {

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
            this.setState({
                inputValueRadio: e.target.id
            });
        }
    };

    addingTaskToList = (taskToAdd) => {
        this.setState({
            tasks: [
                ...this.state.tasks,
                taskToAdd
            ],
        });
    };

    deleteTask = (taskToDelete) => {
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

    changeTaskName = (taskToChange, newTaskName) => {
        let tasks = this.state.tasks;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskName === taskToChange) {
                tasks[i].taskName = newTaskName;
            }
        }

        this.setState({
            tasks: tasks,
        });
    };

    render() {
        return (
            <Container className="tasks pt-5">
                <AddNewTaskForm addingTaskToList={this.addingTaskToList}/>
                <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} changeTaskName={this.changeTaskName}/>
            </Container>
        )
    };
}

export default Tasks;
