import { ReactNode } from "react";

const NavBar = ({ children }: { children: ReactNode }) => {
    return <nav className="nav-bar">{children}</nav>;
};

export default NavBar;
