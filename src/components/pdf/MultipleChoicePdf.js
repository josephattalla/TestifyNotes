// MULTIPLE CJOICE QUESTION DISPLAY FOR PDF

const MultipleChoicePdf = ({ question, index }) => {
    if (!question) {
        return null;
    }

    // GET LETTER FOR CHOICE
    const getLetter = (index) => String.fromCharCode(97 + index);

    return (
        <div className='mb-6'>
            <div className='flex'>
                <h4 className='text-lg font-medium mr-2 flex-shrink-0'>{index}.</h4>
                <p className='text-lg font-medium'>{question.question}</p>
            </div>
            <div className='pl-8 mt-2'>
                {question.choices.map((option, choiceIndex) => (
                    <div key={choiceIndex} className="flex mb-1">
                        <span className='mr-2'>{getLetter(choiceIndex)}.</span>
                        <span>{option}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultipleChoicePdf;

