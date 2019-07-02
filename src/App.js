import React from 'react';

import './css/dst/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import TaskList from "./components/TaskList";
import CheckList from './components/CheckList';
import MainNavigation from "./components/MainNavigation";

import {
    BrowserRouter, Route, Switch
} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Markus Dashboard</h1>
            </header>
            <main>
                <BrowserRouter>
                    <MainNavigation />
                    <Switch>
                        <Route exact path="/" component={TaskList}/>
                        <Route path="/checklist" component={CheckList}/>
                    </Switch>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
