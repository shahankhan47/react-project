import { useState } from "react";

const content = [
    {
        summary: "React is a library for building UIs",
        details:
            "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        summary: "State management is like giving state a home",
        details:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        summary: "We can think of props as the component API",
        details:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
        summary: "New Tab 4",
        details: "Some details",
    },
];

export default function App() {
    return (
        <div>
            <Tabbed content={content} />
        </div>
    );
}

function Tabbed({ content }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="tabs">
                <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
            </div>

            {activeTab <= 2 ? (
                <TabContent
                    // Modern way of content[activeTab]
                    item={content.at(activeTab)}
                    // Providing a key prop to reset the state every time a tab is changed.
                    key={content[activeTab]?.summary}
                />
            ) : (
                <DifferentContent />
            )}
        </div>
    );
}

function Tab({ num, activeTab, onClick }) {
    return (
        <button
            className={activeTab === num ? "tab active" : "tab"}
            onClick={() => onClick(num)}
        >
            Tab {num + 1}
        </button>
    );
}

function TabContent({ item }) {
    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);

    function handleInc() {
        setLikes(likes + 1);
    }

    // Below will only increase likes with +1 and not 3 times as state updates are batched and are async.
    // function handleTripleInc() {
    //     setLikes(likes + 1);
    //     setLikes(likes + 1);
    //     setLikes(likes + 1);
    // }

    // Instead use callback:
    function handleTripleInc() {
        setLikes((likes) => likes + 1);
        setLikes((likes) => likes + 1);
        setLikes((likes) => likes + 1);
    }

    function handleUndo() {
        // Both state updates will get batched
        setLikes(0);
        setShowDetails(true);
        // This will log previous state value and not the updated one i.e. 0.
        console.log(likes);
    }

    return (
        <div className="tab-content">
            <h4>{item.summary}</h4>
            {showDetails && <p>{item.details}</p>}

            <div className="tab-actions">
                <button onClick={() => setShowDetails((h) => !h)}>
                    {showDetails ? "Hide" : "Show"} details
                </button>

                <div className="hearts-counter">
                    <span>{likes} ❤️</span>
                    <button onClick={handleInc}>+</button>
                    <button onClick={handleTripleInc}>+++</button>
                </div>
            </div>

            <div className="tab-undo">
                <button onClick={() => handleUndo()}>Undo</button>
                <button>Undo in 2s</button>
            </div>
        </div>
    );
}

function DifferentContent() {
    return (
        <div className="tab-content">
            <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
        </div>
    );
}
