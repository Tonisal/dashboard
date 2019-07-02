import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const MainNavigation = () => {
    return (
        <div>
            <Router>
                <ul className="mainNavigation">
                    <ButtonToolbar>
                        <Button variant="warning" href="/">Home</Button>
                        <Button variant="warning" href="checklist">Check-Listen</Button>
                        <Button variant="warning" href="tasklist">Task-Listen</Button>
                        <Button variant="warning" href="depot">Depot</Button>
                    </ButtonToolbar>
                </ul>
            </Router>
        </div>
    )
}

export default MainNavigation;