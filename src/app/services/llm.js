import axios from "axios"

const baseUrl = '/api/llm'

const chat = message => {
    return axios.post(baseUrl, message)
}

export default { chat }