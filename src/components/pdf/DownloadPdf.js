// PRACTIVE EXAM PDF DOWNLOAD BUTTON

'use client'

import { useState } from 'react'
import ExamPdf from './ExamPdf'

const DownloadPdf = ({ exam }) => {
    const [loading, setLoading] = useState(false)

    if (!exam) {
        return null
    }

    const options = {
        margin: 1,
        filename: 'practice_exam.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all'] }
    }

    // GENERATE PDF & OPEN IN NEW TAB
    const handleView = async () => {
        setLoading(true)
        try {
            const html2pdf = (await import('html2pdf.js')).default
            const element = document.getElementById('exam-pdf-content')
            if (!element) return

            html2pdf().from(element).set(options).output('blob').then((pdfBlob) => {
                const pdfUrl = URL.createObjectURL(pdfBlob)
                window.open(pdfUrl, '_blank')
                setLoading(false)
            }).catch(error => {
                console.error('Error generating PDF:', error)
                alert('Error generating PDF')
                setLoading(false)
            })
        } catch (error) {
            console.error('Error importing html2pdf.js:', error)
            alert('Error generating PDF')
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <div style={{ display: 'none' }}>
                <ExamPdf exam={exam} id="exam-pdf-content" />
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={handleView}
                    className="bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Generating PDF...' : 'Exam PDF'}
                </button>
            </div>
        </div>
    )
}

export default DownloadPdf

