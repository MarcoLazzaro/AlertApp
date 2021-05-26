import React, {useRef, useEffect, useState} from 'react'
import L, {map} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import icon_1 from '../images/icons/alert_1.png'
import icon_2 from '../images/icons/alert_2.png'
import icon_3 from '../images/icons/alert_3.png'
import icon_4 from '../images/icons/alert_4.png'
import NavigationBar from './SideMenu'
import SideMenu from './SideMenu'


function GetIcon(_iconSize){
    return new L.icon({
        iconUrl: icon_1,
        iconSize: [_iconSize, _iconSize]
    })
    
}

/*
const options = {
  title: 'Title',
  message: 'Message',
  buttons: [
    {
      label: 'Yes',
      onClick: () => alert('Click Yes')
    },
    {
      label: 'No',
      onClick: () => alert('Click No')
    }
  ],
  childrenElement: () => <div />,
  customUI: ({ onClose }) => <div>Custom UI</div>,
  closeOnEscape: true,
  closeOnClickOutside: true,
  willUnmount: () => {},
  afterClose: () => {},
  onClickOutside: () => {},
  onKeypressEscape: () => {},
  overlayClassName: "overlay-custom-class-name"
};

confirmAlert(options);
*/

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
  //const [AlertBox, setAlertBox] = useState(false);

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


    //MOUSE DOWN POPUP
    var interval;

    function doSomething()
    {
      console.log("mouse hol for 20")
      clearInterval(interval)
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Add and alert at this location?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => alert('Fire DB Call')
          },
          {
            label: 'Cancel',
            onClick: () => {}
          }
        ],
        childrenElement: () => <div><textarea className="confirm-box-textarea" rows="3" cols="30" maxLength="50" placeholder="Describe here what happened"></textarea></div>
      });
      //if (window.confirm('Are you sure you wish to delete this item?'));
      //setAlertBox(true);
    }

    function ClickableComponent() {
        const map = useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            console.log("latlong: " + e.latlng)
          },
          mousedown: (e) => {
            interval = setInterval(doSomething, 500);
          },
          mouseup: (e) => {
            clearInterval(interval);
          },
          contextmenu: (e) => {
            doSomething();
          }
        });
        return null;
      }

      //MOUSE DOWN END
    

    return (
        <React.Fragment>
            <MapContainer center={[40.85631, 14.24641]} zoom={18} scrollWheelZoom={"center"} doubleClickZoom={"center"} dragging={false} zoomControl={false}>
                <TileLayer
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                    url="https://api.mapbox.com/styles/v1/marcolazzaro/ckosgje3e0yxt17td71wdxzuz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFyY29sYXp6YXJvIiwiYSI6ImNrb3NoMHM1czAxZHgycnF2b2Q4N2Rld2UifQ.wx-8i7emB-6UD1Uw4XgOCg"
                    minZoom={18}
                    maxZoom={20}
                    maxNativeZoom={19}
                />
                <ClickableComponent>
                </ClickableComponent>
                <Marker position={tempLocation} icon={GetIcon(48)} >
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