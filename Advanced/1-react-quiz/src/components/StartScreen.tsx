function StartScreen({
    num,
    dispatch,
}: {
    num: number;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
}) {
    function handleStartClick() {
        dispatch({ type: "start" });
    }
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{num} questions to test your react mastery</h3>
            <button className="btn btn-ui" onClick={handleStartClick}>
                Let's start
            </button>
        </div>
    );
}

export default StartScreen;
