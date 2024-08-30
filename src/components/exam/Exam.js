// DISPLAY EXAM QUESTIONS

'use client'

import questions from '@/app/data/questions'
import DisplayQuestion from './DisplayQuestion'
import DownloadPdf from '../pdf/DownloadPdf'

const Exam = ({ exam }) => {
    console.log("Exam parameter: ", exam)
    // const questions = exam ? exam : null
    if (!questions) {
        return null
    }
    return (
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-full max-w-screen-2xl mx-auto">
            <h1 className='text-white text-4xl lg:text-6xl font-bold text-center mb-6'>
                Exam
            </h1>
            <DownloadPdf questions={questions} />
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <DisplayQuestion key={index} question={question} />
                ))}
            </div>
        </div>
    )
}

export default Exam