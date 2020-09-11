import React, {Component} from 'react';
import {
    Card,
    Row,
    ListGroup,
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    FormControl,
    Accordion,
    Collapse
} from "react-bootstrap";

import { ReactComponent as Arrow } from '../../svg/arrow.svg';
import TaskListItem from "./templates/TaskListItem";

class TaskList extends Component {
    state = {
        inputValueTaskName: '',
        inputValueDescription: '',
        inputValueRadio: 'taskEvent',
        inputChangeTaskName: '',
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

    addingTaskToList = (e) => {
        e.preventDefault();
        const taskToAdd = {
            taskName: this.state.inputValueTaskName,
            taskDescription: this.state.inputValueDescription,
            taskType: this.state.inputValueRadio,
        };
        this.setState({
            tasks: [
                ...this.state.tasks,
                taskToAdd
            ],
            inputValueTaskName: '',
            inputValueRadio: 'taskEvent',
            inputValueDescription: '',
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
    }

    render() {
        let tasks = this.state.tasks;
        let tasksMarkup;

        tasksMarkup = tasks.map(task =>
            <TaskListItem task={task}/>
        );

        if (tasks.length === 0) {
            tasksMarkup = <h2>Keine Aufgaben vorhanden</h2>
        }

        return (
            <Container className="tasks pt-5">
                <h2>Task-Liste</h2>
                <form className='addTask' onSubmit={this.addingTaskToList}>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Task Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.inputValueTaskName} id='taskName' type='text'
                                         onChange={this.handleInputValueChange} required/>
                        </InputGroup>
                        <div className="eventTypeContainer mb-3 d-flex">
                            <Card>
                                <Card.Body as="label" htmlFor='taskWithoutDate'>
                                    <span className="mr-2">Ohne Datum</span>
                                    <input id='taskWithoutDate' onChange={this.handleInputValueChange} type='radio'
                                           name='taskEventOrDeadline'
                                           checked/>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body as="label" htmlFor='taskEvent'>
                                    <span className="mr-2">Event</span>
                                    <input id='taskEvent' onChange={this.handleInputValueChange} type='radio'
                                           name='taskEventOrDeadline'
                                    />
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body as="label" htmlFor='taskDeadline'>
                                    <span className="mr-2">Deadline</span>
                                    <input id='taskDeadline' onChange={this.handleInputValueChange} type='radio'
                                           name='taskEventOrDeadline'/>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="tasks_date mb-3 d-flex">
                        <Form.Control type='date'/>
                        <Form.Control type='time'/>
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Beschreibung</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" id='taskDescription' value={this.state.inputValueDescription}
                                     onChange={this.handleInputValueChange}/>
                    </InputGroup>

                    <Button variant="success" type="submit">Task hinzufügen</Button>

                </form>
                <Row className="taskList">
                    <Col xs="12">
                        <Card className="flex-grow-1 mt-5">
                            <Card.Header className="text-center">Tasks ohne festes Datum</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {tasksMarkup}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default TaskList;
