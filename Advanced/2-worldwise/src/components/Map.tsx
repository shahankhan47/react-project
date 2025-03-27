import { useNavigate, useSearchParams } from "react-router-dom";
import style from "../css-modules/Map.module.css";

function MapComponent() {
    const navigate = useNavigate();

    const [searchParam] = useSearchParams();
    const latitude = searchParam.get("lat");
    const longitude = searchParam.get("lng");

    return (
        <div className={style.mapContainer} onClick={() => navigate("form")}>
            <h1>Map</h1>
            <h1>
                Position: lat:{latitude} lng:{longitude}
            </h1>
        </div>
    );
}

export default MapComponent;
