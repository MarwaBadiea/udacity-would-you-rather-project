import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import UnansweredQ from './UnansweredQ';
import AnsweredQ from './AnsweredQ';
import NotFound from './NotFound';


function QuestionDetails (props) {

        const { authedAnswers, questions } = props
    
        const { id } = useParams()
        const question = questions[id]

        if (question === null) {
            return <NotFound />
        }
        
        const answered = authedAnswers.hasOwnProperty(id) ? true : false
        console.log(id)

        return (
            <div>
                {answered ? <AnsweredQ id={id}/>
                        : <UnansweredQ id={id}/>}
            </div>
        );
    }

function mapStateToProps ({ users, authedUser } ) {
    const authedAnswers = users[authedUser].answers
    const questions = users[authedUser].questions
    
    return {
        authedAnswers,
        questions
        
    }
} 

export default connect(mapStateToProps)(QuestionDetails);