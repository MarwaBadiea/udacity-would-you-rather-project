import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

import { Form, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { setAuthedUser } from './../actions/authedUser';


function Login1(props) {

    const [userID, setUserID] = useState(null)
    const [home, setHome] = useState(false)

    const navigate = useNavigate()
    const { state } = useLocation()

    const { users, names } = props;

    const handleSelectUser = function(e) {
        e.preventDefault()

        const userID = e.target.value

        setUserID(function(previousState) {
            return {
                ...previousState,
                userID,
            }
            
        });
        console.log(userID)
    }

    /* if(userID !== null) {
        return userID.userID
    } */

    const handleSubmit = function(e) {
        e.preventDefault()

        const { dispatch } = props

        //const userID = e.target.value
        
        dispatch(setAuthedUser(userID.userID))
        
        setHome(function(previousState) {
            return {
                ...previousState,
                home: true
            }
        }); navigate(state?.path || "/dashboard")
        
    }

    const selected = userID ? userID : -1

    return (
        <div>
                <Card style={{width: '400px', margin: '0 auto', textAlign: 'center'}} className='p-3'>
                    <h4>Welcome to Would You Rather Game</h4>
                    <p>Please Login to continue</p>
                    <img src={'react.png'} alt='logo' style={{height: '200px'}}/>
                    <h6>Select Username</h6>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Select 
                            aria-label="Floating label select example" 
                            value={selected}
                            onChange={(e) => handleSelectUser(e)}
                            >
                                <option value='-1' disabled>select user</option>
                                {names.map((user) => (
                                    
                                    <option key={users[user].id} value={users[user].id}>{users[user].name}</option>
                                ))}
                            </Form.Select>
                            <button className='btn-primary m-3' type='submit' >Login</button>
                        </Form>
                </Card>
            </div>
    )

}

function mapStateToProps ({ users }) {
    return {
        names: Object.keys(users),
        users
    }
}

export default connect(mapStateToProps)(Login1)
