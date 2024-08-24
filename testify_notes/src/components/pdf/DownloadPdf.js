'use client'

// DownloadPdf.jsx
import React, { useEffect, useState } from 'react'
import ExamPdf from './ExamPdf'
import html2pdf from 'html2pdf.js'


const DownloadPdf = ({ questions }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        // This ensures the component only runs on the client side
        setIsClient(true)
    }, [])

    if (!questions || !isClient) {
        return null
    }

    const handleDownload = () => {
        const element = document.getElementById('exam-pdf-content')
        const options = {
            margin: 1,
            filename: 'practice_exam.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        
        html2pdf().from(element).set(options).save()
    }

    const handleView = () => {
        const element = document.getElementById('exam-pdf-content')
        if (!element) return

        const options = {
            margin: 1,
            filename: 'practice_exam.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }

        html2pdf().from(element).set(options).output('blob').then((pdfBlob) => {
            const pdfUrl = URL.createObjectURL(pdfBlob)
            window.open(pdfUrl, '_blank')
        })
    }

    return (
        <div className="flex flex-col items-center space-x-4">
            <div style={{ display: 'none' }}>
                <ExamPdf exam={questions} />
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={handleDownload}
                    className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                >
                    Download PDF
                </button>
                <button
                    onClick={handleView}
                    className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                >
                    View PDF
                </button>
            </div>
        </div>
    )

}

export default DownloadPdf
