import "leaflet/dist/leaflet.css";
import { MapContainer as BaseMap } from "react-leaflet"

const MapContainer = ({children, ...props}) => {
  return (
    <BaseMap
      style={{ width: "100%", height: `${props.height}px` }}
      center={props.center}
      zoom={props.zoom}
      {...props}
    >
      {children}
    </BaseMap>
  )
};

MapContainer.defaultProps = {
  center: [-7.801888, 110.374501],
  zoom: 6,
  scrollWheelZoom: false,
  height: 500
}

export default MapContainer;