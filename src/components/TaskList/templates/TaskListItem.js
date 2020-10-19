import React from 'react';
import {
    Card,
    ListGroup,
    Button,
    Form,
    InputGroup,
    Accordion,
    Textarea,
    FormControl
} from "react-bootstrap";

import {ReactComponent as Arrow} from '../../../svg/arrow.svg';

class TaskListItem extends React.Component {
    state = {
        inputNameChangeValue: '',
    }

    handleTaskNameChange = (e) => {
        this.setState({
            inputNameChangeValue: e.target.value
        });
    };

    saveTaskNameChange = (e) => {
        e.preventDefault();
        const taskToChange = e.target.getAttribute('data-task');
        const newTaskName = this.state.inputNameChangeValue;

        if (newTaskName.length) {
            this.props.changeTaskName(taskToChange, newTaskName);
            this.setState({
                inputChangeTaskName: '',
            });
        }
    };

    render() {
        const deleteTask = (e) => {
            e.preventDefault();
            const taskToDelete = e.target.getAttribute('data-task');
            this.props.deleteTask(taskToDelete);
        };

        return (
            <Accordion className="taskListItem">
                <ListGroup.Item className="">
                    <div className="d-flex items-center justify-content-between">
                        <InputGroup className="w-50 position-relative">
                            <Form.Control id="changeTaskName" taskattr='taskName' data-task={this.props.task.taskName}
                                          defaultValue={this.props.task.taskName} onChange={this.handleTaskNameChange}
                                          className="border-0"/>
                            <form className="position-absolute right" data-task={this.props.task.taskName}
                                  onSubmit={this.saveTaskNameChange}>
                                <Button variant="link" className="taskListItem__saveButton"
                                        type="submit">speichern</Button>
                            </form>
                        </InputGroup>
                        <Accordion.Toggle as="div" eventKey={this.props.task.taskName}>
                            {this.props.task.taskDescription ? <Arrow className="accordion__toggle"/> :
                                <Button variant="secondary">Beschreibung hinzufügen</Button>}
                        </Accordion.Toggle>
                        <form data-task={this.props.task.taskName} onSubmit={deleteTask}>
                            <Button className="ml-auto" variant="danger" type="submit">Löschen</Button>
                        </form>
                    </div>
                </ListGroup.Item>
                <Accordion.Collapse eventKey={this.props.task.taskName}>
                    <Card className="border-top-0">
                        <Card.Body className="pl-4">
                            <InputGroup>
                                <FormControl as="textarea" aria-label="With textarea">{this.props.task.taskDescription}</FormControl>
                                <InputGroup.Append>
                                    <Button variant="success">speichern</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Card.Body>
                    </Card>
                </Accordion.Collapse>
            </Accordion>
        )
    }
};

export default TaskListItem;
