import axios from "axios"

const baseUrl = '/api/openai'

const chat = message => {
    return axios.post(baseUrl, message)
}

export default { chat }