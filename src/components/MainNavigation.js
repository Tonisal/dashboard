import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

import {
    BrowserRouter, Link
} from 'react-router-dom';

const MainNavigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <BrowserRouter>
                        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link to="/tasklist">Offene Tasks</Link>
                            <Nav.Link href="/tasklist">Offene Tasks</Nav.Link>
                            <Nav.Link href="/checklist">Checklisten</Nav.Link>
                            <Nav.Link href="/kackundsach">Kack</Nav.Link>
                            <Nav.Link href="/dummy">Dummy</Nav.Link>
                        </Nav>
                    </BrowserRouter>
                </Container>
            </Navbar>
        </div>
    )
}

export default MainNavigation;