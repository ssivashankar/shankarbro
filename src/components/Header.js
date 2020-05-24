import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Nav,
    Navbar, 
    NavItem,
    NavDropdown,
    Form,
    FormControl,
    Button,
    LinkContainer
} from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Gajangi Shankar</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink className="nav-link" exact to="/" href="/">Home</NavLink>
                <NavLink className="nav-link" exact to="/access-generator" href="/access-generator">Access Token Generator</NavLink>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
            </Form>
        </Navbar>
    )
}

export default Header
