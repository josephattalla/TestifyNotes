'use client'

import { useState } from 'react'
import pdfToText from "react-pdftotext"
import openaiService from '@/app/services/openai'

export default function FileUpload() {
	const MAX_FILE_SIZE = 5 * 1024 * 1024	// 5mb

	const [file, setFile] = useState(null)    // STATE OF FILE UPLOAD

	// SET STATE OF FILE UPLOAD
	const onFileInput = (event) => {
		let selectedFile = event.target.files[0]
		console.log("onFileInput --- event.target.files[0]:", selectedFile) 

		// prevent large files		
		if (selectedFile.size > MAX_FILE_SIZE) {
			event.target.value = ''	
			alert("File can be at most 5mb.")
			selectedFile = null
		}
		setFile(selectedFile ? selectedFile : null)
	}

	const onFileUpload = async (event) => {
		event.preventDefault()
		let result = ''
		if (!file) {
			alert('Must upload file first.')
		}
		else {
			// EXTRACT TEXT FROM UPLOADED FILE
			const output = await pdfToText(file)
			document.getElementById('fileInput').value = ''
			setFile(null)
			const message = {
				prompt: output
			}

			// MAKE API REQUEST
			openaiService
				.chat(message)
				.then(res => console.log(res.data))
		}
	}

	return (
		<div>
			<form onSubmit={onFileUpload}>
				<div>
						<input type='file' accept='.pdf' onChange={onFileInput} id='fileInput'/>
				</div>
				<button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Submit </button>
				<p className="text-sm italic text-gray-600 m-0"> 5mb .pdf </p>
			</form>
		</div>
	)
}
