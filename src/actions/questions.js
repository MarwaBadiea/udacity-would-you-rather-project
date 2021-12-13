import { saveQuestion, saveQuestionAnswer } from './../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';


export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion (formattedQuestion) {
    return {
        type: ADD_QUESTION,
        payload: { formattedQuestion }
    }
}

export function answerQuestion ({authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        info: {
            authedUser,
            qid,
            answer,
        }
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((formattedQuestion) => dispatch(addQuestion(formattedQuestion)))
    }
}

/* export function handleAnswerQuestion (info) {
    return (dispatch) => {
        dispatch(answerQuestion(info))
        return saveQuestionAnswer(info)
        .then(() => console.log('answer saved'))
        .catch((error) => {
            console.log('error in saving answer')
        })
    }

} */

export function handleAnswerQuestion (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        return saveQuestionAnswer({
            qid,
            answer,
            authedUser,
        })
        .then(() => dispatch(answerQuestion({ qid, answer, authedUser })))
    }
}