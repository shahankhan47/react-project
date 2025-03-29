import { useSearchParams } from "react-router-dom";

function useURLPosition() {
    const [searchParam] = useSearchParams();
    const latitude = searchParam.get("lat");
    const longitude = searchParam.get("lng");

    return [latitude, longitude];
}

export default useURLPosition;
