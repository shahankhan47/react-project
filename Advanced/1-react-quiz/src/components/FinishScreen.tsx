function FinishScreen({
    points,
    totalPoints,
    highscore,
    dispatch,
}: {
    points: number;
    totalPoints: number;
    highscore: number;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
}) {
    const percentage = (points / totalPoints) * 100;
    let emoji = "👌";
    if (percentage === 100) {
        emoji = `🎖️`;
    }

    function handleRestart() {
        dispatch({ type: "restart" });
    }

    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
                {totalPoints} ({Math.ceil(percentage)} %)
            </p>
            <p className="highscore">High Score: {highscore} points</p>
            <button className="btn btn-ui" onClick={handleRestart}>
                Restart
            </button>
        </>
    );
}

export default FinishScreen;
