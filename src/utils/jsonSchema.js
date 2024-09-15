export const jsonSchema = `
{
  "exam": [
      {
          "question": "string",
          "format": "multiple choice | true or false | open ended",
          "choices": ["choice1", "choice2", "choice3", "choice4"],
          "answer": "string",
          "explanation": "string"
      },
  ]
}
`