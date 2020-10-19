import React from 'react';

import './css/style.scss';

import Tasks from "./components/TaskList/Tasks";
import CheckList from './components/CheckList';
import MainNavigation from "./components/MainNavigation";
import Dummy from "./components/Dummy";

import {
    BrowserRouter, Route, Switch
} from 'react-router-dom';
import Kackundsach from "./components/Kackundsach";

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
                                <Tasks/>
                            </Route>
                            <Route path="/kackundsach">
                                <Kackundsach/>
                            </Route>
                            <Route path="/dummy">
                                <Dummy/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
