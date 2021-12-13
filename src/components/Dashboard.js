import React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Question from './Question';
import NotFound from './NotFound';


class Dashboard extends React.Component {
    render() { 
        console.log(this.props)

        const { unanswered, answered, authedUser, users, questions } = this.props

        console.log(users)
        console.log(authedUser)
        console.log(questions)

        return (
            <div className='dashboard'>
                {authedUser ? (
                <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="unanswered" title="Unanswered Questions">
                        <div>
                            {unanswered.map((id) => <Question key={id} id={id} /> )}
                            
                        </div>
                    </Tab>
                    <Tab eventKey="answered" title="Answered Questions">
                    {answered.map((id) => <Question key={id} id={id} /> )}
                    </Tab>
                    
                </Tabs>) : (
                    <NotFound />
                )}
                
            </div>
        );
    }
}

function mapStateToProps ({ questions, authedUser, users}) {
    const unanswered = Object.keys(questions)
        .filter((id) => !users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

        const answered = Object.keys(questions)
        .filter((id) => users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    
    return {
        user: users[authedUser],
        authedUser,
        unanswered,
        answered,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Dashboard);