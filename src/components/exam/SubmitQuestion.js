// SUBMIT BUTTON FOR EACH QUESTION

'use client'

import { useState, useEffect } from 'react'
import DisplayAnswer from './DisplayAnswer'

const SubmitQuestion = ({ question }) => {
    const [submitState, setSubmitState] = useState(false)

    // RESET SUBMITSTATE FOR WHEN NEW EXAM MADE, AKA WHEN QUESTION CHANGES
    useEffect(() => {
        setSubmitState(false)
    }, [question])

    return (
        <>
            <button onClick={() => setSubmitState(!submitState)}> {submitState ? 'Reset' : 'Submit'} </button> 
            {submitState ? <DisplayAnswer question={question}/> : null}
        </>
    )
}

export default SubmitQuestion