import DisplayQuestionPdf from './DisplayQuestionPdf'

const ExamPdf = ({ exam }) => {
    // exam = questions

    if (!exam) {
        return null
    }

    return (
        <div id='exam-pdf-content' className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">Practice Exam</h1>
                {exam.map((question, index) => (
                        <DisplayQuestionPdf question={question} index={index + 1} key={index}/>
                ))}
    
            <div className="space-y-4">
                <hr className="my-6 border-gray-300" id="answers"/>
                <h2 className="text-2xl font-semibold mb-4">Answer Key</h2>
                {exam.map((question, index) => (
                    <div key={index} className="mb-4 flex">
                        <span className="mr-2">{index + 1}.</span>
                        <div>
                            <p className="text-gray-700">Answer: {question.answer ? question.answer : 'None'}</p>
                            <p className="text-gray-700">Explanation: {question.explanation ? question.explanation : 'None'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExamPdf