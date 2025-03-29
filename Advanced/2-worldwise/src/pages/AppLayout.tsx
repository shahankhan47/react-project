import MapComponent from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import style from "../css-modules/AppLayout.module.css";

function AppLayout() {
    return (
        <div className={style.app}>
            <Sidebar />
            <MapComponent />
            <User />
        </div>
    );
}

export default AppLayout;
