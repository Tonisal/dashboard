import React, {Component} from 'react';
import {Container, Row, Col} from "react-bootstrap";

import AddNewTaskForm from "./templates/AddNewTaskForm";
import TaskList from "./templates/TaskList";
import axios from 'axios';

class Tasks extends Component {
    state = {
        tasks: [],
    };

    /*Get Saved tasks from localStorage after reload/visit */
    componentDidMount() {
        this.getTasksFromServer();
    }

    getTasksFromServer = async () => {
        console.log('get');
        const res = await axios.get(`http://localhost:3020/tasks`);
        const data = res.data;
        this.setState({
            tasks: data.tasks,
        })
    };


    addingTaskToList = async (taskToAdd) => {
        const result = await axios.post(`http://localhost:3020/addTask`, {taskToAdd});
        if (result.status === 200) {
            let tasks = this.state.tasks;
            tasks.push(taskToAdd);
            this.setState({
                tasks: tasks
            })
        }
    };

    deleteTask = async (taskToDelete) => {
        console.log(taskToDelete);
        const result = await axios.post(`http://localhost:3020/deleteTask`, {taskToDelete});

        if (result.status === 200) {
            await this.getTasksFromServer();
        }

    };

    changeTaskName = async (taskToChange, newTaskName) => {
        console.log(taskToChange, newTaskName);
        const result = await axios.post(`http://localhost:3020/changeTaskName`, {taskToChange, newTaskName});
        if (result.status === 200) {
            console.log('send');
        }
    };

    render() {
        return (
            <Container className="tasks pt-5">
                <AddNewTaskForm addingTaskToList={this.addingTaskToList}/>
                <hr className="mb-5"/>
                <TaskList headline="Tasks ohne festes Datum"
                          tasks={this.state.tasks.filter(task => task.taskType === "taskWithoutDate")}
                          deleteTask={this.deleteTask} changeTaskName={this.changeTaskName}/>
                <Row>
                    <Col xs={6}>
                        <TaskList headline="Tasks mit Deadline heute"
                                  tasks={this.state.tasks.filter(task => task.taskType === "taskDeadline")}
                                  deleteTask={this.deleteTask} changeTaskName={this.changeTaskName}/>
                    </Col>
                    <Col xs={6}>
                        <TaskList headline="Tasks mit Deadline 7 Tage"
                                  tasks={this.state.tasks.filter(task => task.taskType === "taskDeadline")}
                                  deleteTask={this.deleteTask} changeTaskName={this.changeTaskName}/>
                    </Col>
                </Row>

            </Container>
        )
    };
}

export default Tasks;
