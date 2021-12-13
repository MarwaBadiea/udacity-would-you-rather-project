import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';

import { Form, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { handleAddQuestion } from '../actions/questions';


class NewQuestion extends React.Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        redirectToDashboard: false,
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        const { optionOneText, optionTwoText } = this.state

        dispatch(handleAddQuestion( optionOneText, optionTwoText))
        .then(() => this.setState(() => ({ 
            optionOneText: '',
            optionTwoText: '',
            redirectToDashboard: true })))
    }

    render() {
        const { redirectToDashboard } = this.state

        if (redirectToDashboard === true) {
            return <Navigate to={'/dashboard'}/>
        }
        
        return (
            <Card style={{width: '400px', margin: '0 auto', textAlign: 'center'}}>
                <Card.Header as="h5" style={{backgroundColor: 'transparent'}}>Create New Question</Card.Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="optionOneText">
                        
                        <Form.Label>Would You Rather...</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter Option one text" 
                        className='m-2' 
                        style={{width: '350px'}}
                        onChange={this.handleChange}
                        name='optionOneText'
                        value={this.state.optionOneText}/>
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="optionTwoText">
                        <Form.Control 
                        type="text" 
                        placeholder="Enter Option two text" 
                        className='m-2' 
                        style={{width: '350px'}}
                        onChange={this.handleChange}
                        name='optionTwoText'
                        value={this.state.optionTwoText}/>
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        );
    }
}


export default connect()(NewQuestion);