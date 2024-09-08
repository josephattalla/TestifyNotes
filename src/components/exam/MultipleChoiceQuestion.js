'use client'

import { useState, useEffect } from 'react'
import DisplayAnswer from './DisplayAnswer'

const MultipleChoiceQuestion = ({ question }) => {
    const [submitState, setSubmitState] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [correctEmoji, setCorrectEmoji] = useState(null)

    // Reset when question changes
    useEffect(() => {
        setSubmitState(false)
        setSelectedOption(null)
        setCorrectEmoji(null)
    }, [question])

    const handleSubmit = (event) => {
        setSubmitState(!submitState)

        if (submitState) {
            setCorrectEmoji(null)
            setSelectedOption(null)
        } else {
            setCorrectEmoji(selectedOption === question.answer ? '✅' : '❌')
        }
    }

    return (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-white text-xl font-semibold mb-4">
                {question.question}
                {correctEmoji}
            </h4>
            <div className="space-y-2 mb-4">
                {question.choices.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type='radio'
                            id={`choice-${index}`}
                            name={question.question}
                            value={choice}
                            disabled={submitState && selectedOption !== choice}
                            checked = {selectedOption === choice}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="h-4 w-4 text-primary bg-zinc-700 border-gray-600 focus:ring-primary"
                        />
                        <label htmlFor={`choice-${index}`} className="text-white text-lg">
                            {choice}
                        </label>
                    </div>
                ))}
            </div>
            <button 
                onClick={handleSubmit} 
                className={`bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors ${submitState ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
                {submitState ? 'Reset' : 'Submit'}
            </button>
            {submitState && (
                <div className={`mt-4 text-lg`}>
                    <DisplayAnswer question={question}/>
                </div>
            )}
        </div>
    )
}

export default MultipleChoiceQuestion
