'use client'

import { useState } from 'react'
import pdfToText from "react-pdftotext"
import llmService from '@/app/services/llm'
import Exam from './exam/Exam'
import DownloadPdf from './pdf/DownloadPdf'

export default function FileUpload() {
	const maxMb = 50
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

	const onFileUpload = async (event) => {
		event.preventDefault()
		setLoading(true)
		let result = ''
		if (!file) {
			alert('Must upload file first.')
			setLoading(false)
		}
		else {
			// EXTRACT TEXT FROM UPLOADED FILE
			let output = ''
			try {
				output = await pdfToText(file)	
			} catch (error) {
				setLoading(false)
				alert('Error extracting text from PDF.')
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
				alert('Error extracting text from PDF.')
				return
			}

			// REMOVE WHITESPACE TO MINIMIZE TOKENS
			output = output.replace(/\s+/g, '')

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
					alert('Error processing file.')
				})
		}
	}

	return (
		<div>
			<div className='flex flex-col items-center justify-start p-6 space-y-6'>
				<div className="w-full max-w-lg p-6 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl">
					<form onSubmit={onFileUpload} className="w-full flex flex-col place-items-center space-y-4 bg-zinc-800 p-6 rounded-lg shadow-lg">
						<input type='file' 
							accept='.pdf' 
							onChange={onFileInput} 
							id='fileInput' 
							disabled={loading}
							className="w-full text-sm text-gray-400 file:button file:border-0 file:disabled:opacity-50 file:disabled:cursor-not-allowed"
						/>
						<p className="text-xs italic text-gray-500">Max file size: 50MB</p>
						<button 
							type='submit' 
							className='button disabled:opacity-50 disabled:cursor-not-allowed' 
							disabled={loading}
						>
							{loading ? 'Processing...' : 'Submit'}
						</button>
						<p className="text-xs italic text-center text-gray-500">
							Note: if not working try adding a text layer to the pdf using{' '}
							<a href="https://smallpdf.com/pdf-ocr" className="text-primary hover:text-secondary font-semibold underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">
								OCR
							</a> 
						</p>
					</form>
				</div>
			</div>
			<Exam exam={exam} />
		</div>
	)
}
