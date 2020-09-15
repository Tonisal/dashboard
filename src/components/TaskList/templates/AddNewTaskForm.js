import React from 'react';
import {
    Card,
    Button,
    Form,
    InputGroup,
    FormControl,
    Accordion,
} from "react-bootstrap";


class AddNewTaskForm extends React.Component {

    state = {
        inputValueTaskName: '',
        inputValueDescription: '',
        inputValueRadio: 'taskWithoutDate',
    }

    handleNewTaskSave = (e) => {
        e.preventDefault();
        const taskToAdd = {
            taskName: this.state.inputValueTaskName,
            taskDescription: this.state.inputValueDescription,
            taskType: this.state.inputValueRadio,
        };
        this.props.addingTaskToList(taskToAdd);
        this.setState({
            inputValueTaskName: '',
            inputValueRadio: 'taskEvent',
            inputValueDescription: '',
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
        } else {
            this.setState({
                inputValueRadio: e.target.id
            });
        }
    };


    render() {
        return (
            <Accordion>
                <Card className="shadow-none">
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center">
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
                                        <Card>
                                            <Card.Body as="label" htmlFor='taskWithoutDate'>
                                                <span className="mr-2">Ohne Datum</span>
                                                <input id='taskWithoutDate' onChange={this.handleInputValueChange}
                                                       type='radio'
                                                       name='taskEventOrDeadline'
                                                       defaultChecked
                                                />
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Body as="label" htmlFor='taskEvent'>
                                                <span className="mr-2">Event</span>
                                                <input id='taskEvent' onChange={this.handleInputValueChange}
                                                       type='radio'
                                                       name='taskEventOrDeadline'
                                                />
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Body as="label" htmlFor='taskDeadline'>
                                                <span className="mr-2">Deadline</span>
                                                <input id='taskDeadline' onChange={this.handleInputValueChange}
                                                       type='radio'
                                                       name='taskEventOrDeadline'/>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                                {this.state.inputValueRadio !== 'taskWithoutDate' ?
                                    <div className="tasks_date mb-3 d-flex">
                                        <Form.Control type='date'/>
                                        <Form.Control type='time'/>
                                    </div> : ''}

                                {this.state.inputValueTaskName ? <Button variant="success" type="submit"
                                                                         data-test={this.state.inputValueTaskName.length}>Task
                                    hinzufügen</Button> : ''}
                            </form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

export default AddNewTaskForm;
