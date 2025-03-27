import { QuestionType } from "../App";

function Options({
    question,
    dispatch,
    answer,
}: {
    question: QuestionType | undefined;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
    answer: number | null;
}) {
    const hasAnswered = answer !== null;
    function handleOptionSelect(index: number) {
        dispatch({ type: "newAnswer", payload: index });
    }
    return (
        <div className="options">
            {question?.options?.map((option, i) => (
                <button
                    disabled={hasAnswered}
                    key={option}
                    className={`btn btn-option ${
                        i === answer ? "answer" : ""
                    } ${
                        hasAnswered
                            ? i === question?.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    onClick={() => {
                        handleOptionSelect(i);
                    }}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
