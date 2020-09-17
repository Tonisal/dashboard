import React from 'react';
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import TaskListItem from "./TaskListItem";


const TaskList = (props) => {
    const pushDeletedTaskToAppState = (taskToDeleteFromAppState) => {
        props.deleteTask(taskToDeleteFromAppState);
    };

    const pushChangeTaskNameToAppState = (taskToChange, newTaskName) => {
        props.changeTaskName(taskToChange, newTaskName);
    };

    let tasks = props.tasks;
    let tasksMarkup;
    tasksMarkup = props.tasks.map(task =>
        <TaskListItem key={task.taskName} task={task} deleteTask={pushDeletedTaskToAppState} changeTaskName={pushChangeTaskNameToAppState}/>
    );

    if (tasks.length === 0) {
        tasksMarkup = <h2>Keine Aufgaben vorhanden</h2>;
    }



    return (
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
    )
};

export default TaskList;
