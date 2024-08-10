import pdfToText from "react-pdftotext"

export function extractText(file) {
    let text = ''
    pdfToText(file)
        .then(t => text = t)
        .catch(error => console.log('extractText error: ', error))
    return text
}