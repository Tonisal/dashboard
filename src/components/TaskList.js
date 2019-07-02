import React, {Component} from 'react';

class TaskList extends Component {
    state = {
        inputValueTaskName: '',
        inputValueNotes: '',
        inputValueRadio: 'taskEvent',
        tasks: [],
    }

    /*Get Saved tasks from localStorage after reload/visit */
    componentDidMount() {
        if(localStorage.tasks) {
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
        let tasksMarkup = tasks.map(task =>
            <tr key={task.taskName}>
                <td><input taskattr='taskName' task={task.taskName} defaultValue={task.taskName} onChange={this.changeTask}/></td>
                <td><input taskattr='taskNotes' task={task.taskName} defaultValue={task.taskNotes} onChange={this.changeTask}/></td>
                <td>{task.taskType}</td>
                <td>
                    <form task={task.taskName} onSubmit={this.deleteTaskFromList}>
                        <button type='submit'>Lösche Task</button>
                    </form>
                </td>
            </tr>
        );

        return (
            <div className="tasks">
                <h2>Task-Liste</h2>
                <form className='addTask' onSubmit={this.addingTaskToList}>
                    <div>
                        <input value={this.state.inputValueTaskName} id='taskName' type='text' onChange={this.handleInputValueChange}
                               placeholder="Taskzusammenfassung" required/>
                        <label htmlFor='taskEvent'>Event</label>
                        <input id='taskEvent' onChange={this.handleInputValueChange} type='radio'
                               name='taskEventOrDeadline'
                               checked/>
                        <label htmlFor='taskDeadline'>Deadline</label>
                        <input id='taskDeadline' onChange={this.handleInputValueChange} type='radio'
                               name='taskEventOrDeadline'/>
                        <label htmlFor='taskWithoutDate'>Ohne Datum</label>
                        <input id='taskWithoutDate' onChange={this.handleInputValueChange} type='radio'
                               name='taskEventOrDeadline'/>
                    </div>
                    <div className="tasks_date">
                        <input type='date'/>
                        <input type='time'/>
                    </div>
                    <textarea id='taskNotes' value={this.state.inputValueNotes} onChange={this.handleInputValueChange} placeholder='Zusammenfassung'/>
                    <button type="submit">Task hinzufügen</button>
                </form>
                <table>
                    <tbody>
                    {tasksMarkup}
                    </tbody>
                </table>
            </div>
        )
    };
}

export default TaskList;