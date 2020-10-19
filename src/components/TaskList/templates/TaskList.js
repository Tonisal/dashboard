import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
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
        <TaskListItem key={task.taskName} task={task} deleteTask={pushDeletedTaskToAppState}
                      changeTaskName={pushChangeTaskNameToAppState}/>
    );

    if (tasks.length === 0) {
        tasksMarkup = <h2>Keine Einträge vorhanden</h2>;
    }


    return (
        <Card className="taskList flex-grow-1 mb-5">
            <Card.Header className="text-center">{props.headline}</Card.Header>
            <Card.Body>
                <ListGroup>
                    {tasksMarkup}
                </ListGroup>
            </Card.Body>
        </Card>
    )
};

export default TaskList;
