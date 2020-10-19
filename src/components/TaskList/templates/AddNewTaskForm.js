import React from 'react';
import {
    Card,
    Button,
    InputGroup,
    FormControl,
    Accordion,
} from "react-bootstrap";


class AddNewTaskForm extends React.Component {

    state = {
        inputValueTaskName: '',
        inputValueDescription: '',
        inputValueType: 'taskWithoutDate',
        inputValueDate: '',
        inputValueTime: '',
        inputValueTaskPerodical: false
    }

    handleNewTaskSave = (e) => {
        e.preventDefault();
        const taskToAdd = {
            taskName: this.state.inputValueTaskName,
            taskDescription: this.state.inputValueDescription,
            taskType: this.state.inputValueType,
            taskDate: this.state.inputValueDate,
            taskTime: this.state.inputValueTime,
        };
        this.props.addingTaskToList(taskToAdd);
        this.setState({
            inputValueTaskName: '',
            inputValueType: 'taskWithoutDate',
            inputValueDescription: '',
            inputValueDate: '',
        });
    };

    handleInputValueChange = (e) => {
        if (e.target.id === 'taskName') {
            this.setState({
                inputValueTaskName: e.target.value
            });
        } else if (e.target.id === 'taskDescription') {
            this.setState({
                inputValueDescription: e.target.value
            });
        } else if (e.target.id === 'taskDate') {
            console.log(e.target.value);
            let test = new Date(e.target.value);
            test.setDate(test.getDate()+parseInt(28));
            console.log(test);
            this.setState({
                inputValueDate: e.target.value
            });
        } else if (e.target.id === 'taskTime') {
            this.setState({
                inputValueTime: e.target.value
            });
        } else if (e.target.id === 'taskPeriodicalYes') {
            this.setState({
                inputValueTaskPerodical: true
            });
        } else if (e.target.id === 'taskPeriodicalNo') {
            this.setState({
                inputValueTaskPerodical: false
            });
        } else {
            this.setState({
                inputValueType: e.target.id
            });
        }
    };


    render() {
        return (
            <Accordion className="addNewTaskForm mb-3">
                <Card className="shadow-none">
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center cursor-pointer">
                        Task hinzufügen
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <form className='addTask' onSubmit={this.handleNewTaskSave}>
                                <div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">Task Name</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl value={this.state.inputValueTaskName} id='taskName' type='text'
                                                     onChange={this.handleInputValueChange} required/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Beschreibung</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="textarea" id='taskDescription'
                                                     value={this.state.inputValueDescription}
                                                     onChange={this.handleInputValueChange}/>
                                    </InputGroup>
                                    <div className="eventTypeContainer mb-3 d-flex">
                                        <Card className="mr-1">
                                            <Card.Body as="label" htmlFor='taskWithoutDate'>
                                                <span className="mr-2">Ohne Deadline</span>
                                                <input id='taskWithoutDate' onChange={this.handleInputValueChange}
                                                       type='radio'
                                                       name='taskEventOrDeadline'
                                                       defaultChecked
                                                />
                                            </Card.Body>
                                        </Card>
                                        <Card className="ml-1">
                                            <Card.Body as="label" htmlFor='taskDeadline'>
                                                <span className="mr-2">Mit Deadline</span>
                                                <input id='taskDeadline' onChange={this.handleInputValueChange}
                                                       type='radio'
                                                       name='taskEventOrDeadline'/>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                                {this.state.inputValueType !== 'taskWithoutDate' ?
                                    <div className="tasks_date mb-3 d-flex">
                                        <InputGroup className="mr-1">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">Datum</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl id="taskDate" type="date"
                                                         onChange={this.handleInputValueChange} required/>
                                        </InputGroup>
                                        <InputGroup className="ml-1">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">Uhrzeit</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl id="taskTime" type="time"
                                                         onChange={this.handleInputValueChange} required/>
                                        </InputGroup>
                                    </div> : ''}
                                <Button variant="success" type="submit" className={this.state.inputValueTaskName.length > 0 ? '' : 'disabled'}
                                                                         data-test={this.state.inputValueTaskName.length}>Task
                                    hinzufügen</Button>
                            </form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

export default AddNewTaskForm;
