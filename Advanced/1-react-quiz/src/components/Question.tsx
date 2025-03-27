import { QuestionType } from "../App";
import Options from "./Options";

function Question({
    question,
    dispatch,
    answer,
}: {
    question: QuestionType | undefined;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
    answer: number | null;
}) {
    return (
        <div>
            <h4>{question?.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
