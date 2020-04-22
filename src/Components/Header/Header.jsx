import React from 'react';
import logo from '../../assets/logo.svg';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './Header.css';


function Header() {
    return (
        <Navbar>
            <img
                alt="Crop logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top mr-2"
            />
            <h4 className="" href="#0"><u>Image cropper</u></h4>
            <Nav className="ml-auto">
                <Link className="mx-2 text-dark" to="/upload"><Button size="sm" variant="dark" to="/upload">Upload</Button>{' '}</Link>
                <Link className="mx-2 text-dark" to="/results"><Button size="sm" variant="dark" to="/results">Results</Button>{' '}</Link>
            </Nav>
        </Navbar>
    )
}

export default Header