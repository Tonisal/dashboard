import React, {Component} from 'react';

import {
    Button,
    InputGroup,
    FormControl,
    ListGroup,
    Container,
    Card
} from "react-bootstrap";
import axios from "axios";

class CheckList extends Component {
    state = {
        listInputValue: '',
        itemInputValue: '',
        listToShow: '',
        lists: [],
    };

    componentDidMount() {
        this.getChecklistsFromServer();
    }

    getChecklistsFromServer = async () => {
        console.log('get');
        const res = await axios.get(`http://localhost:3020/checklists`);
        const data = res.data.lists;
       this.setState({
           lists: data,
           listToShow: data[0].name,
       })
    };

    handleTextInputChange = (e) => {
        const text = e.target.value;
        const target = e.target.getAttribute('data-target');

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
        const target = e.target.getAttribute('data-target');

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
            console.log('hi');
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
                    lists[i].items = lists[i].items.filter(listItem => listItem.itemName !== itemToDelete);
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
            <li className="position-relative mr-3" key={list.name}>
                <form onSubmit={this.handleFormSubmit} data-target="selectList" list={list.name}>
                    <Button variant="primary" type="submit">{list.name}</Button>
                </form>
                <form onSubmit={this.handleFormSubmit} data-target="deleteList" list={list.name}>
                    <button className="checklist__delete-list-button" type="submit">
                        X
                    </button>
                </form>
            </li>
        );

        if (!lists.length) {
            listsmarkup = <li><h2 className="mb-0 text-center">Keine Listen vorhanden</h2></li>;
        }


        //Show all items of a list

        for (let i = 0; i < lists.length; i++) {
            if (lists[i].name === listToShow) {
                itemsToShow = lists[i].items;
            }
        }

        let checklistmarkup = itemsToShow.map(item =>
            <ListGroup.Item key={item.itemName} className="checklist__item">
                <input id={item.itemName} item={item.itemName} type="checkbox" onChange={this.handleCheckboxInputChange}
                       checked={item.checked}/>
                <label htmlFor={item.itemName}>{item.itemName}</label>
                <form item={item.itemName} data-target="deleteItem" onSubmit={this.handleFormSubmit}>
                    <Button variant="secondary" type="submit">Löschen</Button>
                </form>
            </ListGroup.Item>
        );

        return (
            <Container className="checklist pt-5">
                <Card className="checklist__addList mb-5">
                    <Card.Header className="text-center">Checklisten - Übersicht</Card.Header>
                    <Card.Body>
                        <form onSubmit={this.handleFormSubmit} data-target="addList">
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Füge Liste hinzu" type="text"
                                             onChange={this.handleTextInputChange}
                                             data-target="listInputValue"
                                             value={this.state.listInputValue}/>
                                <InputGroup.Append>
                                    <Button variant="success" type="submit">Button</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </form>
                        <ul className="checklist__showLists mb-0">
                            {listsmarkup}
                        </ul>
                    </Card.Body>
                </Card>
                <div className="d-flex mb-3">
                    <form onSubmit={this.uncheckAllCheckboxes}>
                        <Button className="mr-3" variant="danger">Alles abwählen</Button>
                    </form>

                    <div className="checklist__addItem flex-grow-1">
                        <form data-target="addItem" onSubmit={this.handleFormSubmit}>
                            <InputGroup>
                                <FormControl placeholder="Füge Item hinzu" type="text" data-target="itemInputValue"
                                             onChange={this.handleTextInputChange}
                                             value={this.state.itemInputValue}
                                />
                                <InputGroup.Append>
                                    <Button variant="success" type="submit">Button</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </form>
                    </div>
                </div>
                <ListGroup>
                    {checklistmarkup}
                </ListGroup>
            </Container>
        )
    }
}

export default CheckList;