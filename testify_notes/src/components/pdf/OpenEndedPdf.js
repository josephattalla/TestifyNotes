// OPEN ENDED DISPLAY FOR PDF

const OpenEndedPdf = ({ question, index }) => {
    if (!question) {
        return null
    }

    return (
        <div className="flex mb-4 pb-60">
            <h4 className="text-lg font-medium mr-2 flex-shrink-0">{index}.</h4>
            <p className="text-lg font-medium">{question.question}</p>
        </div>
    )
}

export default OpenEndedPdf;
