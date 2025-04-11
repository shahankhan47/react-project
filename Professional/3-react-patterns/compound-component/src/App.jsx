import Counter from "./Counter";
import "./styles.css";

export default function App() {
    return (
        <div>
            <h1>Compound Component Pattern</h1>
            {/* <Counter
                iconIncrease="+"
                iconDecrease="-"
                label="My NOT so flexible counter"
                hideLabel={false}
                hideIncrease={false}
                hideDecrease={false}
            /> */}
            {/* Compount component: */}
            <Counter>
                {/* Advantage of this is now we can configure the position of each one as we like. */}
                {/* If we did the same for above (only one component), it would need lots of props leading to 
                prop explosion */}
                <Counter.Label>My super flexible counter</Counter.Label>
                <Counter.Increase icon="+"></Counter.Increase>
                <Counter.Decrease icon="-"></Counter.Decrease>
                <Counter.Count />
            </Counter>

            <div>
                <Counter>
                    <Counter.Decrease icon="◀️"></Counter.Decrease>
                    <Counter.Count />
                    <Counter.Increase icon="▶️"></Counter.Increase>
                </Counter>
            </div>
            <div>
                <Counter>
                    <Counter.Count />
                    <Counter.Increase icon="➕"></Counter.Increase>
                </Counter>
            </div>
        </div>
    );
}
