import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current?.contains(e.target)) {
                handler();
            }
        }

        // React specific - very important.
        // This will make the modal open for a milisecond and then close again because events bubble up the DOM tree.
        // To pevent this behavious pass in a third arguement "true".
        document.addEventListener("click", handleClick, listenCapturing);

        return () =>
            document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler]);

    return ref;
}

export default useOutsideClick;
