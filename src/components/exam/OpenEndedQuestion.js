// OPEN ENDED QUESTION COMPONENT

'use client'

import { useState, useEffect } from 'react'
import DisplayAnswer from './DisplayAnswer'

const OpenEndedQuestion = ({ question }) => {
    const [submitState, setSubmitState] = useState(false)

    // RESET SUBMITSTATE FOR WHEN NEW EXAM MADE, AKA WHEN QUESTION CHANGES
    useEffect(() => {
        setSubmitState(false)
    }, [question])

    const handleSubmit = () => {
        setSubmitState(!submitState)
    }
    return (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-white text-xl font-semibold mb-4">
                {question.question}
                {submitState && '☑️'}
            </h4>
            <textarea
                placeholder="Type your answer here..."
                className="w-full p-4 bg-zinc-900 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-primary resize-none"
                rows="4"
            />
            <button
                onClick={handleSubmit}
                className={`mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors ${submitState ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
                {submitState ? 'Reset' : 'Submit'}
            </button>
            {submitState && (
                <div className={`mt-4 text-lg text-white`}>
                    <DisplayAnswer question={question}/>
                </div>
            )}
        </div>
    )
}

export default OpenEndedQuestion