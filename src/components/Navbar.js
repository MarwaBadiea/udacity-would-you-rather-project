import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Navbar, Nav, Container, Form, Button, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { resetAuthedUser } from '../actions/authedUser'


class NavBar extends React.Component {

	handleSubmit = () => {

        const { dispatch } = this.props;

		dispatch(resetAuthedUser());
	}; 

    render() { 
        const { user, authedUser } = this.props
        
        return (

            <div>
                {authedUser ? (
                    <Navbar bg="light" expand="lg" className='mb-3'>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to='/dashboard'>Dashboard</Nav.Link>
                            <Nav.Link as={NavLink} to='/add'>New Question</Nav.Link>
                            <Nav.Link as={NavLink} to='/leaderboard'>Leaderboard</Nav.Link>
                            
                        </Nav>
                        
                        <Form className="d-flex">
                            <Image src={user ? user.avatarURL : 'react.png'} alt='logo' style={{width: '60px'}} roundedCircle/>
                            <span style={{alignSelf: 'center', display: 'inline-block'}} >{ user ? user.name : ''}</span>
                            <Link to='/'>
                                <Button variant="outline-success" onClick={this.handleSubmit}>LogOut</Button>
                            </Link>
                        </Form>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                ) : (
                    <Navbar bg="light" expand="lg" className='mb-3'>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        
                    </Nav>
                    
                    <Form className="d-flex">
                    <Link to='/'>
                        <Button variant="outline-success">Login</Button>
                    </Link>
                    </Form>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                )}
            </div>

            
        );
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        user: users[authedUser],
        authedUser,
    }
}

export default connect(mapStateToProps)(NavBar);