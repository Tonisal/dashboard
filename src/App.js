import React from 'react';

import './css/style.scss';

import Tasks from "./components/TaskList/Tasks";
import CheckList from './components/CheckList';
import MainNavigation from "./components/MainNavigation";

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
                                <Tasks/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
