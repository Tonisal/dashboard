import React, {Component} from 'react';
import {Card, Row, ListGroup, Button, Col, Container, Form} from "react-bootstrap";

class TaskList extends Component {
    state = {
        inputValueTaskName: '',
        inputValueNotes: '',
        inputValueRadio: 'taskEvent',
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

        if (e.target.id === 'taskName') {
            this.setState({
                inputValueTaskName: e.target.value
            });
        } else if (e.target.id === 'taskNotes') {
            this.setState({
                inputValueNotes: e.target.value
            });
        } else {
            this.setState({
                inputValueRadio: e.target.id
            });
        }
    };

    addingTaskToList = (e) => {
        e.preventDefault();
        const taskToAdd = {
            taskName: this.state.inputValueTaskName,
            taskNotes: this.state.inputValueNotes,
            taskType: this.state.inputValueRadio,
        };
        this.setState({
            tasks: [
                ...this.state.tasks,
                taskToAdd
            ],
            inputValueTaskName: '',
            inputValueNotes: '',
            inputValueRadio: 'taskEvent',
        });
    };

    deleteTaskFromList = (e) => {
        console.log('hi');
        e.preventDefault();
        const taskToDelete = e.target.getAttribute('task');
        let tasks = this.state.tasks;

        for (var i = 0; i < tasks.length; i++) {
            if (taskToDelete === tasks[i].taskName) {
                tasks.splice(i, 1);

                this.setState({
                    tasks: tasks
                });
            }
        }
    };

    changeTask = (e) => {
        const taskToChange = e.target.getAttribute('task');
        const attrToChange = e.target.getAttribute('taskattr');
        const newValue = e.target.value;

        let tasks = this.state.tasks;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskName === taskToChange) {
                tasks[i][attrToChange] = newValue;
            }
        }
        console.log(tasks);
        this.setState({
            tasks: tasks
        });
    }

    render() {
        let tasks = this.state.tasks;
        let tasksMarkup;

        tasksMarkup = tasks.map(task =>
            <ListGroup.Item key={task.taskName} className="d-flex items-center justify-content-between">
                <input taskattr='taskName' task={task.taskName} defaultValue={task.taskName} className="border-0 w-50" />
                <form task={task.taskName} onSubmit={this.deleteTaskFromList}>
                    <Button className="ml-auto" variant="danger" type="submit">Löschen</Button>
                </form>
            </ListGroup.Item>
        );

        if (tasks.length===0) {
            tasksMarkup = <h2>Keine Aufgaben vorhanden</h2>
        }

        return (
            <Container className="tasks pt-5">
                <h2>Task-Liste</h2>
                <form className='addTask' onSubmit={this.addingTaskToList}>
                    <div>
                        <Form.Control value={this.state.inputValueTaskName} id='taskName' type='text'
                                      onChange={this.handleInputValueChange}
                                      placeholder="Taskzusammenfassung" required/>
                        <div className="d-flex">
                            <div>
                                <label htmlFor='taskEvent'>Event</label>
                                <input id='taskEvent' onChange={this.handleInputValueChange} type='radio'
                                       name='taskEventOrDeadline'
                                       checked/>
                            </div>
                            <div>
                                <label htmlFor='taskDeadline'>Deadline</label>
                                <input id='taskDeadline' onChange={this.handleInputValueChange} type='radio'
                                       name='taskEventOrDeadline'/>
                            </div>
                            <div>
                                <label htmlFor='taskWithoutDate'>Ohne Datum</label>
                                <input id='taskWithoutDate' onChange={this.handleInputValueChange} type='radio'
                                       name='taskEventOrDeadline'/>
                            </div>
                        </div>
                    </div>
                    <div className="tasks_date">
                        <input type='date'/>
                        <input type='time'/>
                    </div>
                    <Form.Control className="mb-3" as="textarea" id='taskNotes' value={this.state.inputValueNotes}
                                  onChange={this.handleInputValueChange}
                                  placeholder='Zusammenfassung'/>
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
                    <Col xs="12">
                        <Card className="flex-grow-1 mt-5">
                            <Card.Header className="text-center">Aufgaben Heute (13.08.2020)</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item className="d-flex items-center">
                                        <span>Spüle ausräumen</span>
                                        <button>Aufklappen</button>
                                        <Button className="ml-auto" variant="danger">Löschen</Button>
                                        <Button className="ml-4" variant="success">Fertig</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex items-center">
                                        <span>Spüle ausräumen</span>
                                        <Button className="ml-auto" variant="danger">Löschen</Button>
                                        <Button className="ml-4" variant="success">Fertig</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex items-center">
                                        <span>Spüle ausräumen</span>
                                        <Button className="ml-auto" variant="danger">Löschen</Button>
                                        <Button className="ml-4" variant="success">Fertig</Button>
                                    </ListGroup.Item>

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
