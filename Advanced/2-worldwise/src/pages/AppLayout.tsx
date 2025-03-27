import MapComponent from "../components/Map";
import Sidebar from "../components/Sidebar";
import style from "../css-modules/AppLayout.module.css";

function AppLayout() {
    return (
        <div className={style.app}>
            <Sidebar />
            <MapComponent />
        </div>
    );
}

export default AppLayout;
