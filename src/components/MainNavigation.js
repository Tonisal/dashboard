import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

const MainNavigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/tasklist">Offene Tasks</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default MainNavigation;
