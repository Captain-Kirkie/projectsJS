import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
const { SECRET_MANAGER } = require("./Manager");

function GoogleMapWrapper() {
    console.log(`google ${SECRET_MANAGER.GOOGLE_API_KEY}`);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: SECRET_MANAGER.GOOGLE_API_KEY,
    });
    const slcLat = 40.748054511597054;
    const slcLong = -111.95898378502793;
    const homeLat = 40.737794685718875;
    const homeLong = -111.8454212228403;
    const center = useMemo(() => ({ lat: slcLat, lng: slcLong }), []);
    return (
        <div className="map-wrapper">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    id="google-map-strava"
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                >
                    <Marker position={{ lat: homeLat, lng: homeLong }} />
                </GoogleMap>
            )}
        </div>
    );
}

export default GoogleMapWrapper;
