import { Link } from "react-router-dom";
import PageNav from "../../components/PageNav";
import AppNav from "../../components/AppNav";

function Homepage() {
    return (
        <div>
            <PageNav />
            <AppNav />
            <h1 className="test">WorldWise</h1>
            {/* Incorrect way to routing - it will reload the whole page */}
            {/* <a href="/pricing">Pricing</a> */}
            {/* Correct way: */}
            <Link to="/app">Go to the app</Link>
        </div>
    );
}

export default Homepage;
