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

import {ReactComponent as Arrow} from '../../svg/arrow.svg';

const TaskListItem = (props) => {
    return (
        <Accordion>
            <ListGroup.Item key={props.task.taskName} className="">
                <div className="d-flex items-center justify-content-between">
                    <InputGroup className="w-50 position-relative">
                        <Form.Control id="changeTaskName" taskattr='taskName' task={props.task.taskName}
                                      defaultValue={props.task.taskName}
                                      className="border-0"/>
                        <form className="position-absolute right" task={props.task.taskName}>
                            <Button variant="link" className="border-0" type="submit">speichern</Button>
                        </form>
                    </InputGroup>
                    {props.task.taskDescription ?
                        <Accordion.Toggle as="button" variant="link" eventKey={props.task.taskName}
                                          className="accordion__toggle">
                            <Arrow/>
                        </Accordion.Toggle> : ''}
                    <form task={props.task.taskName}>
                        <Button className="ml-auto" variant="danger" type="submit">Löschen</Button>
                    </form>
                </div>
            </ListGroup.Item>
            {props.task.taskDescription ?
                <Accordion.Collapse eventKey={props.task.taskName}>
                    <Card className="border-top-0">
                        <Card.Body className="pl-4">{props.task.taskDescription}</Card.Body>
                    </Card>
                </Accordion.Collapse> : ''}
        </Accordion>
    )
};

export default TaskListItem;