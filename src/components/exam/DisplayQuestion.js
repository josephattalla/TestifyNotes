// DISPLAY QUESTION

import OpenEndedQuestion from "./OpenEndedQuestion"
import MultipleChoiceQuestion from "./MultipleChoiceQuestion"

const DisplayQuestion = ({ question }) => {
    if (!question) {
        return null
    }
    switch (question.format) {
        case 'open ended':
            return <OpenEndedQuestion question={question} />
        case 'multiple choice':
            return <MultipleChoiceQuestion question={question} />
        default:
            return null
    }
}

export default DisplayQuestion