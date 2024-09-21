// CHUNK A GIVEN TEXT INTO AN ARRAY OF STRINGS < CHUNKSIZE CHARACTERS
// HALVING THE TEXT UNTIL IT IS LESS THAN CHUNKSIZE

const chunkText = (text, chunkSize) => {
    let chunks = []

    if (text.length > chunkSize) {
        chunks = chunks.concat(chunkText(text.slice(0, Math.floor(text.length / 2)), chunkSize))
        chunks = chunks.concat(chunkText(text.slice(Math.floor(text.length / 2), text.length), chunkSize))
    }
    else {
        chunks = chunks.concat(text)
    }

    return chunks
}

export default chunkText