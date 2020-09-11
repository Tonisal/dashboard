import React from 'react';

import './css/style.scss';

import TaskList from "./components/TaskList/TaskList";
import CheckList from './components/CheckList';
import MainNavigation from "./components/MainNavigation";
import {Container} from "react-bootstrap";

import {
    BrowserRouter, Route, Switch
} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <MainNavigation/>

            <main className="pt-5">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/">
                            </Route>
                            <Route path="/checklist">
                                <CheckList/>
                            </Route>
                            <Route path="/tasklist">
                                <TaskList/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
