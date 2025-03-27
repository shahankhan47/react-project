import { Outlet } from "react-router-dom";
import style from "../css-modules/Sidebar.module.css";
import AppNav from "./AppNav";
import Logo from "./Logo";

function Sidebar() {
    return (
        <div className={style.sidebar}>
            <Logo />
            <AppNav />
            {/* Very important - react specific - Amazing lesson:
                Outlet elements renders the route's child element if child's route path is hit else
                renders nothing 
            */}
            <Outlet />
            <footer className={style.footer}>
                <p className={style.copyright}>
                    &copy; Copyright {new Date().getFullYear()} Worldwise Inc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;
