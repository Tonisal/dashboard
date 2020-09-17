import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';

class CheckList extends Component {
    state = {
        listInputValue: '',
        itemInputValue: '',
        listToShow: '',
        lists: [],
    };

    componentDidUpdate() {
        const listsToLocalStorage = JSON.stringify(this.state.lists);
        localStorage.setItem('lists', listsToLocalStorage);
    }

    componentDidMount() {
        if (localStorage.lists) {
            const listsFromLocalStorage = JSON.parse(localStorage.lists);
            this.setState({lists: listsFromLocalStorage});
        }
    }

    handleTextInputChange = (e) => {
        const text = e.target.value;
        const target = e.target.getAttribute('target');

        this.setState({
            [target]: text,
        });
    };

    handleCheckboxInputChange = (e) => {
        const lists = this.state.lists;
        const list = this.state.listToShow;
        const item = e.target.getAttribute('item');
        const itemStatus = e.target.checked;

        for (let i = 0; i < lists.length; i++) {
            if (lists[i].name === list) {
                for (let ii = 0; ii < lists[i].items.length; ii++) {
                    if (lists[i].items[ii].itemName === item) {
                        lists[i].items[ii].checked = itemStatus;
                    }
                }
            }
        }

        this.setState({
            lists: lists,
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('target');

        // Submit new List
        if (target === 'addList') {

            // Check if list does already exists
            let listToAdd = this.state.listInputValue;
            let existinglists = this.state.lists;

            for (let i = 0; i < existinglists.length; i++) {
                if (existinglists[i].name === listToAdd) {
                    return;
                }
            }

            listToAdd = {
                name: listToAdd,
                items: [],
            }

            existinglists.push(listToAdd);

            this.setState({
                lists: existinglists,
                listInputValue: '',

            });
        }

        // Select existing list to show items
        else if (target === 'selectList') {
            let listToShow = e.target.getAttribute('list');
            this.setState({
                listToShow: listToShow,
            });
        }

        // Add item to list
        else if (target === 'addItem') {
            const lists = this.state.lists;
            const currentList = this.state.listToShow;
            let itemToAdd = {
                itemName: this.state.itemInputValue,
                checked: false
            };

            for (let i = 0; i < lists.length; i++) {
                if (lists[i].name === currentList) {
                    lists[i].items.push(itemToAdd);
                }
            }

            this.setState({
                lists: lists,
                itemInputValue: ''
            })
        }

        // Delete Item from List which is currently shown
        else if (target === 'deleteItem') {
            const lists = this.state.lists;
            const currentList = this.state.listToShow;
            const itemToDelete = e.target.getAttribute('item');

            for (let i = 0; i < lists.length; i++) {
                if (lists[i].name === currentList) {
                    for (let ii = 0; ii < lists[i].items.length; ii++) {
                        if (lists[i].items[ii].itemName === itemToDelete) {
                            lists[i].items.splice([ii], 1);
                        }
                    }
                }
            }

            this.setState({
                lists: lists,
            });
        }

        // Delete List
        else if (target === 'deleteList') {
            const lists = this.state.lists;
            const listToDelete = e.target.getAttribute('list');

            for (let i = 0; i < lists.length; i++) {
                if (lists[i].name === listToDelete) {
                    lists.splice([i], 1);
                }
            }

            this.setState({
                lists: lists,
            });
        }
    };

    render() {
        let lists = this.state.lists;
        let listToShow = this.state.listToShow;
        let itemsToShow = [];

        // Show all existing Lists
        let listsmarkup = lists.map(list =>
            <li key={list.name}>
                <form onSubmit={this.handleFormSubmit} target="selectList" list={list.name}>
                    <Button variant="primary mr-2" type="submit">{list.name}</Button>
                </form>
                <form onSubmit={this.handleFormSubmit} target="deleteList" list={list.name}>
                    <button type="submit">Löschen</button>
                </form>
            </li>
        );


        //Show all items of a list

        for (let i = 0; i < lists.length; i++) {
            if (lists[i].name === listToShow) {
                itemsToShow = lists[i].items;
            }
        }

        let checklistmarkup = itemsToShow.map(item =>
            <ListGroup.Item key={item.itemName} className="checklist__item">
                <input id={item.itemName} item={item.itemName} type="checkbox" onChange={this.handleCheckboxInputChange} checked={item.checked}/>
                <label htmlFor={item.itemName}>{item.itemName}</label>
                <form item={item.itemName} target="deleteItem" onSubmit={this.handleFormSubmit}>
                    <Button variant="secondary" type="submit">Löschen</Button>
                </form>
            </ListGroup.Item>
        );

        return (
            <div className="checklist">
                <div className="checklist__addList mb-5">
                    <form onSubmit={this.handleFormSubmit} target="addList">
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Füge Liste hinzu" type="text"
                                         onChange={this.handleTextInputChange}
                                         target="listInputValue"
                                         value={this.state.listInputValue}/>
                            <InputGroup.Append>
                                <Button variant="success" type="submit">Button</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                    <ul className="checklist__showLists">
                        {listsmarkup}
                    </ul>
                </div>
                <form onSubmit={this.uncheckAllCheckboxes}>
                <Button variant="danger">Alles abwählen</Button>
                </form>
                <div className="checklist__addItem">
                    <form target="addItem" onSubmit={this.handleFormSubmit}>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Füge Item hinzu" type="text" target="itemInputValue"
                                         onChange={this.handleTextInputChange}
                                         value={this.state.itemInputValue}
                            />
                            <InputGroup.Append>
                                <Button variant="success" type="submit">Button</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </div>
                <ListGroup>
                    {checklistmarkup}
                </ListGroup>
            </div>
        )
    }
}

export default CheckList;