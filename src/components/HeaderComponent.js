import React from "react";
import { Component } from "react/cjs/react.production.min";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Nav, Button, Modal, ModalHeader,
     ModalBody, Form, FormGroup, Input, Label } from "reactstrap";
import { NavLink } from 'react-router-dom';

class Header extends Component {
    //we want to navbar to be responsive. add a couple of items to its state to help w/the navbar toggler
    //1st set up a constructor
    constructor(props){
        super(props);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        //bind the event handler to the component. It ensures that when toggleNav is called, 'this' keyword
        //inside it refers correctly to the component
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    //2nd set up a method that will handle when the navbar toggler button is clicked
    toggleNav () {
        this.setState({
            isNavOpen: !this.state.isNavOpen 
        });
    }

    toggleModal () {
        this.setState({
            isModalOpen: !this.state.isModalOpen 
        });
    }

    handleLogin(event) {
        alert(`Username: ${this.username.value} Password: ${this.password.value}
        Remeber: ${this.remember.checked}`);
        this.toggleModal();
        //prevents entire page from being rendered
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>Nucamp</h1>
                                <h2>A better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/"><img src="/assets/images/logo.png"
                    height="30" width="30" alt="NuCamp Logo" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar> 
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <i className="fa fa-home fa-lg" /> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/directory">
                                        <i className="fa fa-list fa-lg" /> Directory
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <i className="fa fa-info fa-lg" /> About
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <i className="fa fa-address-card fa-lg" /> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <span className="navbar-text ml-auto">
                                <Button outline onClick={this.toggleModal}>
                                    <i className="fa fa-sign-in fa-lg" /> Login
                                </Button>
                            </span>
                    </Collapse>
                </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" 
                                    //this passes the value of the input field with an callback function
                                    innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="text" id="password" name="password" 
                                     innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="checkbox"  name="remember" 
                                     innerRef={input => this.remember = input} /> Remember me
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header;