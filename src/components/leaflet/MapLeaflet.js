import MapContainer from "./MapContainer";
import TileLayer from "./TileLayer";

const MapLeaflet = ({children, ...props}) => {
 return (
    <MapContainer {...props['option-map']}>
      <TileLayer {...props['option-tile-layer']} />
      {children}
    </MapContainer>
 )
};

MapLeaflet.defaultProps = {
  'option-map': {},
  'option-tile-layer': {}
}

export default MapLeaflet;