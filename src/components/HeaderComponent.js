import React from "react";
import { Component } from "react/cjs/react.production.min";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from "reactstrap";
import { Navlink } from 'react-router-dom';

class Header extends Component {
    //we want to navbar to be responsive. add a couple of items to its state to help w/the navbar toggler
    //1st set up a constructor
    constructor(props){
        super(props);
        //bind the event handler to the component. It ensures that when toggleNav is called, 'this' keyword
        //inside it refers correctly to the component
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }
    //2nd set up a method that will handle when the navbar toggler button is clicked
    toggleNav () {
        this.setState({
            isNavOpen: !this.state.isNavOpen 
        });
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
                    <barToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                           {/* <Nav navbar> */}
                                <NavItem className="nav-link" to="/home">
                                    <i className="fa fa-home fa-lg" /> Home
                                </NavItem>
                                <NavItem className="nav-link" to="/directory">
                                    <i className="fa fa-list fa-lg" /> Directory
                                </NavItem>
                                <NavItem className="nav-link" to="/aboutus">
                                    <i className="fa fa-info fa-lg" /> About
                                </NavItem>
                                <NavItem className="nav-link" to="/contactus">
                                    <i className="fa fa-address-card fa-lg" /> Contact Us
                                </NavItem>

                               {/* </Nav> */}
                    </Collapse>
                </div>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header;