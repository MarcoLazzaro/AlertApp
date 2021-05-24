import React, {useRef, useEffect} from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvent } from 'react-leaflet'
import icon_1 from '../images/icons/alert_1.png'
import icon_2 from '../images/icons/alert_2.png'
import icon_3 from '../images/icons/alert_3.png'
import icon_4 from '../images/icons/alert_4.png'


function GetIcon(_iconSize){
    return new L.icon({
        iconUrl: icon_1,
        iconSize: [_iconSize, _iconSize]
    })
}


var tempLocation = [40.85631, 14.24641];
/*
var greenIcon = L.icon({
    iconUrl: "alert_4.png",

    iconSize:     [48, 48], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
*/

function Map() {
    useEffect(()=>{
        if(("geolocation" in navigator)){
            console.log("geolocation IS supported: ")
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude, position.coords.longitude);
              });
            
        }
        else{
            console.log("geolocation NOT upported")
        }
    })

    return (
        <React.Fragment>
            <MapContainer center={[40.85631, 14.24641]} zoom={18} scrollWheelZoom={"center"} doubleClickZoom={"center"} dragging={false} zoomControl={"false"}>
                <TileLayer
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                    url="https://api.mapbox.com/styles/v1/marcolazzaro/ckosgje3e0yxt17td71wdxzuz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFyY29sYXp6YXJvIiwiYSI6ImNrb3NoMHM1czAxZHgycnF2b2Q4N2Rld2UifQ.wx-8i7emB-6UD1Uw4XgOCg"
                    minZoom={18}
                    maxZoom={20}
                    maxNativeZoom={19}
                />
                <Marker position={tempLocation} icon={GetIcon(48)}>
                    <Popup>
                    Alert level 1<br></br>lat {tempLocation[0]}<br></br>long {tempLocation[1]}
                    </Popup>
                </Marker>
                </MapContainer>
        </React.Fragment>
    )
}

export default Map


//<ZoomControl position="topright"></ZoomControl> on click make snavbar disappear (NEED FIX OR REMOVE)