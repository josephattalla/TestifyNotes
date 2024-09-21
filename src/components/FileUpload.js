// FILE UPLOAD AND EXTRACT TEXT FROM PDF

'use client'

import { useState } from 'react'
import pdfToText from "react-pdftotext"
import llmService from '@/services/llm'
import Exam from './exam/Exam'

export default function FileUpload() {

	const maxMb = 50
	const maxChars = (20000 * 4) / 10
	const MAX_FILE_SIZE = maxMb * 1024 * 1024	// 50mb

	const [file, setFile] = useState(null)  
	const [exam, setExam] = useState(null)
	const [loading, setLoading] = useState(false)

	// SET STATE OF FILE UPLOAD
	const onFileInput = (event) => {
		let selectedFile = event.target.files[0]
		
		if (!selectedFile) {
			setFile(null)
			return
		}
		
		// prevent large files		
		if (selectedFile.size > MAX_FILE_SIZE) {
			event.target.value = ''	
			alert(`File can be at most ${maxMb}mb.`)
			selectedFile = null
		}
		setFile(selectedFile ? selectedFile : null)
	}

	// CREATE EXAM
	const onFileUpload = async (event) => {
		event.preventDefault()
		setLoading(true)
		if (!file) {
			alert('Must upload file first.')
			setLoading(false)
			return
		}
		// EXTRACT TEXT FROM UPLOADED FILE
		let output = ''
		try {
			output = await pdfToText(file)	
		} catch (error) {
			setLoading(false)
			alert('Error extracting text from PDF. Try adding a text layer to the pdf using OCR.')
			return
		}

		// RESET FILE INPUT
		document.getElementById('fileInput').value = ''
		setFile(null)
		const message = {
			prompt: output
		}
		console.log('PDF Text:', output)

		// CHECK IF TEXT WAS EXTRACTED
		if (!output || output === '') {
			setLoading(false)
			alert('Error extracting text from PDF. Try adding a text layer to the pdf using OCR.')
			return
		}

		// REMOVE WHITESPACE 
		output = output.replace(/\s+/g, '')

		if (output.length > maxChars){
			alert(`Text exceeds ${maxChars} characters. Please upload a smaller PDF.`)
			setLoading(false)
			return
		}

		// MAKE API REQUEST
		llmService.chat(message)
			.then(res => {
				console.log(res.data)
				setExam(res.data)
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
				setLoading(false)
				if (error.response.status === 429) {
					alert('Rate limit exceeded. Please try again later.')
				}
				else if (error.response.status === 500) {
					alert('Network error. Please try again.')
				}
				else {
					alert('Error processing file. If your PDF is taking longer than 60 seconds to process, try breaking it up into multiple PDFS.')
				}
			})
	}


	return (
		<div>
			<div className='flex flex-col items-center justify-start p-6 space-y-6'>
				<div className="flex place-items-center space-y-4 w-full max-w-xs p-6 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl">
					<div className="flex flex-col place-items-center space-y-4 bg-zinc-800 p-6 rounded-lg shadow-lg">
						<form onSubmit={onFileUpload} className='w-full flex flex-col place-items-center space-y-4'>
							<input type='file' 
								
								accept='.pdf' 
								onChange={onFileInput} 
								id='fileInput' 
								disabled={loading}
								className="w-full text-sm text-gray-400 file:button file:border-0 file:disabled:opacity-50 file:disabled:cursor-not-allowed"
							/>
							<p className="text-xs italic text-gray-500 text-center"> accepts .pdf with max {maxChars} characters, 50mb </p>
							<button 
								type='submit' 
								className='button disabled:opacity-50 disabled:cursor-not-allowed' 
								disabled={loading}
							>
								{loading ? 'Processing...' : 'Submit'}
							</button>
							<p className="text-xs italic text-center text-gray-500">
								If not working try adding a text layer to the pdf using{' '}
								<a href="https://smallpdf.com/pdf-ocr" className="text-primary hover:text-secondary font-semibold underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">
									OCR
								</a> 
							</p>
						</form>
					</div>
				</div>
			</div>
			<Exam exam={exam} />
		</div>
	)
}
