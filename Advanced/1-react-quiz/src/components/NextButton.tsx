function NextButton({
    dispatch,
    answer,
    index,
    numQuestions,
}: {
    dispatch: React.ActionDispatch<React.AnyActionArg>;
    answer: number | null;
    index: number;
    numQuestions: number;
}) {
    function handleNextClick() {
        dispatch({ type: "nextQuestion" });
    }

    function handleFinish() {
        dispatch({ type: "finish" });
    }

    if (answer === null) return null;

    if (index < numQuestions - 1) {
        return (
            <button className="btn btn-ui" onClick={handleNextClick}>
                Next
            </button>
        );
    }

    if (index === numQuestions - 1) {
        return (
            <button className="btn btn-ui" onClick={handleFinish}>
                Finish
            </button>
        );
    }
    return <p>Invalid Question</p>;
}

export default NextButton;
