import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Button, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


class Question extends React.Component {
    render() { 
        const { author, question } = this.props
        
        
        return (
            <Card style={{width: '400px', margin: '0 auto'}}>
                <div className='d-flex' style={{backgroundColor: '#E7EAED'}} >
                <Image style={{width: '60px'}} roundedCircle src={author.avatarURL} />
                <Card.Header as="h5" style={{backgroundColor: 'transparent'}}>{author.name} Asks</Card.Header>
                </div>
                <Card.Body>
                    <Card.Title>Would You Rather</Card.Title>
                    <Card.Text>
                        {question.optionOne.text}...
                    </Card.Text>
                    <Link to={`/questions/${question.id}`}>
						<Button variant="outline-dark">View Poll</Button>
					</Link>
                </Card.Body>
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

export default connect(mapStateToProps)(Question);