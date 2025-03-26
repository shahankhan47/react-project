import { useEffect } from "react";

export function useKey(key: string, action: Function) {
    useEffect(() => {
        const keyPressCallback = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        };
        document.addEventListener("keydown", keyPressCallback);

        // Cleanup is very important when you add an eventListener to a component because if you won't
        // Eveytime the component instance is mouted, it will create a new same eventListener.
        return function () {
            document.removeEventListener("keydown", keyPressCallback);
        };
    }, [action, key]);
}
