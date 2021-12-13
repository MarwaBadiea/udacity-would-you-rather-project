import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { GoCheck } from "react-icons/go"
import { Card, Image, ProgressBar, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


class AnsweredQ extends React.Component {
    render() {
        const { author, authedUser, question, totalVotes, optionOnePercent, optionTwoPercent, optionOneVotes, optionTwoVotes } = this.props

        if (!question) {
            return <Navigate to={'/notfound'}/>
        }
        return (
            <Card style={{width: '400px', margin: '0 auto'}}>
                <div className='d-flex' style={{backgroundColor: '#E7EAED'}} >
                <Image style={{width: '60px'}} roundedCircle src={author.avatarURL} />
                <Card.Header as="h5" style={{backgroundColor: 'transparent'}}>Asked by {author.name}</Card.Header>
                </div>
                <Card.Body>
                    <Card.Title>Would You Rather</Card.Title>
                    <Card.Text>
                        {question.optionOne.text}
                        {question.optionOne.votes.includes(authedUser) ? <GoCheck /> : null}
                        <ProgressBar now={optionOnePercent} label={`${optionOnePercent}%`} />
                        <p>{optionOneVotes} votes of {totalVotes} votes</p>
                    </Card.Text>

                    <Card.Text>
                        {question.optionTwo.text}
                        {question.optionTwo.votes.includes(authedUser) ? <GoCheck /> : null}
                        <ProgressBar now={optionTwoPercent} label={`${optionTwoPercent}%`} />
                        <p>{optionTwoVotes} votes of {totalVotes} votes</p>
                    </Card.Text>
                    <Link to='/dashboard'>
                        <Button variant="outline-success">Back to Dashboard</Button>
                    </Link>
                    
                </Card.Body>
            </Card>
        );
    }
}

function mapStateToProps({ users, authedUser, questions }, { id }) {
    const question = questions[id]
    const optionOneVotes = (question.optionOne.votes) ? question.optionOne.votes.length : 0
    const optionTwoVotes = (question.optionTwo.votes) ? question.optionTwo.votes.length : 0
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercent = Math.round((optionOneVotes / totalVotes) * 100)
    const optionTwoPercent = Math.round((optionTwoVotes / totalVotes) * 100)

    return {
        question: question ? question : null,
		author: question ? users[question.author] : null,
		authedUser,
        optionOneVotes,
        optionTwoVotes,
        totalVotes,
        optionOnePercent,
        optionTwoPercent,
    }
}

export default connect(mapStateToProps)(AnsweredQ);