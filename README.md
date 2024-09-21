
# TestifyNotes
TestifyNotes is a web application built with React.js, Next.js, and Tailwind CSS. It allows users to upload PDF lecture notes and generates a customized practice exam.

The application uses a serverless API to interact with the Groq API, which processes the PDF to create exam questions via a large language model (LLM). Once the questions are generated, they are displayed in the user interface, allowing users to input their answers.

Upon submitting each question, the correct answer along with an explanation is shown. Additionally, users can download the full practice exam, complete with an answer key provided on the last page.

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
