import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

enum statuses {
    LOADING = "loading",
    ERROR = "error",
    READY = "ready",
    ACTIVE = "active",
    FINISHED = "finished",
}

export type QuestionType = {
    question: string;
    options: Array<string>;
    correctOption: number;
    points: number;
};

type stateType = {
    questions: QuestionType[];
    status: statuses;
    index: number;
    answer: null | number;
    points: number;
    highscore: number;
};

type actionType = {
    type: string;
    payload: any;
};

const initialState: stateType = {
    questions: [],
    status: statuses.LOADING,
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
};

function reducer(state: stateType, action?: actionType) {
    switch (action?.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: statuses.READY,
            };
        case "dataFailed":
            return { ...state, status: statuses.ERROR };
        case "start":
            return { ...state, status: statuses.ACTIVE };
        case "newAnswer":
            const currentQuestion = state.questions[state.index];

            return {
                ...state,
                answer: action?.payload,
                points:
                    action.payload === currentQuestion.correctOption
                        ? state.points + currentQuestion.points
                        : state.points,
            };
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case "finish":
            return {
                ...state,
                status: statuses.FINISHED,
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: statuses.READY,
                highscore: state.highscore,
            };
        default:
            throw new Error("Action Unknown");
    }
}

export default function App() {
    const [{ status, questions, index, answer, points, highscore }, dispatch] =
        useReducer(reducer, initialState);
    const numQuestions = questions?.length;
    const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    useEffect(() => {
        async function getQuestions() {
            try {
                // Fake Api - npm run server -- see package.json
                const res = await fetch("http://localhost:8000/questions");
                const data = await res.json();
                dispatch({ type: "dataReceived", payload: data });
            } catch (e) {
                dispatch({ type: "dataFailed" });
            }
        }

        getQuestions();
    }, []);
    return (
        <div className="app">
            <Header />

            <Main>
                {status === statuses.LOADING && <Loader />}
                {status === statuses.ERROR && <ErrorMessage />}
                {status === statuses.READY && (
                    <StartScreen
                        num={Number(numQuestions)}
                        dispatch={dispatch}
                    />
                )}
                {status === statuses.ACTIVE && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions?.[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <NextButton
                            dispatch={dispatch}
                            answer={answer}
                            index={index}
                            numQuestions={numQuestions}
                        />
                    </>
                )}
                {status === statuses.FINISHED && (
                    <FinishScreen
                        points={points}
                        totalPoints={totalPoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
