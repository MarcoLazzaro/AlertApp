import React, {useEffect, useState, } from 'react'
import L, {map} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
//import Platform from 'react-native'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import icon_1 from '../images/icons/alert_1.png'
import icon_2 from '../images/icons/alert_2.png'
import icon_3 from '../images/icons/alert_3.png'
import axios from 'axios'

var description = ''    //Desription field for the alert popup
var radio = 1           //Alert level variable in alert popup

/*
const api = axios.create({
  baseURL: 'http://localhost:4000'
})
*/

const api = axios.create({
  baseURL: 'http://192.168.1.30:4000'
})

//Get icon for each alert level
function GetIcon(_iconSize, alertLevel){
  if(alertLevel == 1){
    return new L.icon({
      iconUrl: icon_1,      //blue alert icon
      iconSize: [_iconSize, _iconSize]
  })
  }
  else if(alertLevel == 2){
    return new L.icon({
      iconUrl: icon_2,      //yellow alert icon
      iconSize: [_iconSize, _iconSize]
  })
  }
  else {
    return new L.icon({
      iconUrl: icon_3,      //red alert icon
      iconSize: [_iconSize, _iconSize]
  })
  }
}

function Map() {
  const [alerts, setAlerts] = useState([]);     //Structure containing alert from API
  const [currentCenter, setCenter] = useState([40.85631, 14.24641]);  //Current map center (updated with watchPosition())
  const [mappa, setMappa] = useState(null);     //Ref to map object created on first map render
  let currentLat = 40.85631;                    //temp Lat
  let currentLong = 14.24641;                   //temp Lng
  var watchID = null;                           //ID returned from watchposition call (for detecting geolocation changes)

  //handler for the textarea field during alert popup
  const handleChange = (e) => {
    description = e.target.value
  };

  //handler for the alert level selection during alert popup
  const handleRadio = (e) => {
    radio = e.target.value
  };

  //polling function called every 5sec. Gets data from the API
  const performPolling = () => {
    api.get('/getAlert')
    .then(function (response) {
    setAlerts(response.data)
  })}

  //useEffect funtion with empty array as input (second argument). Acts like componentDidMount()
  useEffect(()=>{
    //checking for geolocation support
    if(("geolocation" in navigator)){
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

    //getting first data from the API on ComponentDidMount 
    api.get('/getAlert',  {
      params: {
        coords: currentCenter
      }
    })
    .then(function (response) {
    setAlerts(response.data)
    })
  
    //Setting up a polling function for fetching data. (interval 5sec)
    const polling = setInterval(performPolling, 5000)
    //watchPosition constantly looks for location changes, triggering callbacks (onSucces, onError)
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }, []);

    
  //wwatchPosition on success
  function onSuccess(position) {
    console.log([position.coords.latitude, position.coords.longitude])
    setCenter([position.coords.latitude, position.coords.longitude])
  }
  //wwatchPosition on error
  function onError(e) {
    console.log(e)
  }

  //useEffect on map center change (flies to new location)
  useEffect(()=>{
    if (mappa) mappa.flyTo(currentCenter, 18)
  }, [currentCenter]);

  //function for submitting new alert to the API
  function addAlert(alertPosition) {
    //alert data structure (follows the api schema)
    const newAlert = {
      text: description,
      alertLevel: radio,
      location: {
          type: "Point",
          coordinates: [
            alertPosition.lat,
            alertPosition.lng
          ]
        },
      };
    //post request to the backend
    api.post("/addAlertToApi", newAlert)
    .then(function (response) {
      console.log(response.data); //ritriggering render
    })
    .catch(function (error) {
      console.log(error);
    });
    radio = 1; //radio to defalut alertLevel
  }

  var interval;

  //function creating the popup form for submitting alerts
  function popupAlert(alertPosition)
  {
    clearInterval(interval)
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
      childrenElement: () => 
      <div>
        <div>
          <h3>Alert Level</h3>
          <label><input type="radio" id="alertLevel" value='1' name="alertLevel" onClick={handleRadio}/>Level 1</label>
          <label><input type="radio" id="alertLevel" value='2' name="alertLevel" onClick={handleRadio}/>Level 2</label>
          <label><input type="radio" id="alertLevel" value='3' name="alertLevel" onClick={handleRadio}/>Level 3</label>
        </div>
        <textarea className="confirm-box-textarea" rows="3" cols="30" maxLength="50" placeholder="Alert description" onChange={handleChange}></textarea>
      </div>
    });
  }

  //component detecting user's input
  function ClickableComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
      },
      mousedown: (e) => {
        interval = setInterval(() => {
          popupAlert(e.latlng);
        }, 500);
      },
      mouseup: (e) => {
        clearInterval(interval);
      },
      contextmenu: (e) => {
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
              {alerts.map((alerts) =>
              <Marker position={alerts.location.coordinates} icon={GetIcon(48, alerts.alertLevel)} >
                <Popup>
                {alerts.text}
                </Popup>
              </Marker>
              )}
          </MapContainer>
      </React.Fragment>
  )
}

export default Map