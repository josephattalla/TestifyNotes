import MultipleChoicePdf from './MultipleChoicePdf'
import OpenEndedPdf from './OpenEndedPdf'

const DisplayQuestionPdf = ({ question, index }) => {
    if (!question) {
        return null
    }

    return (
        <div>
            {question.format === 'open ended' && <OpenEndedPdf question={question} index={index} />}
            {question.format === 'multiple choice' || question.format === 'true or false' && <MultipleChoicePdf question={question} index={index} />}
        </div>
    )
}

export default DisplayQuestionPdf
