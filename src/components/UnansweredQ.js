import React from 'react';
import { connect } from 'react-redux';

import { Form, Card, Button, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { handleAnswerQuestion } from '../actions/questions';
import NotFound from './NotFound';


class UnansweredQ extends React.Component {
    

    handleAnswer = (e, id) => {
        e.preventDefault()

        const { dispatch } = this.props
        const answer = this.form.answer.value

        if (answer) {
            dispatch(handleAnswerQuestion(id, answer))
        } 
    }

    
    render() { 
        const { author, question } = this.props

        if (!question) {
            return <NotFound />
        }

        return (
            <Card style={{width: '400px', margin: '0 auto', textAlign: 'center'}}>
                
                <Card.Header className='d-flex' style={{backgroundColor: '#E7EAED'}} >
                    <Image style={{width: '60px', backgroundColor: 'transparent'}} roundedCircle src={author.avatarURL} />
                    <Card.Header as="h5" style={{backgroundColor: 'transparent'}}>{author.name} Asks</Card.Header>
                </Card.Header>
                <Card.Title>Would You Rather...</Card.Title>
                <Form onSubmit={(e) => this.handleAnswer(e, question.id)} ref={(fun) => (this.form = fun)}>
                <Form.Group className="mb-3">
                    <Form.Check
                    type="radio"
                    label={question.optionOne.text}
                    name="answer"
                    value='optionOne'
                    id={question.id}
                    />
                    <Form.Check
                    type="radio"
                    label={question.optionTwo.text}
                    name="answer"
                    value='optionTwo'
                    id={question.id}
                    />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        
                        <Button type="submit">Submit Answer</Button>
                    
                    </Form.Group>
                </Form>
                </Card>
        );
    }
}

function mapStateToProps ({ questions, users, authedUser }, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null

    return {
        question,
        author,
        authedUser
    }
}

export default connect(mapStateToProps)(UnansweredQ);