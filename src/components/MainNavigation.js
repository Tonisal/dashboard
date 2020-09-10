import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Nav, Navbar, Container} from 'react-bootstrap';

const MainNavigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/tasklist">Tasklist</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default MainNavigation;
