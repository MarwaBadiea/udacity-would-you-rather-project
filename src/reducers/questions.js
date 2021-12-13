import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from './../actions/questions';

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions,
            }

        case ADD_QUESTION :
            {
                const { formattedQuestion } = action.payload;
    
                return {
                    ...state,
                    [formattedQuestion.id]: formattedQuestion,
                };
            }

        case ANSWER_QUESTION :
            const { qid, answer, authedUser } = action.info;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])

                    }
                }
            }
            
        default :
            return state
    }
}

