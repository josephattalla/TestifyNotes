// DISPLAY ANSWER & EXPLANATION AFTER SUBMISSION

const DisplayAnswer = ({ question }) => {
    let correctAnswer = 'Correct answer: None'
    let explanation = 'Explanation: None'
    if (question.answer) {
        correctAnswer = 'Correct answer: ' + question.answer
    }
    if (question.explanation) {
        explanation = 'Explanation: ' + question.explanation
    }
    return (
        <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
            <p className="text-green-400 font-semibold mb-2">{correctAnswer}</p>
            <p className="text-gray-300">{explanation}</p>
        </div>
    )
}

export default DisplayAnswer