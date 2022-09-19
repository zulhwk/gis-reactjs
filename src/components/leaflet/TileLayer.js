import {TileLayer as Tile} from "react-leaflet"

const TileLayer = (props) => {
  return <Tile 
    attribution={props.attribution}
    url={props.url}
    {...props}
  />
};

TileLayer.defaultProps = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
}

export default TileLayer;