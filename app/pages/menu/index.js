'use strict';

import React from 'react';
import {History, Link} from 'react-router'
import {Navbar, NavBrand, Nav, NavItem, Button, Collapse, Well, Glyphicon, Col} from 'react-bootstrap';

export default React.createClass({

    displayName: 'app/pages/menu/index.js',

    mixins: [History],

    getInitialState(){
        return {
            open: false,
            activeItem: 1
        }
    },

    handleSelect(selectedKey, href) {
        this.setState(
            {
                open: false,
                activeItem: selectedKey
            }
        );
        this.history.pushState(null, href);
    },

    toggleMenu(){
        this.setState({open: !this.state.open})
    },

    renderMenu(){

        return (
            <div>
                <Navbar fixedTop fluid>

                    <Nav fixedTop navbar>
                        <Button className="menu-burger"
                                onClick={this.toggleMenu}>
                            <Glyphicon glyph="glyphicon glyphicon-menu-hamburger"/>
                        </Button>
                    </Nav>

                    <NavBrand right>
                        <Link to="/"> <img height="33" src="images/acando_logo_572.png" alt="acando.no"/></Link>
                    </NavBrand>

                    <div className="menu-well">
                        <Collapse in={this.state.open}>
                            <div>
                                <Nav
                                    bsStyle="pills"
                                    stacked
                                    activeKey={this.state.activeItem}
                                    onSelect={this.handleSelect}>

                                    <NavItem eventKey={1} href={'/'}>
                                        Hjem
                                    </NavItem>

                                    <NavItem eventKey={2} href={'/simpleget'}>
                                        Enkel GET med SuperAgent
                                    </NavItem>

                                    <NavItem eventKey={3} href={'/knettfeed'}>
                                        knett.evita.no/feed - cookie
                                    </NavItem>

                                    <NavItem eventKey={4} href={'/knettfeedtaketwo'}>
                                        knett.evita.no/feed - brukernavn/passord
                                    </NavItem>

                                    <NavItem eventKey={5} href={'/googlelogin'}>
                                        Login med Google-konto
                                    </NavItem>
                                </Nav>
                            </div>
                        </Collapse>
                    </div>
                </Navbar>

            </div>

        )
    },

    render() {
        return (
            <div>
                {this.renderMenu()}

            </div>
        )
    }
});