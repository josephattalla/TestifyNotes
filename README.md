
# TestifyNotes
TestifyNotes is a web application built with React.js, Next.js, and Tailwind CSS. It allows users to upload PDF lecture notes and generates a customized practice exam. A serverless API is utilized to generate the practice exam utilizing [Groq](https://groq.com/) API. Once the PDF is uploaded, it is sent to a LLM to create questions, these questions are displayed once returned and allows used to enter answers. Once a question is submitted, the correct answer and explanation is displayed. A downloadable version of the practice exam is available along with the answer key on the last page.

## Usage
1. Clone the repository
2. Install dependencies:
```
npm install
```
4. Create a `.env` file and store a [Groq](https://groq.com/) API key:
```
GROQ_API_KEY = your_key
```
5. Start the development server:
```
npm run dev
```

## Demo
A demo is deployed on Vercel: [https://testifynotes-josephattallas-projects.vercel.app/](https://testifynotes-josephattallas-projects.vercel.app/)

https://github.com/user-attachments/assets/c35305ee-2bd3-4341-852e-7ed42cfe7db0
