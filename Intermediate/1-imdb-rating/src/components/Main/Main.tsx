import { ReactNode, useState } from "react";

const Main = ({ children }: { children: ReactNode }) => {
    return <main className="main">{children}</main>;
};

export default Main;
