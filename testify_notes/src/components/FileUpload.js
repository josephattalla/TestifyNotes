'use client'

import { useState } from 'react'
import pdfToText from "react-pdftotext"

export default function FileUpload() {
	const MAX_FILE_SIZE = 5 * 1024 * 1024	// 5mb

	const [file, setFile] = useState(null)    // STATE OF FILE UPLOAD
	const [text, setText] = useState('')

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

	// EXTRACT TEXT FROM UPLOADED FILE
	const onFileUpload = (event) => {
		event.preventDefault()
		if (!file) {
			alert('Must upload file first.')
		}
		else {
			pdfToText(file)
				.then(output => {
					setText(output)
					document.getElementById('fileInput').value = ''
					setFile(null)
				})
		}
	}

	return (
		<div>
			<form onSubmit={onFileUpload}>
				<div>
						<input type='file' accept='.pdf' onChange={onFileInput} id='fileInput'/>
				</div>
				<button type='submit'> Submit </button>
				<p className="text-sm italic text-gray-600 m-0"> 5mb .pdf </p>
			</form>
			<p> {text} </p>
		</div>
	)
}
