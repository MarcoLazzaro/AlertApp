import React, {useRef, useEffect, useState, Component, componentDidMount} from 'react'
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
import axios from 'axios'

/*
const api = axios.create({
  baseURL: 'http://localhost:4000'
})
*/

const api = axios.create({
  baseURL: 'http://192.168.1.30:4000'
})


function GetIcon(_iconSize){
    return new L.icon({
        iconUrl: icon_1,
        iconSize: [_iconSize, _iconSize]
    })
    
}


var tempLocation = [40.85631, 14.24641];
var description = ''



function Map() {
  const [AlertBox, setAlertBox] = useState(false);
  const [desc, setDesc] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [currentCenter, setCenter] = useState([40.85631, 14.24641]);
  const [mappa, setMappa] = useState(null);
  let currentLat = 40.85631;
  let currentLong = 14.24641;
  

    const handleChange = (e) => {
      console.log('called')
      
      description = e.target.value
    };

    const performPolling = () => {
      console.log('polling')
      api.get('/getAlert')
      .then(function (response) {
      setAlerts(response.data)
    })}

    useEffect(()=>{
      console.log("COMPONENT DI MOUNT\n")
      if(("geolocation" in navigator)){
          console.log("geolocation IS supported: ")
          navigator.geolocation.getCurrentPosition((position) => {
              currentLat = position.coords.latitude;
              currentLong = position.coords.longitude;
              setCenter([currentLat, currentLong])
              console.log(position.coords.latitude, position.coords.longitude);
            });
      }
      else{
          console.log("geolocation NOT upported")
      }
      api.get('/getAlert')
      .then(function (response) {
      setAlerts(response.data)
      })

      const polling = setInterval(performPolling, 5000)
      console.log("COMPONENT DI MOUNT END\n")
    }, []);

    

    useEffect(()=>{
        console.log(alerts)
    }, [alerts]);

    useEffect(()=>{
      console.log(currentCenter)
      console.log("currentPos")
      console.log(mappa)
      if (mappa) mappa.flyTo(currentCenter, 18)
  }, [currentCenter]);

    var interval;


    function addAlert(alertPosition) {
      console.log("called")
      
      const newAlert = {
        text: description,
        alertLevel: 1,
        location: {
            type: "Point",
            coordinates: [
              alertPosition.lat,
              alertPosition.lng
            ]
          },
        };
      api.post("/addAlertToApi", newAlert)
      .then(function (response) {
        console.log(response.data);
        setDesc(description) //ritriggering render
      })
      .catch(function (error) {
          console.log(error);
          console.log(newAlert)
      });
    }

    function popupAlert(alertPosition)
    {
      clearInterval(interval)
      console.log("from popup: " + alertPosition)
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Add and alert at this location?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {addAlert(alertPosition)}
          },
          {
            label: 'Cancel',
            onClick: () => {console.log(description)}
          }
        ],
        childrenElement: () => <div><textarea className="confirm-box-textarea" rows="3" cols="30" maxLength="50" placeholder="Alert description" onChange={handleChange}></textarea></div>
      });
    }

    function ClickableComponent() {
      const map = useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng;
        },
        mousedown: (e) => {
          console.log("mouse-down,   latlong: " + e.latlng)
          interval = setInterval(() => {
            popupAlert(e.latlng);
          }, 500);
        },
        mouseup: (e) => {
          clearInterval(interval);
        },
        contextmenu: (e) => {
          console.log("right-click,   latlong: " + e.latlng)
          popupAlert(e.latlng);
        }
      });
      return null;
    }
    

    return (
        <React.Fragment>
            <MapContainer center={currentCenter} zoom={18} scrollWheelZoom={"center"} doubleClickZoom={false} dragging={false} zoomControl={false} touchZoom={true} watch={true} whenCreated={setMappa}>
                <TileLayer
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                    url="https://api.mapbox.com/styles/v1/marcolazzaro/ckosgje3e0yxt17td71wdxzuz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFyY29sYXp6YXJvIiwiYSI6ImNrb3NoMHM1czAxZHgycnF2b2Q4N2Rld2UifQ.wx-8i7emB-6UD1Uw4XgOCg"
                    minZoom={18}
                    maxZoom={20}
                    maxNativeZoom={19}
                />
                <ClickableComponent>
                </ClickableComponent>
                {alerts.map((alerts) => (console.log(alerts.location.coordinates),
                <Marker position={alerts.location.coordinates} icon={GetIcon(48)} >
                  <Popup>
                  {alerts.text}
                  </Popup>
                </Marker>
                ))}
                
            </MapContainer>
        </React.Fragment>
    )
}

export default Map